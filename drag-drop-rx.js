const { fromEvent } = rxjs
const { tap, map, switchMap, takeUntil } = rxjs.operators

const box = document.getElementById("box")

const mousedown$ = fromEvent(box, 'mousedown')
const mousemove$ = fromEvent(box, 'mousemove')
const mouseup$ = fromEvent(box, 'mouseup')

const drag$ = mousedown$.pipe(
    switchMap((start) => {
        return mousemove$.pipe(
            map((move) => {
                return {
                    top : move.clientY - start.offsetY,
                    left : move.clientX - start.offsetX
                }
            }),
            takeUntil(mouseup$)
        )
    })
)

drag$.subscribe((position) => {
    box.style.top = position.top + "px"
    box.style.left = position.left + "px"
})

drag$.subscribe((position) => {
    console.log(position)
})