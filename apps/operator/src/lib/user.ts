import useSWR from 'swr'

export interface LoginUser {
  username: string
  password: string
}

export interface RegisterUser {
  username: string
  password: string
  confirmedPassword?: string
}

export interface PasskeyOptionsInput {
  email: string
  name: string
}

export interface RegistrationVerificationInput {
  attestationResponse: any
}
interface HttpResponse<T> extends Response {
  message?: T
}

export async function registerUser<T>(arg: RegisterUser) {
  const fData: HttpResponse<T> = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
  try {
    const fDataMessage = await fData.json()
    fData.message = fDataMessage.error
    return fData
  } catch (error) {
    return { message: 'error' }
  }
}

export const useVerifyUser = (arg: string | null) => {
  const { data, isLoading, error } = useSWR(
    arg ? `/api/auth/verify?token=${arg}` : null,
    async (url) => {
      return (await fetch(url)).json()
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshInterval: 0,
      revalidateIfStale: false,
    },
  )
  return {
    verified: data,
    isLoading,
    error,
  }
}

export async function getPasskeyOptions<T>(arg: PasskeyOptionsInput) {
  const fData: HttpResponse<T> = await fetch('/api/auth/registration-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
    credentials: 'include',
  })

  const data = await fData.json()
  try {
    return data
  } catch (error) {
    return { message: 'error' }
  }
}

export async function verifyRegistration<T>(
  arg: RegistrationVerificationInput,
) {
  const fData: HttpResponse<T> = await fetch(
    '/api/auth/registration-verification',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
      credentials: 'include',
    },
  )
  try {
    return await fData.json()
  } catch (error) {
    return { message: 'error' }
  }
}
