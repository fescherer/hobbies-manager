import { hobbies } from '@/mock/hobbies'
import { CreateHobbieModal } from './components/create-hobbie-modal'
import { EditHobbieModal } from './components/edit-hobbie-modal'

export default function Hobbies() {
  return (
    <div className="flex flex-wrap gap-5 py-10">
      <CreateHobbieModal />

      {hobbies.map(hobbie => (
        <EditHobbieModal hobbie={hobbie} key={hobbie.id} />
      ))}
    </div>
  )
}
