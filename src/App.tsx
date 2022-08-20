import React, { useEffect, useState } from 'react'
import { useQuery, gql, ApolloClient, InMemoryCache } from '@apollo/client'
import './App.css'
import PastLaunches from './past-launches'
import classNames from 'classnames'
import NextLaunches from './next-launches'

const PastGql = (offset: number = 0, limit: number = 10) => gql`
  {
    launchesPast(limit: ${limit}, offset: ${offset}) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
      details
    }
  }
`

const NextGql = gql`
{
  launchNext {
    launch_date_local
    id
    launch_site {
      site_name_long
    }
    launch_success
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      rocket_type
    }
    details
    mission_name
  }
}
`

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
})

const clientQuery = async (query: any) => {
  return client
    .query({
      query,
    })
    .catch(() => false)
}

type TAppContext = {
  pastLaunches: any
  pastCurrent: number
  launchNext: any
}

export const AppContext = React.createContext<TAppContext>({
  pastLaunches: [],
  pastCurrent: 1,
  launchNext: null,
})


const App = () => {

  const [context, setContext] = useState({
    pastLaunches: [],
    pastCurrent: 1,
    launchNext: null,
  })

  const getPastLaunches = async (page = 1) => {
    console.log(page, 'page')
    const res: any = await clientQuery(PastGql((page - 1) * 10))
    if (res?.data?.launchesPast) {
      setContext(o => ({
        ...o,
        pastCurrent: page,
        pastLaunches: res?.data?.launchesPast
      }))
    }
  }

  useEffect(() => {
    const init = async () => {
      const res: any = await clientQuery(NextGql)
      console.log(res?.data?.launchNext)
      if (res?.data?.launchNext) {
        setContext(o => ({
          ...o,
          launchNext: res?.data?.launchNext
        }))
      }
    }

    init()
    getPastLaunches()
  }, [])

  const [tab, setTab] = useState('next')

  return (
    <AppContext.Provider value={context}>
      <div className="body">
        <div className="container">
          <h1>SpaceX Launches</h1>
          <div className="content">
            <div className="tab">
              <div onClick={() => setTab('next')} className={classNames('tab-item', { 'active': tab === 'next' })}>Next Launches</div>
              <div onClick={() => setTab('past')} className={classNames('tab-item', { 'active': tab === 'past' })}>Past Launches</div>
            </div>
            {
              tab === 'next' && <NextLaunches />
            }
            {
              tab === 'past' && <PastLaunches getPastLaunches={getPastLaunches} />
            }
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
