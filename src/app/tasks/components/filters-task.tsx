'use client'

import { cn } from '@/util/cn.function'
import { useState } from 'react'

export function FiltersTask() {
  const [tabSelected, setTabSelected] = useState(0)

  const tabs = [
    {
      title: 'Week Tasks',
      fn: () => console.log('set to week'),
    },
    {
      title: 'OnGoing Tasks',
      fn: () => console.log('set to onGoing'),
    },
    {
      title: 'All Tasks',
      fn: () => console.log('set to all'),
    },
  ]

  function handleTab(tabIndex: number) {
    setTabSelected(tabIndex)
    tabs[tabIndex].fn()
  }

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {tabs.map((tab, index) => (
        <button role="tab" type="button" className={cn('tab', { 'tab-active': tabSelected === index })} key={tab.title} onClick={() => handleTab(index)}>{tab.title}</button>
      ))}
    </div>
  )
}
