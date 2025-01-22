import { hobbies } from '@/mock/hobbies'
import Image from 'next/image'
import { cn } from '../util/cn.function'

export default function Hobbies() {
  const classCard = 'h-80 w-60 rounded border shadow-md transition-all hover:scale-105'
  return (
    <div className="flex flex-wrap gap-5 py-10">
      <button className={cn(classCard)} type="button">New Hobbie</button>

      {hobbies.map(hobbie => (
        <button key={hobbie.name} className={cn(classCard, 'flex flex-col items-center justify-center gap-5')} type="button">
          <Image src={hobbie.image} width={112} height={112} className="size-28 rounded-full" alt="" />

          <div>
            <h2>{hobbie.name}</h2>
          </div>
        </button>
      ))}
    </div>
  )
}
