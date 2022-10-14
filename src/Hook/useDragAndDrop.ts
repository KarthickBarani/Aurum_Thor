import { useEffect, useState } from "react"




export const useDragAndDrop = () => {

    type finallyArrayprops = {
        index: number | string
        header: string
    }

    const [finallyArray, setfinallyArray] = useState<finallyArrayprops[]>([])

    useEffect(() => {
        const draggableContainer: NodeListOf<Element> = document.querySelectorAll('draggableContainer')
        const dragEls: NodeListOf<Element> = document.querySelectorAll('.dragEl')
        dragEls.forEach((dragEl) => {
            dragEl.addEventListener('dragstart', () => onDragStart(dragEl))
            dragEl.addEventListener('dragend', () => onDragEnd(dragEl))
        })

        draggableContainer.forEach((el: Element) => {
            el?.addEventListener('dragover', (e) => onDragOver(e, el))
        })

        console.log(draggableContainer)


        return () => {

            dragEls.forEach((dragEl) => {
                dragEl.removeEventListener('dragstart', () => onDragStart(dragEl))
                dragEl.removeEventListener('dragend', () => onDragEnd(dragEl))
            })

            draggableContainer.forEach((el) => {
                el?.removeEventListener('dragover', e => onDragOver(e, el))
            })


        }
    }, [])

    const getDragAfterElement = (draggableContainer: any, x: number) => {
        const draggableElements: any[] = [...draggableContainer?.querySelectorAll('.dragEl:not(.dragging)')]

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

    const onDragOver = (e, el) => {
        e.preventDefault()
        console.log('over')
        const afterElement = getDragAfterElement(el, e.clientX)
        const currentDragEl = document.querySelector('.dragging')
        if (afterElement === null) {
            el.appendChild(currentDragEl as Element)
        }
        else {
            el.insertBefore(currentDragEl as Element, afterElement)
        }
    }

    const onDragStart = (dragEl) => {
        dragEl.classList.add('dragging')
        console.log('start')
    }
    const onDragEnd = (dragEl) => {
        let array: finallyArrayprops[] = []
        dragEl.classList.remove('dragging')
        console.log("end")
        const draggableContainer: NodeListOf<Element> = document.querySelectorAll('.draggableContainer')

        draggableContainer.forEach((el) => {
            el?.querySelectorAll('th').forEach(elChild => {
                array.push({
                    index: elChild.cellIndex,
                    header: elChild.innerText.trim()
                })
            })
        })
        setfinallyArray(array)
    }

    return [finallyArray]

}