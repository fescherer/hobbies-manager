import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp'
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { firebaseServerApp } = await getAuthenticatedAppForUser()
  const { currentUser } = await getAuthenticatedAppForUser()
  return (
    <>
      {firebaseServerApp.name}
      <pre>{JSON.stringify(currentUser)}</pre>
    </>
  )
}
