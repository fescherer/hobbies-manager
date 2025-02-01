import { ITask } from '@/@types/types'
import { SubmitHandler, useForm } from 'react-hook-form'

type IReport = {
  weekReport: string
  grade: number
  tasks: ITask
}

export function FinishWeek() {
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
    <>
      <button className="btn btn-neutral self-end" type="button" onClick={showDialog}>Finish Week</button>

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
  )
}
