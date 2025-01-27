'use client'

import { IHobbie } from '@/@types/types'
import { useFirestore } from '@/contexts/firebase.context'
import { cn } from '@/util/cn.function'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type EditHobbieModalProps = {
  hobbie: IHobbie
}

export function EditHobbieModal({ hobbie }: EditHobbieModalProps) {
  // Firestore data
  const { firestore } = useFirestore()

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHobbie>()

  useEffect(() => {
    reset(hobbie)
  }, [])

  const onSubmit: SubmitHandler<IHobbie> = (data) => {
    console.log(firestore)
    console.log(data)
    // createFirestoreHobbies(data)
    console.log('hobbie created')
  }

  function deleteHobbie() {

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
      <button key={hobbie.name} className={cn('h-80 w-60 rounded border shadow-md transition-all hover:scale-105', 'flex flex-col items-center justify-center gap-5')} onClick={showDialog} type="button">
        {/* <Image src={hobbie.image} width={112} height={112} className="size-28 rounded-full" alt="" /> */}
        <div style={{ background: hobbie.color }} className="size-28 rounded-full" />

        <div>
          <h2>{hobbie.name}</h2>
        </div>
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
              <button className="btn btn-primary" type="submit">Submit</button>
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
