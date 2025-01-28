'use client'

import { IHobbie, ITask } from '@/@types/types'
import { cn } from '@/util/cn.function'
import { deleteFirestoreTask, getFirestoreHobbie, updateFirestoreTask } from '@/lib/firebase/firestore.functions'
import { useUser } from '@/contexts/user.context'
import { useEffect, useState } from 'react'

type TableRowProps = {
  task: ITask
  updateTasks: () => void
}

export function TableRow({ task, updateTasks }: TableRowProps) {
  const [hobbie, setHobbie] = useState<IHobbie | null>(null)

  // Firestore data
  const { userUid } = useUser()

  async function deleteTask() {
    await deleteFirestoreTask(userUid || '', task.id)
    updateTasks()
    hideModal()
  }

  useEffect(() => {
    getHobbie()
  }, [])

  async function getHobbie() {
    const hobbieData = await getFirestoreHobbie(task.hobbie)
    if (hobbieData?.exists())
      setHobbie({
        id: hobbieData.id,
        color: hobbieData.data().color,
        createdAt: hobbieData.data().createdAt,
        name: hobbieData.data().name,
      })
  }

  async function updateTask(state: string) {
    await updateFirestoreTask(userUid || '', task.id, {
      ...task,
      state: state,
    })
    updateTasks()
  }

  // Dialog hide-show
  function showDialog() {
    (document?.getElementById(`modal-${task.id}-${task.title}`) as HTMLDialogElement)?.showModal()
  }
  function hideModal() {
    (document?.getElementById(`modal-${task.id}-${task.title}`) as HTMLDialogElement)?.close()
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
        <select value={task.state} className="select w-full max-w-xs" onChange={e => updateTask(e.target.value)}>
          <option disabled>{task.state}</option>
          <option value="Completed">Completed</option>
          <option value="OnGoing">OnGoing</option>
        </select>
      </td>

      <td>
        <button type="button" className="transition-all hover:scale-105 hover:fill-error" onClick={showDialog}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></svg>
        </button>

        <dialog id={`modal-${task.id}-${task.title}`} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Are you sure you want to delete this task?</h3>
            <p className="py-4">This action cannot be reversed</p>

            <div className="modal-action space-x-4">
              <button className="btn" type="submit" onClick={deleteTask}>Yes</button>
              <button className="btn btn-neutral" type="submit">No</button>
            </div>
          </div>

          <div className="modal-backdrop">
            <button type="button" onClick={hideModal} />
          </div>
        </dialog>
      </td>
    </tr>
  )
}
