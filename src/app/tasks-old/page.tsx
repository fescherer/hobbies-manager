'use client'

import { TasksProvider } from '@/contexts/tasks.context'
import { Table } from './components/table'
import { useUser } from '@/contexts/user.context'
import { FilteredTasksProvider } from './components/contexts/tasks.context'

export default function Tasks() {
  const { user } = useUser()

  if (user)
    return (
      <TasksProvider>
        <FilteredTasksProvider>
          <Table />
        </FilteredTasksProvider>
      </TasksProvider>
    )
  else {
    <></>
  }
}
