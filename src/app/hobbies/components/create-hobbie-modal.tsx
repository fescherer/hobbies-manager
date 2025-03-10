'use client'

import { IHobbie } from '@/@types/types'
import { createFirestoreHobbies } from '@/lib/firebase/functions/hobbies.function'
import { useForm, SubmitHandler } from 'react-hook-form'

type CreateHobbieModalProps = {
  updateHobbie: () => void
}

export function CreateHobbieModal({ updateHobbie }: CreateHobbieModalProps) {
  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHobbie>()

  const onSubmit: SubmitHandler<IHobbie> = (data) => {
    createFirestoreHobbies({
      ...data,
      createdAt: new Date().toISOString(),
    })
    updateHobbie()
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
      <button className="flex h-80 w-60 items-center justify-center rounded-sm border shadow-md transition-all hover:scale-105" type="button" onClick={showDialog}>New Hobbie</button>

      <dialog id="new-hobbie-modal" className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold">New Hobbie</h3>
          <p className="py-4">Create a new hobbie to manage</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Hobbie Name</span>
              </label>

              <input
                type="text"
                placeholder="Your hobbie name"
                {...register('name', { required: 'Name is required' })}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              />

              {errors.name && <span className="text-error">{errors.name.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Hobbie Priority</span>
              </label>

              <input
                type="number"
                min={0}
                max={10}
                placeholder="Your hobbie priority"
                {...register('priority', { required: 'Priority is required' })}
                className={`input input-bordered w-full ${errors.priority ? 'input-error' : ''}`}
              />

              {errors.priority && <span className="text-error">{errors.priority.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Hobbie Color</span>
              </label>

              <input
                type="color"
                placeholder="Color of you hobbie"
                {...register('color')}
                className={`input input-bordered w-full ${errors.color ? 'input-error' : ''}`}
              />

              {errors.color && <span className="text-error">{errors.color.message}</span>}
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
