const { fromEvent } = rxjs;
const { tap, switchMap, map, takeUntil, filter } = rxjs.operators;

const box = document.getElementById("box");

const mousedown$ = fromEvent(box, "mousedown");
const mousemove$ = fromEvent(document, "mousemove");
const mouseup$ = fromEvent(box, "mouseup");

const drag$ = mousedown$.pipe(
  tap(() => console.log("lagi neken")),
  switchMap(start => {
    return mousemove$.pipe(
      map(move => {
        return {
          top: move.clientY - start.offsetY,
          left: move.clientX - start.offsetX
        };
      }),
      filter(pos => {
        return pos.left < (window.innerWidth * 0.5)
      }),
      takeUntil(
        mouseup$.pipe(
          tap(() => console.log("udah diangkat"))
        )
      ),
    );
  })
);

drag$.subscribe(position => {
  box.style.top = position.top + "px";
  box.style.left = position.left + "px";
});
