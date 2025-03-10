export type ITask = {
  id: string
  title: string
  hobbie: IHobbie
  hobbieID: string
  priority: number
  limitDate: string
  state: string
  createdAt: string
  isWaveTask: boolean
  time: number
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
