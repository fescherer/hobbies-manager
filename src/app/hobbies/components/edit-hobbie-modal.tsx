'use client'

import { IHobbie } from '@/@types/types'
import { deleteFirestoreHobbie, updateFirestoreHobbie } from '@/lib/firebase/functions/hobbies.function'
import { cn } from '@/util/cn.function'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type EditHobbieModalProps = {
  hobbie: IHobbie
  updateHobbie: () => void
}

export function EditHobbieModal({ hobbie, updateHobbie }: EditHobbieModalProps) {
  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHobbie>()

  useEffect(() => {
    console.log(hobbie)
    reset(hobbie)
  }, [])

  const onSubmit: SubmitHandler<IHobbie> = (data) => {
    updateFirestoreHobbie(data.id, data)
    updateHobbie()
    hideModal()
  }

  async function deleteHobbie() {
    await deleteFirestoreHobbie(hobbie.id)
    updateHobbie()
    hideModal()
  }

  // Dialog hide-show
  function showDialog() {
    (document?.getElementById(`${hobbie.id}-${hobbie.name}-modal`) as HTMLDialogElement)?.showModal()
  }
  function hideModal() {
    (document?.getElementById(`${hobbie.id}-${hobbie.name}-modal`) as HTMLDialogElement)?.close()
    reset()
  }

  return (
    <>
      <button className={cn('h-80 w-60 rounded-sm border shadow-md transition-all hover:scale-105', 'flex flex-col items-center justify-center gap-5')} onClick={showDialog} type="button">
        {/* <Image src={hobbie.image} width={112} height={112} className="size-28 rounded-full" alt="" /> */}
        <div style={{ background: hobbie.color }} className="size-28 rounded-full" />

        <div>
          <h2>{hobbie.name}</h2>
        </div>

        <h3>{hobbie.priority}</h3>
      </button>

      <dialog id={`${hobbie.id}-${hobbie.name}-modal`} className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold">
            {`Edit Hobbie ${hobbie.name}`}
          </h3>

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
              <button type="button" className="btn" onClick={hideModal}>Close</button>
              <button className="btn btn-error" type="button" onClick={deleteHobbie}>Delete</button>
              <button className="btn btn-primary" type="submit">Change</button>
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
