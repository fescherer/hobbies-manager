'use client'

import { EditHobbieModal } from './edit-hobbie-modal'
import { useEffect, useState } from 'react'
import { CreateHobbieModal } from './create-hobbie-modal'
import { IHobbie } from '@/@types/types'
import { getFirestoreHobbies } from '@/lib/firebase/functions/hobbies.function'

export function ListHobbies() {
  const [hobbies, setHobbies] = useState<IHobbie[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getHobbies()
  }, [])

  async function getHobbies() {
    setLoading(true)
    await getFirestoreHobbies().then((data) => {
      const sorted = data?.docs.map(hobbie => ({
        priority: hobbie.data().priority,
        id: hobbie.id,
        color: hobbie.data().color,
        createdAt: hobbie.data().createdAt,
        name: hobbie.data().name,
      })).sort((a, b) => {
        if (a.priority < b.priority) return 1
        else return 0
      }) || []

      setHobbies(sorted)
    }).finally(() => setLoading(false))
  }

  if (loading) return <>Loading...</>
  else
    return (
      <div className="mt-10">
        <button type="button" onClick={getHobbies} className="rounded-md bg-neutral p-2 transition-all hover:brightness-75"><svg className="fill-neutral-content" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z" /></svg></button>

        <div className="flex flex-wrap gap-5 py-5">
          <CreateHobbieModal updateHobbie={getHobbies} />

          {hobbies.map(hobbie => (
            <EditHobbieModal
              hobbie={hobbie}
              key={hobbie.id}
              updateHobbie={getHobbies}
            />
          ))}
        </div>
      </div>
    )
}
