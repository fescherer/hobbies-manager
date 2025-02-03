'use client'

import { ITask } from '@/@types/types'
import { deleteFirestoreTask, getFirestoreHobbie, getFirestoreTasks, updateFirestoreTask } from '@/lib/firebase/firestore.functions'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useUser } from './user.context'
import { toast } from 'react-toastify'

interface TasksType {
  fetchData: (reset?: boolean) => void
  updateTask: (task: ITask, state: string) => void
  deleteTask: (task: ITask) => Promise<void>
  data: ITask[]
  isLoading: boolean
}

export const Tasks = React.createContext<TasksType>({
  fetchData: () => null,
  updateTask: () => null,
  deleteTask: async () => Promise.resolve(),
  data: [],
  isLoading: false,
})

const defaultHobbie = {
  id: '',
  priority: 2,
  color: '',
  createdAt: '',
  name: '',
}

export function TasksProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { userUid } = useUser()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(reset?: boolean) {
    if (reset) {
      setData([])
    } else {
      setIsLoading(true)
      getFirestoreTasks().then(async (rawData) => {
        const items = rawData?.docs.map(doc => ({
          id: doc.id,
          priority: doc.data().priority,
          createdAt: doc.data().createdAt,
          title: doc.data().title,
          hobbieID: doc.data().hobbieID,
          hobbie: defaultHobbie,
          limitDate: doc.data().limitDate,
          state: doc.data().state,
          isWaveTask: doc.data().isWaveTask,
        })) || []

        const itemsWithHobbies: ITask[] = await Promise.all(
          items.map(async (item) => {
            if (!item.hobbieID) return { ...item, hobbie: defaultHobbie }

            const hobbieSnap = await getFirestoreHobbie(item.hobbieID)
            if (!hobbieSnap?.exists()) return { ...item, hobbie: defaultHobbie }

            return {
              ...item,
              hobbie: {
                id: hobbieSnap.id,
                priority: hobbieSnap.data().priority,
                color: hobbieSnap.data().color,
                createdAt: hobbieSnap.data().createdAt,
                name: hobbieSnap.data().name,
              },
            }
          }),
        )
        setData(itemsWithHobbies)
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  function updateTask(task: ITask, state: string) {
    updateFirestoreTask(userUid || '', task.id, {
      ...task,
      state: state,
    }).then(() => {
      toast.success('Task state updated!')
      // TODO, here when updated only state, I get all data again, it will be nice to get only state, or just update the state, so interface will not be in loading state
      fetchData()
    }).catch(() => {
      toast.error('Error 😢 Task state was not updated')
    })
  }

  function deleteTask(task: ITask) {
    return new Promise<void>((resolve, reject) => {
      deleteFirestoreTask(userUid || '', task.id).then(() => {
        toast.success('Task deleted!')
        return fetchData()
      }).then(resolve)
        .catch(() => {
          toast.error('Error 😢 Task was not deleted')
          return reject
        })
    })
  }

  return (
    <Tasks.Provider value={{ fetchData, updateTask, deleteTask, data, isLoading }}>
      {children}
    </Tasks.Provider>
  )
}

export function useTasks() {
  return React.useContext(Tasks)
}
