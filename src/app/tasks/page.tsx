'use client'

import { tasks } from '@/mock/tasks'
import { TableRow } from './components/table-row'
import { useUserSession } from '@/hooks/use-user-section'
import { useFirestoreData } from '@/hooks/use-firestore-data'

export default function Tasks() {
  const userSessionId = useUserSession()
  const firestoreData = useFirestoreData()

  return (
    <div>
      <pre>{JSON.stringify(firestoreData?.get('createdAt'))}</pre>
      <pre>{JSON.stringify(userSessionId)}</pre>

      <div className="overflow-x-auto">
        <table className="table border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Description</th>
              <th>State</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {
              tasks.map(task => (
                <TableRow key={task.id} task={task} />
              ))
            }
          </tbody>

          <tfoot>
            <tr>
              <th />
              <th />
              <th />
              <th />
              <th>{`Total tasks: ${tasks.length}`}</th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}
