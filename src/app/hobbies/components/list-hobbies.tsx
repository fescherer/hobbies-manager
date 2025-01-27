'use client'

import { EditHobbieModal } from './edit-hobbie-modal'
import { useEffect, useState } from 'react'
import { getFirestoreHobbies } from '@/lib/firebase/firestore.functions'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import { CreateHobbieModal } from './create-hobbie-modal'

export function ListHobbies() {
  const [hobbies, setHobbies] = useState<QuerySnapshot<DocumentData, DocumentData> | null>(null)

  useEffect(() => {
    getHobbies()
  }, [])

  async function getHobbies() {
    const hobbiesData = await getFirestoreHobbies()
    setHobbies(hobbiesData)
  }

  if (hobbies)
    return (
      <>
        <CreateHobbieModal updateHobbie={getHobbies} />

        {hobbies?.docs.map(hobbie => (
          <EditHobbieModal
            hobbie={{
              id: hobbie.id,
              color: hobbie.data().color,
              createdAt: hobbie.data().createdAt,
              name: hobbie.data().name,
            }}
            key={hobbie.id}
            updateHobbie={getHobbies}
          />
        ))}
      </>
    )
  else return <></>
}
