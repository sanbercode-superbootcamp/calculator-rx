// ngetrack posisi cursor
// document.addEventListener("mousemove", (MouseEvent) => {
//     console.log(MouseEvent.clientX, MouseEvent.clientY);
// });

/*
1. kotaknya di klik
2. mousenya di geser
3. tombolnya di lepas dari kotak
*/

const box = document.getElementById("box");

// kotaknya di klik
box.addEventListener('mousedown', (start) => {
    // geser kotak dari event mousemove
    const onMouseMove = (move) => {
        // menghilangkan highlight di text
        move.preventDefault();

        const positionTop = move.clientY - start.offsetY;
        const positionLeft = move.clientX - start.offsetX;
        box.style.top = positionTop + "px";
        box.style.left = positionLeft + "px";
    };

    // pas di klik di gerakin, boxnya bergeser
    document.addEventListener('mousemove', onMouseMove);

    // pas tombolnya di angkat
    box.addEventListener('mouseup', () => {
        // hapus listener mousemove
        document.removeEventListener('mousemove', onMouseMove);
    });
});