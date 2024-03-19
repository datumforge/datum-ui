'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@repo/ui/button'
import { TextInput } from '@repo/ui/text-input'
import { MessageBox } from '@repo/ui/message-box'
import { SimpleForm } from '@repo/ui/simple-form'
import { type LoginUser } from '../../../lib/user'
import visibilityOff from '../../../../public/icons/visibility-off.svg'
import visibility from '../../../../public/icons/visibility.svg'
import LandingBackground from '../../../../public/backgrounds/landing-bg.svg'
import googleIcon from '../../../../public/icons/google-icon.svg'
import githubIcon from '../../../../public/icons/github-icon.svg'
import arrowOutward from '../../../../public/icons/arrow-outward.svg'

const AuthLogin: React.FC = () => {
  const router = useRouter()
  const [signInError, setSignInError] = useState(false)
  const [signInLoading, setSignInLoading] = useState(false)
  const showLoginError = !signInLoading && signInError
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Submit client-side sign-in function using username and password
   */
  const submit = async (payload: LoginUser) => {
    setSignInLoading(true)
    setSignInError(false)
    try {
      const res: any = await signIn('credentials', {
        redirect: false,
        ...payload,
      })
      if (res.ok && !res.error) {
        router.push('/dashboard')
      } else {
        setSignInLoading(false)
        setSignInError(true)
      }
    } catch (error) {
      setSignInLoading(false)
      setSignInError(true)
    }
  }

  /**
   * Setup Github Authentication
   */
  const github = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    })
  }

  /**
   * Setup Google Authentication
   */
  const google = async () => {
    await signIn('google', {
      callbackUrl: '/dashboard',
    })
  }

  return (
    <main className="flex flex-row h-full w-full items-center space-between bg-blackberry-900">
      <div className="flex flex-col justify-center mx-auto my-auto w-full p-6 sm:w-1/3 h-full relative ease-in-out">
        <div className="bg-white border border-winter-sky-900 p-8 rounded-lg">
          <div className="flex flex-col  justify-start">
            <h1 className="font-mono font-normal text-3xl mb-8 text-blackberry-800">
              Welcome back
            </h1>
            <SimpleForm
              onSubmit={(e: any) => {
                submit(e)
              }}
            >
              <TextInput
                label="Email"
                name="username"
                placeholder="email@domain.net"
              />
              <div className="relative">
                <TextInput
                  label="Password"
                  name="password"
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  type="button"
                  className="flex justify-around items-center absolute  right-2.5 bottom-4"
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                >
                  {showPassword ? (
                    <Image alt="hide password icon" src={visibilityOff} />
                  ) : (
                    <Image alt="show password icon" src={visibility} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between my-7">
                <div className="w-1/2 bg-winter-sky-900 h-px"></div>
                <p className="text-blackberry-800 font-mono text-xs mr-3 ml-3">
                  OR
                </p>
                <div className="w-1/2 bg-winter-sky-900 h-px"></div>
              </div>

              <div className="w-full mb-8">
                <button
                  className="!text-blackberry-900 mb-4 w-full bg-white hover:bg-blackberry-50 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium border border-winter-sky-900 rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center "
                  onClick={() => {
                    google()
                  }}
                  type="button"
                >
                  <Image
                    alt="google icon"
                    src={googleIcon}
                    className="w-4 h-4 mr-4 mt-0.5"
                  />
                  Sign in with Google
                </button>
                <button
                  className="!text-blackberry-900 w-full bg-white hover:bg-blackberry-50 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg border border-winter-sky-900 text-sm px-5 py-2.5 text-center inline-flex justify-center  mb-2 "
                  onClick={() => {
                    github()
                  }}
                  type="button"
                >
                  <Image
                    alt="github icon"
                    src={githubIcon}
                    className="w-4 h-4 mr-4 mt-0.5"
                  />
                  Sign in with Github
                </button>
              </div>

              <Button
                className=" w-full inline-flex justify-center items-center"
                loading={signInLoading ? true : undefined}
                type="submit"
              >
                Sign in
                <Image
                  className="ml-2"
                  alt="show password icon"
                  src={arrowOutward}
                />
              </Button>
            </SimpleForm>
            <br />

            {showLoginError ? (
              <MessageBox
                className="p-4 ui-ml-1"
                message="Could not login. Please try again."
              />
            ) : null}
            <div className="flex items-center  justify-center mt-4 text-blackberry-800">
              <p>
                Don&apos;t have an account yet?
                <Link
                  className="text-base text-sunglow-900 pl-1  underline  underline-offset-4 "
                  href="/signup"
                >
                Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-6/12 h-full hidden md:block">
        <Image
          alt="datum imagery background"
          priority
          src={LandingBackground}
          className="w-full h-full object-cover"
          layout="cover"
        />
      </div>
    </main>
  )
}

export default AuthLogin
