document.addEventListener('mousemove', (moveEvent) => {
    console.log(moveEvent.clientX, moveEvent.clientY);
});

/*
1. kotaknya di klik
2. mousenya di geser
3. tombolnya di lepas dari kotak
*/

const box = document.getElementById("box");

box.addEventListener('mousedown', (start) => {
    document.addEventListener('mousemove', (move) => {
        const positionTop = move.clientY - start.offsetY;
        const positionLeft = move.clientX - start.offsetX;
        box.style.top = positionTop + "px";
        box.style.left = positionLeft + "px";
    });
});