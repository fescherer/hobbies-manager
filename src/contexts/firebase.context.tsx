'use client'

import { getFirestoreData, getTasksCount } from '@/lib/firebase/firestore.functions'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

interface FirestoreType {
  firestore: DocumentSnapshot<DocumentData, DocumentData> | null
  fetchData: (reset?: boolean) => void
  tasksCount: number
}

export const Firestore = React.createContext<FirestoreType>({
  firestore: null,
  fetchData: () => null,
  tasksCount: 0,
})

export function FirestoreProvider({ children }: PropsWithChildren) {
  const [firestore, setFirestore] = useState<DocumentSnapshot<DocumentData, DocumentData> | null>(null)
  const [tasksCount, setTasksCount] = useState<number>(0)

  async function fetchData(reset?: boolean) {
    if (reset) {
      setFirestore(null)
      setTasksCount(0)
    } else {
      const data = await getFirestoreData()
      setFirestore(data)
      const tasksCountData = await getTasksCount()
      setTasksCount(tasksCountData?.data().count || 0)
    }
  }

  return (
    <Firestore.Provider value={{ firestore, fetchData, tasksCount }}>
      {children}
    </Firestore.Provider>
  )
}

export function useFirestore() {
  return React.useContext(Firestore)
}
