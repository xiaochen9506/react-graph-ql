import CTable, { TColumnItem } from './components/c-table'
import React, { useContext, useState } from 'react'
import { AppContext } from './App'
import './past-launches.css'
import Paging from './components/paging'

interface IPastLaunchesProps {
  getPastLaunches: (page: number) => void
}

const PastLaunches = (props: IPastLaunchesProps) => {
  const { getPastLaunches } = props
  const context = useContext(AppContext)
  const { pastLaunches, pastCurrent } = context

  const pastLaunchesColumn: TColumnItem[] = [
    {
      key: 'mission_name', label: 'Mission', style: { width: '30%' }
    },
    {
      key: 'launch_date_local', label: 'Date (UTC)', render: (launch_date_local) => new Date(launch_date_local).toUTCString(),
    },
    {
      key: 'rocket', label: 'Vehicle', render: (rocket) => rocket?.rocket_name,  style: { width: '10%' }
    },
    {
      key: 'launch_site', label: 'launch_site',  render: (launch_site) => launch_site?.site_name_long
    },
  ]

  const [loading, setLoading] = useState(false)

  const pageChange = async (page: number) => {
    if (loading) return
    setLoading(true)
    await getPastLaunches(page)
    setLoading(false)
  }

  return (
    <div className="past-launches">
      {
        (pastLaunches?.length > 0) && (
          <>
            <CTable
              columns={pastLaunchesColumn}
              data={pastLaunches || []}
              dataKey="id"
              loading={loading}
            />
            <Paging pageChange={pageChange} current={pastCurrent} />
          </>
        )
      }
      {
        (!pastLaunches || pastLaunches.length < 1) && <div>Loading....</div>
      }
    </div>
  )
}

export default PastLaunches
