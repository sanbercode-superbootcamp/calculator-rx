
const { fromEvent } = rxjs;
const { tap, switchMap, map, takeUntil } = rxjs.operators;

const box = document.getElementById('box');

//sumbernya, stream of mousedown
const mousedown$ = fromEvent(box, 'mousedown');
//stream buat mousemove
const mousemove$ = fromEvent(document, 'mousemove');
//stream buat mouseup
const mouseup$ = fromEvent(box, 'mouseup');

//rangkai pipelinenya
const drag$ = mousedown$.pipe(
  switchMap((start) => { //start is ouput of mousedown$ & // switchMap pindah keran/pipa
    return mousemove$.pipe(
      map((move) => { //move output of mousemove$
        return {
          top: move.clientY - start.offsetY,
          left: move.clientX - start.offsetX
        };
      }),//map itu stream baru karena ada suatu operasi
      takeUntil(mouseup$)
    );
  })
);

//yang nampung
drag$.subscribe((position) => {
  console.log(position.top, position.left);
  box.style.top = position.top + "px";
  box.style.left = position.left + "px";
});
