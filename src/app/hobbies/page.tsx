'use client'

import { useUser } from '@/contexts/user.context'
import { ListHobbies } from './components/list-hobbies'

export default function Hobbies() {
  const { user } = useUser()

  if (user)
    return (
      <div className="flex flex-wrap gap-5 py-10">
        <ListHobbies />
      </div>
    )
  else {
    <></>
  }
}
