'use client'

import { cn } from '@/app/util/cn.function'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const route = usePathname()

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal menu-md px-1">
            <li><Link href="/tasks" className={cn({ 'active ': route === '/tasks' })}>Tasks</Link></li>
            <li><Link href="/hobbies" className={cn({ 'active ': route === '/hobbies' })}>Hobbies</Link></li>
            <li><Link href="/tags" className={cn({ 'active ': route === '/tags' })}>Tags</Link></li>
          </ul>

        </div>

        <div className="navbar-end">
          <Link href="/profile" className="avatar btn btn-circle btn-ghost">
            <img
              className="w-10 rounded-full"
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </Link>
        </div>

      </div>

      <div className="flex md:hidden">
        dsadas
      </div>

      {route}
    </div>
  )
}
