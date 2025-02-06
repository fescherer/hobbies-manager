/* eslint-disable indent */
'use client'

import { ITask } from '@/@types/types'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useTasks } from '@/contexts/tasks.context'

interface FilteredTasksType {
  data: ITask[]
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}

export const FilteredTasks = React.createContext<FilteredTasksType>({
  data: [],
  tab: '',
  setTab: () => null,
})

export function FilteredTasksProvider({ children }: PropsWithChildren) {
  const [tab, setTab] = useState<string>('')
  const [data, setData] = useState<ITask[]>([])

  const { data: allTasks } = useTasks()

  useEffect(() => {
    switch (tab) {
      case 'wave': {
        const filteredData = allTasks.filter(task => task.isWaveTask)
        setData(filteredData)
        break
      }
      case 'onGoing': {
        const filteredData = allTasks.filter(task => task.state === 'ON GOING')
        setData(filteredData)
        console.log('change to onGoinfg')
        break
      }
      case 'all': {
        setData(allTasks)
        console.log('change to all')
        break
      }
      default: {
        setData(allTasks)
      }
    }
  }, [tab, allTasks])

  return (
    <FilteredTasks.Provider value={{ data, tab, setTab }}>
      {children}
    </FilteredTasks.Provider>
  )
}

export function useFilteredTasks() {
  return React.useContext(FilteredTasks)
}
