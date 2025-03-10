'use client'

import { useUser } from '@/contexts/user.context'
import { TasksStats } from './components/tasks-stats/tasks-stats'
import { TasksPanel } from './components/tasks-panel/tasks-panel'

export default function Tasks() {
  const { user } = useUser()

  return (
    <>
      {user
        ? (
          <div>
            <TasksStats />
            <TasksPanel />
          </div>
        )
        : <div>Você precisa estar logado para acessar essa página</div>}
    </>
  )
}
