import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './config'

export async function getFirestoreData() {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    const docSnap = await getDoc(userDoc)
    if (docSnap.exists()) {
      console.log('User data:', docSnap.data())
      return docSnap
    } else {
      console.log('No such document!')
      try {
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          tasks: [],
          hobbies: [],
        })

        const docSnap = await getDoc(userDoc)

        return docSnap
      } catch (e) {
        console.log(e)
        return null
      }
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}
