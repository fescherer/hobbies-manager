'use client'

import { getFirestoreData } from '@/lib/firebase/functions/base.function'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

interface FirestoreType {
  firestore: DocumentSnapshot<DocumentData, DocumentData> | null
  fetchData: (reset?: boolean) => void
}

export const Firestore = React.createContext<FirestoreType>({
  firestore: null,
  fetchData: () => null,
})

export function FirestoreProvider({ children }: PropsWithChildren) {
  const [firestore, setFirestore] = useState<DocumentSnapshot<DocumentData, DocumentData> | null>(null)

  async function fetchData(reset?: boolean) {
    if (reset) {
      setFirestore(null)
    } else {
      const data = await getFirestoreData()
      setFirestore(data)
    }
  }

  return (
    <Firestore.Provider value={{ firestore, fetchData }}>
      {children}
    </Firestore.Provider>
  )
}

export function useFirestore() {
  return React.useContext(Firestore)
}
