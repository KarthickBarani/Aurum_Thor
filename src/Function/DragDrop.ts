

export function tableColumnDraggable(setAfterDragElement) {
    const draggableContainer = document.querySelectorAll('.draggableContainer')
    draggableContainer.forEach((el) => {
        el?.querySelectorAll('th').forEach((elChild, index) => {
            if (el.attributes['data-start-from']) {
                if (index >= el.attributes['data-start-from'].value) {
                    elChild.classList.add('dragEl')
                    elChild.setAttribute('draggable', 'true')
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
                        header: elChild.innerText
                    })
                })
            })
            if (array.length > 0) {
                setAfterDragElement(array)
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
}
