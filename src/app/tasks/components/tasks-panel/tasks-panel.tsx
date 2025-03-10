import { PanelHeader } from './panel-header'
import { PanelList } from './panel-list'

export function TasksPanel() {
  const data = ['a']

  return (
    <div>
      <PanelHeader />
      <PanelList data={data} />
    </div>
  )
}
