import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { deleteFirebaseDoc, getCurrentUserUid, updateFirebaseDoc } from './base.function'
import { db } from '../config'
import { ITask } from '@/@types/types'

export async function getFirestoreTasks() {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const tasksCollection = collection(userDoc, 'tasks')
    const docs = await getDocs(tasksCollection)
    return docs
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function createFirestoreTask(data: ITask) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const subcollectionHobbies = collection(userDoc, 'tasks')
    const newDocRef = await addDoc(subcollectionHobbies, data)
    return newDocRef
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function updateFirestoreTask(documentid: string, data: ITask) {
  updateFirebaseDoc(
    { error: 'Error 😢 Task was not updated!', success: 'Task updated' },
    {
      title: data.title,
      limitDate: data.limitDate,
      priority: data.priority,
      hobbieID: data.hobbie.id,
      state: data.state,
    },
    'tasks', documentid)
}

export async function deleteFirestoreTask(documentid: string) {
  deleteFirebaseDoc({ error: 'Error 😢 Task was not deleted!', success: 'Task deleted' }, 'tasks', documentid)
}
