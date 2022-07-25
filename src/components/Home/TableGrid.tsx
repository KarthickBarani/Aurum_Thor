import { useEffect } from "react"


export const TableGrid = (props: {
    getTableProps: Function
    getTableBodyProps: Function
    headerGroups: any
    rows: any
    prepareRow: any
    isTemp: boolean
    setAfterDragElement: Function

}) => {


    useEffect(() => {
        const draggableContainer = document.querySelectorAll('.draggableContainer')
        draggableContainer.forEach((el) => {
            el?.querySelectorAll('th').forEach((elChild, index) => {
                if (el.attributes['data-start-from']) {
                    if (index >= el.attributes['data-start-from'].value) {
                        elChild.setAttribute('draggable', 'true')
                        elChild.classList.add('dragEl')
                    }
                }
            })
        })
        const dragEls = document.querySelectorAll('.dragEl')

        dragEls.forEach((dragEl) => {
            dragEl.addEventListener('dragstart', () => {
                dragEl.classList.add('dragging')
            })
            dragEl.addEventListener('dragend', () => {
                dragEl.classList.remove('dragging')
            })
            dragEl.addEventListener('dragend', () => {
                const array: any = []
                draggableContainer.forEach((el) => {
                    el?.querySelectorAll('th').forEach(elChild => {
                        array.push({
                            index: elChild.cellIndex,
                            header: (elChild.innerText[elChild.innerText.length - 1] === '◢' || elChild.innerText[elChild.innerText.length - 1] === '◣') ? elChild.innerText.substring(0, elChild.innerText.length - 1).trim() : elChild.innerText
                        })
                    })
                })
                if (array.length > 0) {
                    props.setAfterDragElement(array)
                }
            })

        })

        draggableContainer.forEach((el) => {
            el?.addEventListener('dragover', (e: any) => {
                e.preventDefault()
                const afterElement = getDragAfterElement(el, e.clientX)
                const currentDragEl = document.querySelector('.dragging')
                if (afterElement == null) {
                    el.appendChild(currentDragEl as Element)
                }
                else {
                    el.insertBefore(currentDragEl as Element, afterElement)
                }
            })
        })

        function getDragAfterElement(draggableContainer, x: number) {
            const draggableElements = [...draggableContainer?.querySelectorAll('.dragEl:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = x - box.left - box.width / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
    }, [])


    return (

        <div className="card-body card-scroll" style={{ 'height': '45vh' }}>
            <div className="table-responsive">
                <table {...props.getTableProps()} className='table table-rounded table-hover gs-3 gx-3'>
                    <thead className='fw-bolder fs-6 '>
                        {props.headerGroups.map(headerGroup => (
                            <tr  {...headerGroup.getHeaderGroupProps()} className='draggableContainer' data-start-from={3} >
                                {headerGroup.headers.map((column) => (
                                    <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span className='ps-3 text-end'>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? '     ◢'
                                                    : '     ◣'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...props.getTableBodyProps()} className='fw-bold fs-7' >
                        {props.rows.map(row => {
                            props.prepareRow(row)
                            return (
                                <tr className={row.values.select === true ? 'table-active' : ''} {...row.getRowProps()} >
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}