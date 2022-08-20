import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from './App'
import './next-launches.css'

const getTime = (diff: number) => {
  if (diff < 1000) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const DAY = 1000 * 60 * 60 * 24
  const HOUR = 1000 * 60 * 60
  const MINUTE = 1000 * 60

  const days = Math.floor(diff / DAY)
  const hours = Math.floor((diff - days * DAY) / HOUR)
  const minutes = Math.floor((diff - days * DAY - hours * HOUR) / MINUTE)
  const seconds = Math.floor((diff - days * DAY - hours * HOUR - minutes * MINUTE) / 1000)
  return {
    days, hours, minutes, seconds
  }
}

const NextLaunches = () => {
  const context = useContext(AppContext)
  const { launchNext } = context
  const timer = useRef<any>()
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  console.log(launchNext)

  useEffect(() => {
    const startTimer = () => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = ''
      }

      const now = Date.now()
      const next = new Date(launchNext.launch_date_local).getTime()
      let diff = next - now
      if (diff > 1000) {
        timer.current = setInterval(() => {
          setTime(getTime(diff))
          diff -= 1000
        }, 1000)
      }
    }

    if (launchNext) {
      startTimer()
    }
  }, [launchNext])

  return (
    <div className="next">
      {
        launchNext && <div>
          <div className="time">
            <div className="time-item">
              <div className="time-value">{ time.days }</div>
              <div className="time-label">DAYS</div>
            </div>
            <div className="time-item">
              <div className="time-value">{ time.hours }</div>
              <div className="time-label">HOURS</div>
            </div>
            <div className="time-item">
              <div className="time-value">{ time.minutes }</div>
              <div className="time-label">MINUTES</div>
            </div>
            <div className="time-item">
              <div className="time-value">{ time.seconds }</div>
              <div className="time-label">SECONDS</div>
            </div>
          </div>

          <div className="next-content">
            <div className="next-title">{ launchNext.mission_name }</div>
            <div className="next-time">Date: { new Date(launchNext.launch_date_local).toUTCString() }</div>
            <div className="next-detail">{ launchNext.details }</div>
          </div>

        </div>
      }
      {
        !launchNext && <div>Loading....</div>
      }
    </div>
  )
}

export default NextLaunches
