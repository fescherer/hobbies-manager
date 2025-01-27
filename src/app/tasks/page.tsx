'use client'

import { Table } from './components/table'
import { useUser } from '@/contexts/user.context'

export default function Tasks() {
  const { user } = useUser()

  if (user)
    return (
      <Table />
    )
  else {
    <></>
  }
}
