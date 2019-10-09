const box = document.getElementById("box")
var count = 0
box.addEventListener('mousedown', (start) => {
    const onMouseMove = (move) => {
        const positionTop = move.clientY - start.offsetY
        const positionLeft = move.clientX - start.offsetX
        console.log(positionTop, positionLeft)
        box.style.top = positionTop + 'px'
        box.style.left = positionLeft + 'px'
    }
    document.addEventListener('mousemove', onMouseMove)
    box.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove)
    })
})