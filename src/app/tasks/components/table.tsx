import { useEffect, useState } from 'react'
import { TableRow } from './table-row'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import { getFirestoreTasks } from '@/lib/firebase/firestore.functions'
import { CreateTaskModal } from './create-task.modal'
import { FiltersTask } from './filters-task'

export function Table() {
  const [tasks, setTasks] = useState<QuerySnapshot<DocumentData, DocumentData> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getTasks()
  }, [])

  async function getTasks() {
    setIsLoading(true)
    await getFirestoreTasks().then((data) => {
      setTasks(data)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  if (isLoading) return <>Loading....</>
  else
    return (
      <div className="mt-10 flex flex-col">

        <div className="flex items-center justify-between">
          <FiltersTask />
          <CreateTaskModal updateTasks={getTasks} />
        </div>

        <div className="overflow-x-auto">
          <table className="table border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>State</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {
                tasks?.docs.map(task => (
                  <TableRow
                    updateTasks={getTasks}
                    key={task.id}
                    task={{
                      id: task.id,
                      createdAt: task.data().createdAt,
                      title: task.data().title,
                      hobbie: task.data().hobbie,
                      limitDate: task.data().limitDate,
                      state: task.data().state,
                    }}
                  />
                ))
              }
            </tbody>

            <tfoot>
              <tr>
                <th />
                <th />
                <th />
                <th>{`Total tasks: ${tasks?.docs.length}`}</th>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    )
}
