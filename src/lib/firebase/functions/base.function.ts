import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config'
import { toast } from 'react-toastify'

export function getCurrentUserUid(): string | null {
  const user = auth.currentUser
  if (!user) {
    console.log('No user is signed in')
    return null
  }
  return user.uid
}

export async function deleteFirebaseDoc(msg: { error: string, success: string }, ...path: string[]) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const docRef = doc(db, 'hobbies-manager', userUid, ...path)
    deleteDoc(docRef).then(() => toast.success(msg.success))
  } catch (e) {
    console.log(e)
    toast.error(msg.error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateFirebaseDoc(msg: { error: string, success: string }, data: any, ...path: string[]) {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const docRef = doc(db, 'hobbies-manager', userUid, ...path)
    await setDoc(docRef, data).then(() => toast.success(msg.success))
  } catch (e) {
    console.log(e)
    toast.error(msg.error)
  }
}

export async function getFirestoreData() {
  const userUid = getCurrentUserUid()
  if (!userUid) return null

  try {
    const userDoc = doc(db, 'hobbies-manager', userUid)
    const docSnap = await getDoc(userDoc)

    if (docSnap.exists()) {
      return docSnap
    }

    await setDoc(userDoc, {
      name: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      createdAt: new Date(),
    })

    return await getDoc(userDoc)
  } catch (error) {
    console.error('Error getting Firestore data:', error)
    return null
  }
}
