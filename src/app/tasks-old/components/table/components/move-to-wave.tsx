import { ITask } from '@/@types/types'
import { useTasks } from '@/contexts/tasks.context'
import { addTaskToWave, removeTaskFromWave } from '@/lib/firebase/functions/wave.function'

type MoveToWaveProps = {
  task: ITask
}

export function MoveToWave({ task }: MoveToWaveProps) {
  const { fetchData } = useTasks()

  function moveToWave(task: ITask) {
    addTaskToWave(task.id)
    fetchData()
  }

  function removeFromWave(task: ITask) {
    removeTaskFromWave(task.id)
    fetchData()
  }

  return (
    <>
      {
        task.isWaveTask
          ? (
            <button type="button" className="fill-slate-600 hover:fill-slate-800" title="Remove from currently wave" onClick={() => removeFromWave(task)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M128,56H112V16a8,8,0,0,1,16,0Zm64,67.62V72a16,16,0,0,0-16-16H128v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,93.66,98.34L112,116.69V56H64A16,16,0,0,0,48,72V200a8,8,0,0,0,8,8h74.7c.32.67.67,1.34,1.05,2l.24.38,22.26,34a8,8,0,0,0,13.39-8.76l-22.13-33.79A12,12,0,0,1,166.4,190c.07.13.15.26.23.38l10.68,16.31A8,8,0,0,0,192,202.31V144a74.84,74.84,0,0,1,24,54.69V240a8,8,0,0,0,16,0V198.65A90.89,90.89,0,0,0,192,123.62Z" /></svg>
            </button>
          )

          : (
            <button type="button" className="fill-slate-600 hover:fill-slate-800" title="Move to currently wave" onClick={() => moveToWave(task)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M232,198.65V240a8,8,0,0,1-16,0V198.65A74.84,74.84,0,0,0,192,144v58.35a8,8,0,0,1-14.69,4.38l-10.68-16.31c-.08-.12-.16-.25-.23-.38a12,12,0,0,0-20.89,11.83l22.13,33.79a8,8,0,0,1-13.39,8.76l-22.26-34-.24-.38c-.38-.66-.73-1.33-1.05-2H56a8,8,0,0,1-8-8V96A16,16,0,0,1,64,80h48v48a8,8,0,0,0,16,0V80h48a16,16,0,0,1,16,16v27.62A90.89,90.89,0,0,1,232,198.65ZM128,35.31l18.34,18.35a8,8,0,0,0,11.32-11.32l-32-32a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,93.66,53.66L112,35.31V80h16Z" /></svg>
            </button>
          )
      }
    </>
  )
}
