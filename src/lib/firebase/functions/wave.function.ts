import { IWave } from '@/@types/types'
import { getCurrentUserUid } from './base.function'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config'

export async function createNewWave(data: IWave) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const docSnap = await getDoc(userDoc)
    await setDoc(userDoc, {
      ...docSnap.data(),
      wave: data,
    })
    const updated = await getDoc(userDoc)
    return updated
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function addTaskToWave(taskID: string) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid, 'tasks', taskID)
    await updateDoc(userDoc, {
      isWaveTask: true,
    })
    const updated = await getDoc(userDoc)
    return updated
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function removeTaskFromWave(taskID: string) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid, 'tasks', taskID)
    await updateDoc(userDoc, {
      isWaveTask: false,
    })
    const updated = await getDoc(userDoc)
    return updated
  } catch (e) {
    console.log(e)
    return null
  }
}
