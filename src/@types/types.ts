export type ITask = {
  id: string
  title: string
  hobbie: IHobbie
  priority: number
  limitDate: string
  state: string
  createdAt: string
  isWaveTask: boolean
}

export type IHobbie = {
  id: string
  name: string
  priority: number
  createdAt: string
  color: string
}

export type IWave = {
  name: string
  deadline: string
  createdAt: string
}
