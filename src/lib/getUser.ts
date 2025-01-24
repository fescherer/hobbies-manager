'use client'

import { useEffect, useState } from 'react'

import { auth } from './firebase/client'
import { onAuthStateChanged, User } from 'firebase/auth'

export function useUser() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) setUser(authUser)
    })

    return () => unsubscribe()
  }, [])

  return user
}
