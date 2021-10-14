import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useColumnOrder, useRowSelect} from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'




const Styles = styled.div`
  padding: 1rem;


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

    td {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      height: 38px;
      padding: 0;
   

      :last-child {
        border-right: 0;
      }
    }

    th
    {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // getTdProps,
    // selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable({
    columns,
    data,

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
    <>
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
    <br></br>
    
        </>
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

        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: (column) => {
          return <span data-tip={column.value}>{column.value}</span>;
        }
      },
      {
        Header: 'Purpose In Life',
        accessor: 'PIL', // accessor is the "key" in the data
      
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value, column, PIL }) => {
          const nameArr = ['0'];
    

          return nameArr.includes(value) ? (
            <div className='zero' >{value} </div>
            
          ) : (
            value
          );
        },
        tipText: 'Purpose In Life' 
      },
      {
        Header: "ACE'S",
        accessor: 'ACE',
  
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Alcohol Abuse',
        accessor: 'AA',

        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Support System',
        accessor: 'SSQ',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Post Trauma Stress',
        accessor: 'PTS',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Insomnia Severity',
        accessor: 'ISI',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Depression',
        accessor: 'DEP',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Generalized Anxiety',
        accessor: 'GAD',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Suicide Severity Rating',
        accessor: 'SSRS',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];
 
          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      },
      {
        Header: 'Overall Rating',
        accessor: 'OR',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          const nameArr = ['0'];

          return nameArr.includes(value) ? (
            <div className='zero' >{value}</div>
          ) : (
            value
          );
        }
      }
    ],
    []
  )

  
  const data = React.useMemo(
    () => [
      {
       CLI: 'Carlos',
        PIL: '0',
        ACE: '15',
        AA: '30',
        SSQ: '0',
        PTS: '25',
        ISI: '30',
        DEP: '0',
        GAD: '30',
        SSRS: '30',
        OR: '30',
      },
      {
       CLI: 'Joshua',
        PIL: '0',
        ACE: '15',      
        AA: '30',
        SSQ: '0',
        PTS: '15',
        ISI: '30',
        DEP: '15',
        GAD: '30',
        SSRS: '0',
        OR: '30',
      },
      {
       CLI: 'Ashley',
        PIL: '0',
        ACE: '0',
        AA: '30',
        SSQ: '15',
        PTS: '15',
        ISI: '25',
        DEP: '15',
        GAD: '25',
        SSRS: '30',
        OR: '30',
      },
      {
        CLI: 'Douglas',
        PIL: '25',
        ACE: '15',
        AA: '0',
        SSQ: '0',
        PTS: '25',
        ISI: '0',
        DEP: '15',
        GAD: '0',
        SSRS: '0',
        OR: '25',
      },
      {
        CLI: 'Donna',
        PIL: '0',
        ACE: '0',
        AA: '0',
        SSQ: '0',
        PTS: '15',
        ISI: '15',
        DEP: '25',
        GAD: '0',
        SSRS: '0',
        OR: '25',
      },
      {
        CLI: 'Jerome',
        PIL: '0',
        ACE: '0',
        AA: '30',
        SSQ: '15',
        PTS: '0',
        ISI: '0',
        DEP: '0',
        GAD: '0',
        SSRS: '30',
        OR: '25',
      },
        {
          CLI: 'Kelly',
          PIL: '0',
          ACE: '0',
          AA: '30',
          SSQ: '0',
          PTS: '0',
          ISI: '15',
          DEP: '0',
          GAD: '0',
          SSRS: '0',
          OR: '15',
        },
        {
          CLI: 'Mary',
          PIL: '0',
          ACE: '15',
          AA: '0',
          SSQ: '0',
          PTS: '15',
          ISI: '15',
          DEP: '0',
          GAD: '0',
          SSRS: '25',
          OR: '15',
        },
        {
          CLI: 'Alvin',
          PIL: '0',
          ACE: '15',
          AA: '30',
          SSQ: '0',
          PTS: '0',
          ISI: '0',
          DEP: '15',
          GAD: '15',
          SSRS: '0',
          OR: '15',
        },   
       {
        CLI: 'Lori',
         PIL: '0',
         ACE: '15',
         AA: '0',
         SSQ: '0',
         PTS: '0',
         ISI: '0',
         DEP: '0',
         GAD: '0',
         SSRS: '0',
         OR: '0',
       },
       {
        CLI: 'Patrick',
         PIL: '0',
         ACE: '0',
         AA: '0',
         SSQ: '0',
         PTS: '0',
         ISI: '0',
         DEP: '0',
         GAD: '0',
         SSRS: '0',
         OR: '0',
       },
       {
        CLI: 'Beverly',
         PIL: '0',
         ACE: '0',
         AA: '0',
         SSQ: '0',
         PTS: '0',
         ISI: '0',
         DEP: '0',
         GAD: '0',
         SSRS: '0',
         OR: '0',
       },
       {
        CLI: 'April',
         PIL: '0',
         ACE: '0',
         AA: '25',
         SSQ: '0',
         PTS: '0',
         ISI: '0',
         DEP: '0',
         GAD: '0',
         SSRS: '0',
         OR: '0',
       },
    ],
    []
  )  
  // const data = React.useMemo(() => makeData(25), [])
  
  return (
    <Styles>
      <div className="table-outer">

        <Table
          columns={columns}
          data={data}
          
          getCellProps={cellInfo => ({
            style: {
              backgroundColor: `hsl(${25 * ((25 - cellInfo.value) / 25) * + 3 +
                25}, 100%, 50%)`,
              },
            })}
            

        />
      </div>
    </Styles>
  )
}

export default ReactColor;
