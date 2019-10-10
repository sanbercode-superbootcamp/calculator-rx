// document.addEventListener('mousemove', (moveEvent) => {
//     console.log(moveEvent.clientX, moveEvent.clientY);
// })

/**
 * 1. kotaknya di klik
 * 2. mouse di geser
 * 3. tombol di lepas
 */

const box = document.getElementById('box');

// kotaknya di klik
box.addEventListener('mousedown', (start) => {
    //geser kotak dari event mousemove
    const onMouseMove = (move) => {
        move.preventDefault();
        const positionTop = move.clientY - start.offsetY;
        const positionLeft = move.clientX - start.offsetX;
        box.style.top = positionTop + "px";
        box.style.left = positionLeft + "px";
        box.style.background = 'blue';
    };
    // pas digerakin, boxnya ikut geser
    document.addEventListener('mousemove', onMouseMove)

    // pas tombolnya di angkat
    box.addEventListener('mouseup', () => {
        // hapus listener mousemove
        document.removeEventListener('mousemove', onMouseMove);
        box.style.background = 'red';
    })
})