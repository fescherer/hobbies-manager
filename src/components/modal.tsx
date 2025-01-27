'use client'

import { cn } from '@/util/cn.function'
import { PropsWithChildren, ReactNode } from 'react'

type ModalComponentProps = {
  modalID: string
  trigger: {
    class?: string
    content: ReactNode
  }
  actionsName: {
    cancel: string
    submit: string
    submitFN: () => void
  }
}

export function ModalComponent({ modalID, trigger = { class: 'btn btn-primary', content: 'Open Modal' }, actionsName = { cancel: 'No', submit: 'Yes', submitFN: () => {
  console.log('Submit')
} }, children }: PropsWithChildren<ModalComponentProps>) {
  return (
    <>
      <button className={cn(trigger.class || 'btn btn-primary')} type="button" onClick={() => (document?.getElementById(modalID) as HTMLDialogElement)?.showModal()}>
        {trigger.content}
      </button>

      <dialog id={modalID} className="modal">
        <div className="modal-box">
          {children}

          <form method="dialog" className="modal-action space-x-4">
            <button className="btn" type="submit">{actionsName.cancel}</button>
            <button className="btn btn-primary" type="submit" onClick={actionsName.submitFN}>{actionsName.submit}</button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit" />
        </form>
      </dialog>
    </>
  )
}
