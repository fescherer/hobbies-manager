'use client'

import { useUser } from '@/contexts/user.context'
import { ListHobbies } from './components/list-hobbies'

export default function Hobbies() {
  const { user } = useUser()

  if (user)
    return (
      <ListHobbies />
    )
  else {
    <></>
  }
}
