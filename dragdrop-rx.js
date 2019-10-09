const { fromEvent } = rxjs;
const { tap, switchMap, map, takeUntil } = rxjs.operators;

const box = document.getElementById("box");

const mousedown$ = fromEvent(box, 'mousedown');
const mousemove$ = fromEvent(document, 'mousemove');
const mouseup$ = fromEvent(box, 'mouseup');

const dragdrop$ = mousedown$.pipe(
    switchMap((start) => {
        return mousemove$.pipe(
            map((move) => {
                return {
                    top: move.clientY - start.offsetY,
                    left: move.clientX - start.offsetX
                }
            }),
            takeUntil(mouseup$)
        )
    })
)

dragdrop$.subscribe((position) => {
    box.style.top = position.top + "px";
    box.style.left = position.left + "px";
});

dragdrop$.subscribe((position) => {
    console.log(position);
});