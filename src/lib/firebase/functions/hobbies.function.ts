import { IHobbie } from '@/@types/types'
import { deleteFirebaseDoc, getCurrentUserUid, updateFirebaseDoc } from './base.function'
import { db } from '../config'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'

export async function createFirestoreHobbies(data: IHobbie) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const subcollectionHobbies = collection(userDoc, 'hobbies')
    const newDocRef = await addDoc(subcollectionHobbies, data)
    return newDocRef
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getFirestoreHobbies() {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  const userDoc = doc(db, 'hobbies-manager', userUid)
  try {
    const hobbiesCollection = collection(userDoc, 'hobbies')
    const docs = await getDocs(hobbiesCollection)
    return docs
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getFirestoreHobbie(docId: string) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const hobbieCollection = doc(userDoc, 'hobbies', docId)
    const docs = await getDoc(hobbieCollection)
    return docs
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function updateFirestoreHobbie(documentid: string, data: IHobbie) {
  updateFirebaseDoc({ error: 'Error 😢 Hobbie was not updated!', success: 'Hobbie updated' }, data, 'hobbies', documentid)
}

export async function deleteFirestoreHobbie(documentid: string) {
  deleteFirebaseDoc({ error: 'Error 😢 Hobbie was not deleted!', success: 'Hobbie deleted!' }, 'hobbies', documentid)
}
