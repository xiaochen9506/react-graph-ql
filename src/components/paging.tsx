import React from 'react'
import './paging.css'
import classNames from 'classnames'

interface IPaging {
  current: number
  pageChange?: (page: number) => void
}

const Paging = (props: IPaging) => {
  const { current = 1, pageChange } = props

  const preClick = () => {
    pageChange?.(current - 1 < 1 ? 1 : current - 1)
  }

  const nextClick = () => {
    pageChange?.(current + 1)
  }

  return (
    <div className="paging">
      <div onClick={preClick} className={classNames('pre-page', { 'disabled': current === 1 })}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20">
          <path
            d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
          />
        </svg>
      </div>
      <div onClick={nextClick} className="next-page">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20">
          <path
            d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
          />
        </svg>
      </div>
    </div>
  )
}

export default Paging
