import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useColumnOrder } from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'
import {matchSorter} from 'match-sorter'



const Styles = styled.div`
  padding: 1rem;

  .low {
    background-color: #11cc33
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
      background: white;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
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




function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val



function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const defaultPropGetter = () => ({})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    getCellProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,



    // visibleColumns,
    prepareRow,
    // setColumnOrder,
    // state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useColumnOrder,
    useFilters,
    useSortBy
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
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
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
            {rows.slice(0, 10).map((row, i) => {
              prepareRow(row)
              return (
                <motion.tr
                  {...row.getRowProps({
                    layoutTransition: spring,
                    exit: { opacity: 0, maxHeight: 0 },
                  })}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <motion.td
                        {...cell.getCellProps({
                          // layoutTransition: spring,
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                        )}
                      >
                        {cell.render('Cell')}
                      </motion.td>
                    )
                  })}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
        
      {/* 
       <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre> */}
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function App() {

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
        Header: 'ACE',
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
        Header: 'Support System Questionaire',
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
        Header: 'Insomnia Severity Index',
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
        Header: 'Generalized Anxiety Index',
        accessor: 'GAD',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Columbia Suicide Severity Rating Scale',
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
        CLI: "Mickey Mouse",
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
        PIL: '0',
        ACE: '0',
        AA: '0',
        SSQ: '15',
        PTS: '0',
        ISI: '0',
        DEP: '25',
        GAD: '15',
        SSRS: '0',
        OR: '20',
      },
      {
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
        PIL: '15',
        ACE: '15',
        AA: '0',
        SSQ: '0',
        PTS: '10',
        ISI: '0',
        DEP: '0',
        GAD: '20',
        SSRS: '20',
        OR: '25',
      },
      {
        PIL: '0',
        ACE: '10',
        AA: '20',
        SSQ: '0',
        PTS: '0',
        ISI: '0',
        DEP: '5',
        GAD: '15',
        SSRS: '0',
        OR: '15',
      },
      {
        PIL: '0',
        ACE: '0',
        AA: '15',
        SSQ: '0',
        PTS: '15',
        ISI: '15',
        DEP: '0',
        GAD: '0',
        SSRS: '0',
        OR: '15',
      },
    ],
    []
  )  

  return (
    <Styles>
      <Table columns={columns} data={data} 

        getCellProps={cellInfo => ({
          style: {
            backgroundColor: `hsl(${25 * ((25 - cellInfo.value) / 25) * +3 +
              25}, 100%, 55%)`,
          },
        })}
      />
    </Styles>
  )
}

export default App
