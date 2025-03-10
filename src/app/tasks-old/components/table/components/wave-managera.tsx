import { FinishWeek } from './finish-week'
import { useFirestore } from '@/contexts/firebase.context'
import { NewWave } from './new-wave'

export function WaveManager() {
  const { firestore } = useFirestore()

  return (
    <>
      {
        firestore?.data()?.wave ? <FinishWeek /> : <NewWave />
      }
    </>
  )
}
