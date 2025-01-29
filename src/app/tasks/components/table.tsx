import { useEffect, useState } from 'react'
import { deleteFirestoreTask, getFirestoreHobbie, getFirestoreTasks, updateFirestoreTask } from '@/lib/firebase/firestore.functions'
import { CreateTaskModal } from './create-task.modal'
import { FiltersTask } from './filters-task'
import { ITask } from '@/@types/types'
import { useUser } from '@/contexts/user.context'

const defaultHobbie = {
  id: '',
  priority: 2,
  color: '',
  createdAt: '',
  name: '',
}

const tableHeaders = ['Title', 'State', 'Date limit', 'Hobbie', 'Priority', 'Actions']

const taskStates = [
  {
    title: 'COMPLETED',
    color: '#09aa3b',
  },
  {
    title: 'ON GOING',
    color: '#0059d2',
  },
  {
    title: 'NOT STARTED',
    color: '#7d7d7d',
  },
]

export function Table() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { userUid } = useUser()

  useEffect(() => {
    getTasks()
  }, [])

  // async function getTasks() {
  //   setIsLoading(true)
  //   getFirestoreTasks().then((data) => {
  //     const sorted = data?.docs.map(task => getTaskObj(task)).then(dataFormated => (

  //     ))

  //     // .sort((a, b) => {
  //     //   if (a.priority < b.priority) return 1
  //     //   else return 0
  //     // }) || []

  //     setTasks(awaited)
  //   }).finally(() => {
  //     setIsLoading(false)
  //   })
  // }

  async function getTasks() {
    setIsLoading(true)
    const querySnapshot = await getFirestoreTasks()
    const items = querySnapshot?.docs.map(doc => ({
      id: doc.id,
      priority: doc.data().priority,
      createdAt: doc.data().createdAt,
      title: doc.data().title,
      hobbieID: doc.data().hobbie,
      limitDate: doc.data().limitDate,
      state: doc.data().state }))

    if (!items) return []

    const itemsWithHobbies = await Promise.all(
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

    setIsLoading(false)
    setTasks(itemsWithHobbies)
    console.log(itemsWithHobbies)
    return itemsWithHobbies
  }

  async function updateTask(task: ITask, state: string) {
    await updateFirestoreTask(userUid || '', task.id, {
      ...task,
      state: state,
    })
    getTasks()
  }

  function getStateColor(state: string) {
    const findState = taskStates.find(taskState => taskState.title === state)
    if (findState) return findState.color
    else return '#aa5560'
  }

  // Dialog hide-show
  function showDialog(task: ITask) {
    (document?.getElementById(`modal-${task.id}-${task.title}`) as HTMLDialogElement)?.showModal()
  }
  function hideModal(task: ITask) {
    (document?.getElementById(`modal-${task.id}-${task.title}`) as HTMLDialogElement)?.close()
  }

  async function deleteTask(task: ITask) {
    await deleteFirestoreTask(userUid || '', task.id)
    getTasks()
    hideModal(task)
  }

  function getFormatedDate(task: ITask) {
    const formatter = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' })
    const date = formatter.format(new Date(task.limitDate))

    return date
  }

  if (isLoading) return <>Loading....</>
  else
    return (
      <div>
        <div>
          <div className="mt-10 flex w-full flex-col items-baseline">
            <CreateTaskModal updateTasks={getTasks} />
            <FiltersTask />
          </div>

          <div className="relative flex size-full flex-col rounded-b-lg bg-white bg-clip-border text-gray-700 shadow-md">
            <table className="size-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {tableHeaders.map(header => (
                    <th className="border-b border-slate-300 bg-slate-50 p-4" key={header}>
                      <p className="text-sm font-normal leading-none text-slate-500">
                        {header}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {
                  tasks.map(task => (
                    <tr key={task.id} className="border-b border-slate-50 even:bg-blue-50/50" title={task.title}>
                      <td className="flex items-center gap-2 px-4 py-5">
                        <div style={{ background: task.hobbie.color }} className="size-4 rounded-full" />

                        <p className="block w-52 truncate text-sm font-semibold text-slate-800">
                          {task.title}
                        </p>
                      </td>

                      <td className="px-4 py-5">

                        <div className="dropdown ">
                          <div
                            tabIndex={0}
                            role="button"
                            className="rounded-md px-2 py-1 font-sans text-xs font-bold uppercase"
                            style={{ background: `${getStateColor(task.state)}20`, color: getStateColor(task.state) }}
                          >
                            <span>{task.state}</span>
                          </div>

                          <ul tabIndex={0} className="menu dropdown-content absolute z-[1] w-52 space-y-2 rounded-box bg-base-100 p-2 shadow">
                            {
                              taskStates.map(state => (
                                <li key={state.title}>
                                  <button
                                    type="button"
                                    onClick={() => updateTask(task, state.title)}
                                    className="rounded-md font-sans text-xs font-bold"
                                    style={{ background: `${state.color}20`, color: state.color }}
                                  >
                                    {state.title}
                                  </button>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <p className="block text-sm font-semibold text-slate-800">{getFormatedDate(task)}</p>
                      </td>

                      <td className="px-4 py-5">
                        <p className="block text-sm text-slate-800">{task.hobbie.name}</p>
                      </td>

                      <td className="px-4 py-5">
                        <p className="block text-sm text-slate-800">{task.priority}</p>
                      </td>

                      <td className="px-4 py-5">
                        <div className="block text-center">
                          <button type="button" className="fill-slate-600 hover:fill-error" onClick={() => showDialog(task)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z" /></svg>
                          </button>

                          <dialog id={`modal-${task.id}-${task.title}`} className="modal">
                            <div className="modal-box">
                              <h3 className="text-lg font-bold">Are you sure you want to delete this task?</h3>
                              <p className="py-4">This action cannot be reversed</p>

                              <div className="modal-action space-x-4">
                                <button className="btn" type="submit" onClick={() => deleteTask(task)}>Yes</button>
                                <button className="btn btn-neutral" type="submit">No</button>
                              </div>
                            </div>

                            <div className="modal-backdrop">
                              <button type="button" onClick={() => hideModal(task)} />
                            </div>
                          </dialog>

                          <button type="button" className="fill-slate-600 hover:fill-slate-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
    // <div className="mt-10 flex flex-col">

  //   <div className="flex items-center justify-between">
  //     <FiltersTask />
  //     <CreateTaskModal updateTasks={getTasks} />
  //   </div>

  { /* <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th>Title</th>
                <th>Hobbie</th>
                <th>State</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                tasks.map(task => (
                  <tr key={task.id}>
                    <td className="flex items-center gap-1">
                      <div className="size-4 rounded-full" style={{ backgroundColor: task.hobbie.color }} />
                      <span className="text-lg font-bold">{task.title}</span>
                    </td>

                    <td>
                      <span>{task.hobbie.name}</span>
                    </td>

                    <td />
                    <td />
                    <td />

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
          */ }

  // </div>

  // return (

  //     <div className="overflow-x-auto">
  //       <table className="table border-separate border-spacing-y-2">
  //         <thead>
  //           <tr>
  //             <th />
  //             <th>Name</th>
  //             <th>State</th>
  //             <th>Hobbie</th>
  //             <th>Actions</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {
  //             tasks?.docs.map(task => (
  //               <TableRow
  //                 updateTasks={getTasks}
  //                 key={task.id}
  //                 task={{
  //                   id: task.id,
  //                   priority: task.data().priority,
  //                   createdAt: task.data().createdAt,
  //                   title: task.data().title,
  //                   hobbie: task.data().hobbie,
  //                   limitDate: task.data().limitDate,
  //                   state: task.data().state,
  //                 }}
  //               />
  //             ))
  //           }
  //         </tbody>

  //         <tfoot>
  //           <tr>
  //             <th />
  //             <th />
  //             <th />
  //             <th />
  //             <th>{`Total tasks: ${tasks?.docs.length}`}</th>
  //           </tr>
  //         </tfoot>
  //       </table>
  //     </div>

  //   </div>
  // )
}
