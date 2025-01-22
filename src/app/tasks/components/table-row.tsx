'use client'

import { ITask } from '@/@types/types'
import { cn } from '@/app/util/cn.function'
import { hobbies } from '@/mock/hobbies'

type TableRowProps = {
  task: ITask
}

export function TableRow({ task }: TableRowProps) {
  const hobbie = hobbies.find(hobbie => hobbie.id === task.hobbie)

  function deleteTask() {
    console.log(task)
    console.log(`Task ${task.title} deleted`)
  }

  return (
    <tr key={task.id}>
      <td className="border-l-2" style={{ borderColor: hobbie?.color }}>
        <button type="button" className={cn({ 'fill-success': task.state === 'completed', 'transition-all hover:scale-105 hover:fill-success': task.state !== 'completed' })} disabled={task.state === 'completed'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" /></svg>
        </button>
      </td>

      <td>
        <div className="font-bold">{task.title}</div>
        <div className="text-sm opacity-50">{hobbie?.name}</div>
      </td>

      <td>
        description
      </td>

      <td>
        <select className="select w-full max-w-xs">
          <option disabled selected>{task.state}</option>
          <option>Completed</option>
          <option>OnGoing</option>
        </select>
      </td>

      <td>
        <button type="button" className="transition-all hover:scale-105 hover:fill-error" onClick={() => (document?.getElementById(`modal-${task.id}-${task.title}`) as HTMLDialogElement)?.showModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></svg>
        </button>

        <dialog id={`modal-${task.id}-${task.title}`} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Are you sure you want to delete this task?</h3>

            <p className="py-4">This action cannot be reversed</p>

            <form method="dialog" className="modal-action space-x-4">
              <button className="btn" type="submit" onClick={deleteTask}>Yes</button>
              <button className="btn btn-neutral" type="submit">No</button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button type="submit" />
          </form>
        </dialog>
      </td>
    </tr>
  )
}
