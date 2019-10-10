// document.addEventListener("mousemove", (moveEvent) => {
//     console.log(moveEvent.clientX, moveEvent.clientY)
// })

const box = document.getElementById("box")

box.addEventListener('mousedown', (start) => {
    const onMouseMove = (move) => {
        move.preventDefault()
        const positionTop = move.clientY - start.offsetY
        const positionLeft = move.clientX - start.offsetX
        box.style.top = positionTop + "px"
        box.style.left = positionLeft + "px"
    }

    document.addEventListener('mousemove', onMouseMove)
    box.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove)
    })
})