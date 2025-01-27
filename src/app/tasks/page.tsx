'use client'

import { tasks } from '@/mock/tasks'
import { TableRow } from './components/table-row'
import { useUserSession } from '@/hooks/use-user-section'
import { useFirestoreData } from '@/hooks/use-firestore-data'
import { ModalComponent } from '@/components/modal'

export default function Tasks() {
  const userSessionId = useUserSession()
  const firestoreData = useFirestoreData()

  function createTask() {
    console.log('Task Created')
  }

  return (
    <div>
      <pre>{JSON.stringify(firestoreData?.get('createdAt'))}</pre>
      <pre>{JSON.stringify(userSessionId)}</pre>

      <ModalComponent modalID="create-task" trigger={{ content: 'Create task' }} actionsName={{ cancel: 'Cancel', submit: 'Create Task', submitFN: createTask }}>
        <>
          <h3 className="text-lg font-bold">Are you sure you want to delete this task?</h3>
          <p className="py-4">This action cannot be reversed</p>
        </>
      </ModalComponent>

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
