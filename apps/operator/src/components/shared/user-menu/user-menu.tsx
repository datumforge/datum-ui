'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { userMenuStyles } from './user-menu.styles'
import { Button } from '@repo/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Kbd } from '@repo/ui/kbd'
import { useTheme } from 'next-themes'

export const UserMenu = () => {
  const { setTheme, theme } = useTheme()
  const { data: sessionData } = useSession()
  const {
    trigger,
    email,
    userSettingsLink,
    themeRow,
    themeDropdown,
    commandRow,
    commands,
  } = userMenuStyles()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={trigger()}>
          <Avatar>
            {sessionData?.user?.image && (
              <AvatarImage src={sessionData?.user?.image} />
            )}
            <AvatarFallback>
              {sessionData?.user?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown width={10} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div>
            <div>
              <strong>{sessionData?.user.name}</strong>
              <br />
              <div className={email()}>{sessionData?.user.email}</div>
            </div>
            <div>
              <Link href="#" className={userSettingsLink()}>
                User Settings
                <ArrowRight width={10} />
              </Link>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator spacing="md" />
        <div className={commandRow()}>
          <p>Command menu</p>
          <div className={commands()}>
            <Kbd text="⌘" size="small" />
            <Kbd text="K" size="small" />
          </div>
        </div>
        <div className={themeRow()}>
          <p>Theme</p>
          <Select onValueChange={(value) => setTheme(value)} value={theme}>
            <SelectTrigger className={themeDropdown()}>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenuSeparator spacing="md" />
        <DropdownMenuItem>
          <Button
            size="md"
            variant="outline"
            full
            onClick={() => {
              signOut()
            }}
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
