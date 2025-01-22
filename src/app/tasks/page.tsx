import { tasks } from '@/mock/tasks'
import { TableRow } from './components/table-row'

export default function Tasks() {
  return (
    <div>
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
