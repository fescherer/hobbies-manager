'use client'

import Link from 'next/link'
import { HeaderTabs } from './header-tabs'
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase/auth'
import { createSession, removeSession } from '@/actions/auth'
import { getFirestoreData } from '@/lib/firebase/firestore.functions'
import { useUser } from '@/contexts/user.context'

export function Header() {
  // const [user, setUser] = useState<User | null>(null)

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid
  //       console.log('uid', uid)
  //     } else {
  //       console.log('user is logged out')
  //     }
  //   })
  // }, [])

  // const handleLogin = () => {
  //   const auth = getAuth()
  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       // const credential = GoogleAuthProvider.credentialFromResult(result)
  //       setUser(result.user)

  //       if (userUid) {
  //         await createSession(userUid)
  //       }
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }

  // const handleLogout = () => {
  //   const auth = getAuth()
  //   signOut(auth).then(() => {
  //     console.log('logout')
  //     setUser(null)
  //   }).catch((error) => {
  //     console.log('logout error', error)
  //   })
  // }

  const { user } = useUser()

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle()
    if (userUid) {
      await createSession(userUid)
      getFirestoreData()
    }
  }

  const handleSignOut = async () => {
    await signOutWithGoogle()
    await removeSession()
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>

        {
          user?.uid && <HeaderTabs />
        }

        <div className="navbar-end">
          {user?.uid
            ? user && user.photoURL
              ? (
                <div className="flex gap-2">
                  <Link href="/profile" className="avatar btn btn-circle btn-ghost">
                    <img
                      className="w-10 rounded-full"
                      alt=""
                      src={user.photoURL}
                    />
                  </Link>

                  <button type="button" onClick={handleSignOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" /></svg>
                  </button>
                </div>
              )
              : (
                <div className="flex gap-2">
                  <Link href="/profile" className="avatar btn btn-circle btn-ghost">
                    <img
                      className="w-10 rounded-full"
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </Link>

                  <button type="button" onClick={handleSignOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" /></svg>
                  </button>
                </div>
              )
            : (
              <button type="button" onClick={handleSignIn}>
                Sign In with Google
              </button>
            )}
        </div>

      </div>

      <div className="flex md:hidden">
        dsadas
      </div>
    </div>
  )
}
