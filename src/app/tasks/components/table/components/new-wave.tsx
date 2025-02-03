import { IWave } from '@/@types/types'
import { useFirestore } from '@/contexts/firebase.context'
import { createNewWave } from '@/lib/firebase/firestore.functions'
import { SubmitHandler, useForm } from 'react-hook-form'

export function NewWave() {
  // Dialog hide-show
  function showDialog() {
    (document?.getElementById('finish-week-modal') as HTMLDialogElement)?.showModal()
  }
  function hideModal() {
    (document?.getElementById('finish-week-modal') as HTMLDialogElement)?.close()
  }

  const { fetchData } = useFirestore()

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWave>()

  const onSubmit: SubmitHandler<IWave> = (data) => {
    createNewWave({
      ...data,
      deadline: new Date(data.deadline).toISOString(),
      createdAt: new Date().toISOString(),
    })
    hideModal()
    fetchData()
  }

  return (
    <>
      <button className="btn btn-neutral self-end" type="button" onClick={showDialog}>Start New Wave</button>

      <dialog id="finish-week-modal" className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold">Finish Week</h3>
          <p>A wave is a period to complete tasks. Remember, you can add or remove tasks later too.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">What is the name of your wave?</span>
              </label>

              <input
                placeholder="Wave name"
                {...register('name', { required: 'Wave name is necessary' })}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              />

              {errors.name && <span className="text-error">{errors.name.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Wave Deadline</span>
              </label>

              <input
                type="date"
                placeholder="Your task limit date"
                {...register('deadline', { required: 'Limit is required' })}
                className={`input input-bordered w-full ${errors.deadline ? 'input-error' : ''}`}
              />

              {errors.deadline && <span className="text-error">{errors.deadline.message}</span>}
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
