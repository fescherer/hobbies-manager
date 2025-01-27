import { ITask } from '@/@types/types'
import { createFirestoreTask, getFirestoreHobbies } from '@/lib/firebase/firestore.functions'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type CreateTaskModalProps = {
  updateTasks: () => void
}

export function CreateTaskModal({ updateTasks }: CreateTaskModalProps) {
  const [hobbies, setHobbies] = useState<QuerySnapshot<DocumentData, DocumentData> | null>(null)
  useEffect(() => {
    getHobbies()
  }, [])

  async function getHobbies() {
    const hobbiesData = await getFirestoreHobbies()
    setHobbies(hobbiesData)
  }

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>()

  const onSubmit: SubmitHandler<ITask> = (data) => {
    createFirestoreTask({
      ...data,
      limitDate: new Date(data.limitDate).toISOString(),
      state: 'OnGoing',
      createdAt: new Date().toISOString(),
    })
    updateTasks()
    hideModal()
  }

  // Dialog hide-show
  function showDialog() {
    (document?.getElementById('new-hobbie-modal') as HTMLDialogElement)?.showModal()
  }
  function hideModal() {
    (document?.getElementById('new-hobbie-modal') as HTMLDialogElement)?.close()
    reset()
  }

  return (
    <>
      <button className="btn btn-neutral self-end" type="button" onClick={showDialog}>New Task</button>

      <dialog id="new-hobbie-modal" className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold">New Task</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>

              <input
                type="text"
                placeholder="Your task title"
                {...register('title', { required: 'Name is required' })}
                className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              />

              {errors.title && <span className="text-error">{errors.title.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Task Hobbie</span>
              </label>

              <select
                className="select select-bordered w-full max-w-xs"
                {...register('hobbie', { required: 'Hobbie is required' })}
              >
                {hobbies?.docs.map(hobbie => (
                  <option key={hobbie.id} value={hobbie.id}>{hobbie.data().name}</option>
                ))}
              </select>

              {errors.hobbie && <span className="text-error">{errors.hobbie.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Task Limit Date</span>
              </label>

              <input
                type="date"
                placeholder="Your task limit date"
                {...register('limitDate', { required: 'Limit is required' })}
                className={`input input-bordered w-full ${errors.limitDate ? 'input-error' : ''}`}
              />

              {errors.limitDate && <span className="text-error">{errors.limitDate.message}</span>}
            </div>

            <div className="modal-action">
              <button className="btn btn-primary" type="submit">Submit</button>
              <button type="button" className="btn" onClick={hideModal}>Close</button>
            </div>
          </form>
        </div>

        <div className="modal-backdrop">
          <button type="button" onClick={hideModal} />
        </div>
      </dialog>
    </>
  )
}
