'use client'

import Link from 'next/link'
import { HeaderTabs } from './header-tabs'
import { onAuthStateChanged, signInWithGoogle, signOut } from '@/lib/firebase/auth'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { firebaseConfig } from '@/lib/firebase/config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useUserSession(initialUser: any) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser)
  const router = useRouter()

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig))
  //     const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`

  //     navigator.serviceWorker
  //       .register(serviceWorkerUrl)
  //       .then(registration => console.log('scope is: ', registration.scope))
  //   }
  // }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onAuthStateChanged((authUser: any) => {
      setUser(authUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAuthStateChanged((authUser: any) => {
      if (user === undefined) return

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh()
      }
    })
  }, [user])

  return user
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({ initialUser }: any) {
  const user = useUserSession(initialUser)

  const handleSignOut = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    signOut()
  }

  const handleSignIn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    signInWithGoogle()
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>

        {
          user && <HeaderTabs />
        }

        <div className="navbar-end">
          {user
            ? (
              <div className="flex gap-2">
                <Link href="/profile" className="avatar btn btn-circle btn-ghost">
                  <img
                    className="w-10 rounded-full"
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </Link>

                <button type="button" onClick={handleSignOut}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" /></svg>
                </button>
              </div>
            )
            : (
              <button type="button" onClick={handleSignIn}>
                <img src="/profile.svg" alt="A placeholder user image" />
                Sign In with Google
              </button>
            )}
        </div>

      </div>

      <div className="flex md:hidden">
        dsadas
      </div>
    </div>
  )
}
