import { getFirestoreData } from '@/lib/firebase/firestore.functions'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useFirestoreData() {
  const [data, setData] = useState<DocumentSnapshot<DocumentData, DocumentData> | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const data = await getFirestoreData()
    setData(data)
  }

  return data
}
