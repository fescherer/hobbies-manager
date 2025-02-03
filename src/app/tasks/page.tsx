'use client'

import { TasksProvider } from '@/contexts/tasks.context'
import { Table } from './components/table'
import { useUser } from '@/contexts/user.context'

export default function Tasks() {
  const { user } = useUser()

  if (user)
    return (
      <TasksProvider>
        <Table />
      </TasksProvider>
    )
  else {
    <></>
  }
}
