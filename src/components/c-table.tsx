import './c-table.css'
import { CSSProperties } from 'react'

type TDataItem = {
  [x: string]: any
}

export type TColumnItem = {
  style?: CSSProperties
  key: string
  label: string
  render?: (value?: any, item?: TDataItem) => any
}

interface ICTable {
  dataKey: string
  data: TDataItem[]
  columns: TColumnItem[]
  loading?: boolean
}

const CTable = (props: ICTable) => {
  const { dataKey, data, columns, loading } = props
  return (
    <div className="table-box">
      <table className="table table-fixed">
        <thead>
        <tr>
          {
            columns.map(item => (
              <th style={item.style} key={`th_${item.key}`}>
                { item.label }
              </th>
            ))
          }
        </tr>
        </thead>
        <tbody>
        {
          data.map((item) => (
            <tr key={item[dataKey]}>
              {
                columns.map(column => (
                  <td style={column.style} key={`${item[dataKey]}_td_${column.key}`}>
                    { !column.render && item[column.key] }
                    { column.render && column.render(item[column.key], item) }
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
      {
        loading &&
        <div className="loading-box">
          <div className="loading" />
        </div>
      }
    </div>
  )
}

export default CTable
