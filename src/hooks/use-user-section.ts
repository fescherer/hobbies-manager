import { onAuthStateChanged } from '@/lib/firebase/auth'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function useUserSession(InitSession?: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession ? InitSession : null)

  const [user, setUser] = useState<User | null>(null)

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid)
        setUser(authUser)
      } else {
        setUserUid(null)
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    userUid,
    user,
  }
}
