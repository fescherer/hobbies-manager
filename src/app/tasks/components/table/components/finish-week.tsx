import { ITask } from '@/@types/types'
import { useFirestore } from '@/contexts/firebase.context'
import { useUser } from '@/contexts/user.context'
import { SubmitHandler, useForm } from 'react-hook-form'

type IReport = {
  weekReport: string
  grade: number
  tasks: ITask
}

export function FinishWeek() {
  const { user } = useUser()
  const { tasksCount } = useFirestore()

  // Dialog hide-show
  function showDialog() {
    (document?.getElementById('finish-week-modal') as HTMLDialogElement)?.showModal()
  }
  function hideModal() {
    (document?.getElementById('finish-week-modal') as HTMLDialogElement)?.close()
  }

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReport>()

  const onSubmit: SubmitHandler<IReport> = (data) => {
    console.log(data)
    hideModal()
  }

  return (
    <div className="flex w-full flex-col items-baseline gap-3">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-bold">{`Welcome, ${user?.displayName}`}</h2>

        <button className="btn btn-neutral fill-neutral-content" type="button" onClick={showDialog}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z" /></svg>
          Finish Week
        </button>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Tasks in the wave</div>
          <div className="stat-value">100</div>
        </div>

        <div className="stat">
          <div className="stat-title">Tasks completed</div>
          <div className="stat-value">10</div>
        </div>

        <div className="stat">
          <div className="stat-title">All tasks</div>
          <div className="stat-value">{tasksCount}</div>
        </div>
      </div>

      <>

        <dialog id="finish-week-modal" className="modal">
          <div className="modal-box">

            <h3 className="text-lg font-bold">Finish Week</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">How was your week?</span>
                </label>

                <textarea
                  placeholder="How was your week?"
                  {...register('weekReport', { required: 'Week report is necessary' })}
                  className={`textarea textarea-bordered min-h-40 w-full ${errors.weekReport ? 'input-error' : ''}`}
                />

                {errors.weekReport && <span className="text-error">{errors.weekReport.message}</span>}
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
    </div>
  )
}
