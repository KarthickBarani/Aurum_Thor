




// const dragEls = document.querySelectorAll('.dragEl')

// dragEls.forEach((dragEl) => {
//     dragEl.addEventListener('dragstart', () => {
//         dragEl.classList.add('dragging')
//     })
//     dragEl.addEventListener('dragend', () => {
//         dragEl.classList.remove('dragging')
//     })
// })

// draggableContainer.addEventListener('dragover', e => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(draggableContainer, e.clientX)
//     const currentDragEl = document.querySelector('.dragging')
//     if (afterElement == null)
//         draggableContainer.appendChild(currentDragEl)
//     else
//         draggableContainer.insertBefore(currentDragEl, afterElement)
// })

// function getDragAfterElement(container1, x) {
//     const draggableElements = [...draggableContainer.querySelectorAll('.dragEl:not(.dragging)')]

//     return draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect()
//         const offset = x - box.left - box.width / 2
//         if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: child }
//         } else {
//             return closest
//         }
//     }, { offset: Number.NEGATIVE_INFINITY }).element

// }
