'use client'

import { onAuthStateChanged } from '@/lib/firebase/auth'
import { User as UserFirebaseType } from 'firebase/auth'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useFirestore } from './firebase.context'

interface UserType {
  user: UserFirebaseType | null
  userUid: string | null
}

export const User = React.createContext<UserType>({
  user: null,
  userUid: null,
})

export function UserProvider({ children, InitSession }: PropsWithChildren<{ InitSession?: string | null }>) {
  const [userUid, setUserUid] = useState<string | null>(InitSession ? InitSession : null)

  const [user, setUser] = useState<UserFirebaseType | null>(null)

  const { fetchData } = useFirestore()

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid)
        setUser(authUser)
        fetchData()
      } else {
        setUserUid(null)
        setUser(null)
        fetchData(true)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <User.Provider value={{ user, userUid }}>
      {children}
    </User.Provider>
  )
}

export function useUser() {
  return React.useContext(User)
}
