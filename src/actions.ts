'use server'

import { getFirestore } from 'firebase/firestore'
import { getAuthenticatedAppForUser } from './lib/firebase/serverApp'

// This is a Server Action
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleReviewFormSubmission(data: any) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser()
  const db = getFirestore(firebaseServerApp)
  console.log(db, data)

  // await addReviewToRestaurant(db, data.get('restaurantId'), {
  //   text: data.get('text'),
  //   rating: data.get('rating'),

  //   // This came from a hidden form field
  //   userId: data.get('userId'),
  // })
}
