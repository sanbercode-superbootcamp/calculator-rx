
const { fromEvent } = rxjs;
const { tap, switchMap, map, takeUntil } = rxjs.operators;

var mousedowned = false;
var startOffsetY = 0;
var startOffsetX = 0;

const simpleBox = document.getElementById('simpleBox');

const mousedown$ = fromEvent(simpleBox, 'mousedown');
const mousemove$ = fromEvent(document, 'mousemove');
const mouseup$ = fromEvent(simpleBox, 'mouseup');

const drag$ = mousedown$.pipe(
    switchMap((start) => {
        return mousemove$.pipe(
            map((event) => {
                event.preventDefault();
                return {
                    top: event.clientY - start.offsetY,
                    left: event.clientX - start.offsetX
                }
            }),
            takeUntil(mouseup$)
        )
    })
)

drag$.subscribe((position) => {
    simpleBox.style.top = position.top;
    simpleBox.style.left = position.left;
})
