'use client'

import { cn } from '@/util/cn.function'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderTabs() {
  const route = usePathname()
  return (
    <div className="navbar-center hidden md:flex">
      <ul className="menu menu-horizontal menu-md px-1">
        <li><Link href="/tasks" className={cn({ 'active ': route === '/tasks' })}>Tasks</Link></li>
        <li><Link href="/hobbies" className={cn({ 'active ': route === '/hobbies' })}>Hobbies</Link></li>
      </ul>

    </div>
  )
}
