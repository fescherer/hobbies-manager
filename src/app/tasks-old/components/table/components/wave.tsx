import { useFirestore } from '@/contexts/firebase.context'
import { useTasks } from '@/contexts/tasks.context'

export function Wave() {
  const { firestore } = useFirestore()
  const { data: tasks } = useTasks()

  return (
    <>
      {
        firestore?.data()?.wave
          ? (
            <div className="flex flex-col">

              <span>
                Wave
                {firestore?.data()?.wave?.number}
              </span>

              <div className="stats shadow-sm">
                {/* <div className="stat">
                  <div className="stat-title">Tasks in the wave</div>
                  <div className="stat-value">100</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Tasks completed</div>
                  <div className="stat-value">10</div>
                </div> */}

                <div className="stat">
                  <div className="stat-title">All tasks</div>
                  <div className="stat-value">{tasks.length}</div>
                </div>
              </div>
            </div>
          )
          : (
            <div>
              <span>Você não está em nenhuma wave, para criar, utilize o botão abaixo</span>
            </div>
          )
      }
    </>
  )
}
