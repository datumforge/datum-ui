'use client'

import { useState } from 'react'
import { workspaceSelectorStyles } from './workspace-selector.styles'
import { useGetAllOrganizationsQuery } from '@repo/codegen/src/schema'
import { Logo } from '@repo/ui/logo'
import { Button } from '@repo/ui/button'
import { ArrowRight, SearchIcon } from 'lucide-react'
import { ChevronDown } from '@repo/ui/icons/chevron-down'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Avatar, AvatarFallback } from '@repo/ui/avatar'
import { Input } from '@repo/ui/input'
import { Tag } from '@repo/ui/tag'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { switchWorkspace } from '@/lib/user'

export const WorkspaceSelector = () => {
  const { data: sessionData, update: updateSession } = useSession()
  const currentOrgId = sessionData?.user.organization
  const [workspaceSearch, setWorkspaceSearch] = useState('')
  const [allOrgs] = useGetAllOrganizationsQuery({ pause: !sessionData })

  const {
    container,
    logoWrapper,
    workspaceLabel,
    workspaceDropdown,
    allWorkspacesLink,
    popoverContent,
    searchWrapper,
    orgWrapper,
    orgInfo,
    orgTitle,
    orgSelect,
  } = workspaceSelectorStyles()

  if (!allOrgs.data || allOrgs.fetching || allOrgs.error) {
    return <div></div>
  }

  const orgs = allOrgs.data.organizations.edges || []
  const filteredOrgs = orgs
    .filter((org) => {
      return (
        org?.node?.name.toLowerCase().includes(workspaceSearch.toLowerCase()) &&
        org?.node?.id !== currentOrgId &&
        !org?.node?.personalOrg
      )
    })
    .slice(0, 4)

  const nonPersonalOrgs = orgs.filter((org) => !org?.node?.personalOrg)

  const activeOrg = orgs
    .filter((org) => org?.node?.id === currentOrgId)
    .map((org) => org?.node)[0]

  const handleWorkspaceSwitch = async (orgId?: string) => {
    if (orgId) {
      const response = await switchWorkspace({
        target_organization_id: orgId,
      })

      if (sessionData && response) {
        await updateSession({
          ...response.session,
          user: {
            ...sessionData.user,
            accessToken: response.access_token,
            organization: orgId,
            refreshToken: response.refresh_token,
          },
        })
      }
    }
  }

  // if there are no workspaces, return the logo
  if (nonPersonalOrgs.length === 0) {
    return (
      <Link href={'/'} className={logoWrapper()}>
        <Logo width={115} theme="dark" />
      </Link>
    )
  }

  // if there is only one workspace, return the logo with the workspace name
  if (nonPersonalOrgs.length === 1) {
    return (
      <Link href={'/'} className={logoWrapper()}>
        <Logo width={30} asIcon theme="blackberryLight" />
        <div>
          <div className={workspaceLabel()}>Workspace:</div>
          <span>{activeOrg?.displayName}</span>
        </div>
      </Link>
    )
  }

  return (
    <div className={container()}>
      <Logo width={30} asIcon theme="blackberryLight" />
      <div>
        <div className={workspaceLabel()}>Workspace:</div>
        <Popover>
          <PopoverTrigger>
            <div className={workspaceDropdown()}>
              <span>{activeOrg?.displayName}</span>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className={popoverContent()}>
            <div className={searchWrapper()}>
              <Input
                value={workspaceSearch}
                name="workspace"
                placeholder="Search for a workspace"
                onChange={(e) => {
                  setWorkspaceSearch(e.currentTarget.value)
                }}
                icon={<SearchIcon width={17} />}
              />
            </div>
            {filteredOrgs.map((org) => {
              const role = org?.node?.members?.[0]?.role ?? 'Owner'

              return (
                <div key={org?.node?.id} className={`${orgWrapper()} group`}>
                  <div>
                    <Avatar>
                      <AvatarFallback>
                        {org?.node?.displayName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className={orgInfo()}>
                    <div className={orgTitle()}>{org?.node?.displayName}</div>
                    <Tag>{role}</Tag>
                  </div>
                  <div className={orgSelect()}>
                    <Button
                      variant="sunglow"
                      size="md"
                      onClick={() => handleWorkspaceSwitch(org?.node?.id)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              )
            })}
            <div>
              <Link href="/workspace" className={allWorkspacesLink()}>
                View all {orgs.length - 1} workspaces
                <ArrowRight width={10} />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
