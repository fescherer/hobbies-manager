export type ITask = {
  id: string
  title: string
  hobbie: IHobbie
  priority: number
  limitDate: string
  state: string
  createdAt: string
}

export type IHobbie = {
  id: string
  name: string
  priority: number
  createdAt: string
  color: string
}
