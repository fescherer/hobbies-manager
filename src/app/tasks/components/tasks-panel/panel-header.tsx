import { useState } from 'react'
import { useFilteredTasks } from '../contexts/tasks.context'
import { cn } from '@/util/cn.function'

export function PanelHeader() {
  const [tabSelected, setTabSelected] = useState(0)

  const { setTab } = useFilteredTasks()

  const tabs = [
    {
      title: 'Week Tasks',
      fn: () => setTab('wave'),
    },
    {
      title: 'OnGoing Tasks',
      fn: () => setTab('onGoing'),
    },
    {
      title: 'All Tasks',
      fn: () => setTab('all'),
    },
  ]

  function handleTab(tabIndex: number) {
    setTabSelected(tabIndex)
    tabs[tabIndex].fn()
  }

  return (
    <div role="tablist" className="tabs tabs-lifted ">
      {tabs.map((tab, index) => (
        <button role="tab" type="button" className={cn('tab', { 'tab-active !bg-slate-50': tabSelected === index })} key={tab.title} onClick={() => handleTab(index)}>{tab.title}</button>
      ))}
    </div>
  )
}
