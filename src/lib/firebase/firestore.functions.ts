import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { auth, db } from './config'
import { IHobbie, ITask } from '@/@types/types'

export async function getFirestoreData() {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    const docSnap = await getDoc(userDoc)
    if (docSnap.exists()) {
      return docSnap
    } else {
      try {
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        })

        // collection(userDoc, 'tasks')
        // collection(userDoc, 'hobbies')

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

export async function createFirestoreHobbies(data: IHobbie) {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    try {
      const subcollectionHobbies = collection(userDoc, 'hobbies')
      const newDocRef = await addDoc(subcollectionHobbies, data)
      return newDocRef
    } catch (e) {
      console.log(e)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function getFirestoreHobbies() {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    try {
      const hobbiesCollection = collection(userDoc, 'hobbies')
      const docs = await getDocs(hobbiesCollection)
      return docs
    } catch (e) {
      console.log(e)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function getFirestoreHobbie(docId: string) {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    try {
      const hobbieCollection = doc(userDoc, 'hobbies', docId)
      const docs = await getDoc(hobbieCollection)
      console.log('firestore hobbie', docs, docId)
      return docs
    } catch (e) {
      console.log(e)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function updateFirestoreHobbie(uid: string, documentid: string, data: IHobbie) {
  const user = auth.currentUser
  const userDoc = doc(db, 'hobbies-manager', uid)
  if (user && userDoc) {
    try {
      const docRef = doc(db, 'hobbies-manager', user.uid, 'hobbies', documentid)
      await setDoc(docRef, data)
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function deleteFirestoreHobbie(uid: string, documentid: string) {
  const user = auth.currentUser
  const userDoc = doc(db, 'hobbies-manager', uid)
  if (user && userDoc) {
    try {
      await deleteDoc(doc(db, 'hobbies-manager', user.uid, 'hobbies', documentid))
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function getFirestoreTasks() {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    try {
      const tasksCollection = collection(userDoc, 'tasks')
      const docs = await getDocs(tasksCollection)
      return docs
    } catch (e) {
      console.log(e)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function createFirestoreTask(data: ITask) {
  const user = auth.currentUser
  if (user) {
    const userDoc = doc(db, 'hobbies-manager', user.uid)
    try {
      const subcollectionHobbies = collection(userDoc, 'tasks')
      const newDocRef = await addDoc(subcollectionHobbies, data)
      return newDocRef
    } catch (e) {
      console.log(e)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function updateFirestoreTask(uid: string, documentid: string, data: ITask) {
  const user = auth.currentUser
  const userDoc = doc(db, 'hobbies-manager', uid)
  if (user && userDoc) {
    try {
      const docRef = doc(db, 'hobbies-manager', user.uid, 'tasks', documentid)
      await setDoc(docRef, {
        title: data.title,
        limitDate: data.limitDate,
        hobbie: data.hobbie,
        state: data.state,
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

export async function deleteFirestoreTask(uid: string, documentid: string) {
  const user = auth.currentUser
  const userDoc = doc(db, 'hobbies-manager', uid)
  if (user && userDoc) {
    try {
      await deleteDoc(doc(db, 'hobbies-manager', user.uid, 'tasks', documentid))
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}
