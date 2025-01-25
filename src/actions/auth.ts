'use server'

import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/util/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createSession(uid: string) {
  const nextjsCookies = await cookies()
  nextjsCookies.set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  })

  redirect(HOME_ROUTE)
}

export async function removeSession() {
  const nextjsCookies = await cookies()
  nextjsCookies.delete(SESSION_COOKIE_NAME)

  redirect(ROOT_ROUTE)
}
