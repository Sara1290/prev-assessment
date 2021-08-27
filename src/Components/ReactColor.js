import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useColumnOrder, useRowSelect} from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'




const Styles = styled.div`
  padding: 1rem;

  .user {
    background-color: blue;
    color: white;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)
// Create a default prop getter
const defaultPropGetter = () => ({})

// Expose some prop getters for headers, rows and cells, or more if you want!
function Table({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  getTrProps = defaultPropGetter,
}) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable({
    columns,
    data,
    defaultColumn
  },
  useColumnOrder,
  useFilters,
  useSortBy,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      // Let's make a column for selection
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ])
  }
  )


  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )
    

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
             <motion.th
             {...column.getHeaderProps({
               
               className: column.className,
               style: column.style,
               layoutTransition: spring,
               
 
             })}
           >
             <div {...column.getSortByToggleProps()}>
               {column.render('Header')}
               <span>
                 {column.isSorted
                   ? column.isSortedDesc
                     ? ' 🔽'
                     : ' 🔼'
                   : ''}
               </span>
             </div>
             <div>{column.canFilter ? column.render('Filter') : null}</div>
           </motion.th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      <AnimatePresence>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            // Merge user row props in
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map(cell => {
                return (
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
            </AnimatePresence>
      </tbody>
    </table>
    
  )
}


//THIS FUNCTION ADDS A SEARCH INPUT WHEN THE DROP DOWN IS REMOVED FROM THE COLUMN. TO GET RID OF THE INPUT, I NULL OUT THE RETURN.
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  // const count = preFilteredRows.length

  return (
    null
    // <input
    //   value={filterValue || ''}
    //   onChange={e => {
    //     setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    //   }}
    //   placeholder={`Search ${count} records...`}
    // />
  )
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'



function ReactColor() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Client',
        accessor: 'CLI', // accessor is the "key" in the data
        minWidth: 150,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Purpose In Life',
        accessor: 'PIL', // accessor is the "key" in the data
        minWidth: 150,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: "ACE'S",
        accessor: 'ACE',
        minWidth: 150,
        Filter: SelectColumnFilter,
        filter: 'includes',

      },
      {
        Header: 'Alcohol Abuse',
        accessor: 'AA',
        minWidth: 150,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Support System',
        accessor: 'SSQ',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Post Trauma Stress',
        accessor: 'PTS',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Insomnia Severity',
        accessor: 'ISI',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Depression',
        accessor: 'DEP',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Generalized Anxiety',
        accessor: 'GAD',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Suicide Severity Rating',
        accessor: 'SSRS',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Overall Rating',
        accessor: 'OR',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  )

  const data = React.useMemo(
    () => [
      {
       CLI: '0001',
        PIL: '0',
        ACE: '0',
        AA: '15',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '0',
        GAD: '15',
        SSRS: '0',
        OR: '15',
      },
{
       CLI: '0002',
        PIL: '0',
        ACE: '0',      
        AA: '0',
        SSQ: '15',
        PTS: '0',
        ISI: '0',
        DEP: '25',
        GAD: '20',
        SSRS: '0',
        OR: '20',
      },
      {
       CLI: '0003',
        PIL: '0',
        ACE: '15',
        AA: '20',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '0',
        GAD: '15',
        SSRS: '0',
        OR: '15',
      },
      {
       CLI: '0004',
        PIL: '25',
        ACE: '15',
        AA: '20',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '15',
        GAD: '15',
        SSRS: '0',
        OR: '25',
      },
      {
       CLI: '0005',
        PIL: '15',
        ACE: '15',
        AA: '25',
        SSQ: '0',
        PTS: '15',
        ISI: '0',
        DEP: '0',
        GAD: '20',
        SSRS: '20',
        OR: '25',
      },
      {
       CLI: '0006',
        PIL: '0',
        ACE: '15',
        AA: '25',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '15',
        GAD: '15',
        SSRS: '0',
        OR: '15',
      },
      {
       CLI: '0007',  
        PIL: '0',
        ACE: '0',
        AA: '25',
        SSQ: '0',
        PTS: '15',
        ISI: '15',
        DEP: '0',
        GAD: '0',
        SSRS: '0',
        OR: '15',
      },
      {
       CLI: '0008',
        PIL: '20',
        ACE: '15',
        AA: '0',
        SSQ: '0',
        PTS: '20',
        ISI: '0',
        DEP: '25',
        GAD: '0',
        SSRS: '0',
        OR: '20',
      },
      {
       CLI: '0009',
        PIL: '0',
        ACE: '0',
        AA: '15',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '0',
        GAD: '15',
        SSRS: '0',
        OR: '0',
      },
      {
        CLI: '0009',
         PIL: '0',
         ACE: '0',
         AA: '15',
         SSQ: '0',
         PTS: '0',
         ISI: '0',
         DEP: '0',
         GAD: '15',
         SSRS: '0',
         OR: '0',
       },
    ],
    []
  )  
  // const data = React.useMemo(() => makeData(20), [])

  return (
    <Styles>
      <div className="table-outer">
        <Table
          columns={columns}
          data={data}
          
          getCellProps={cellInfo => ({
            style: {
              backgroundColor: `hsl(${25 * ((25 - cellInfo.value) / 25) * + 3 +
                25}, 100%, 55%)`,
              },
            })}
            getTrProps={(state, rowInfo, column) => {
                return {
                    style: {
                        background: rowInfo.row.selected ? 'green' : 'red'
                      }
                    }
                  }}
                  />
      </div>
    </Styles>
  )
}

export default ReactColor;
