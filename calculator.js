// document.addEventListener("mousemove", (moveEvent) => {
//   console.log(moveEvent.clientX, moveEvent.clientY);
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
    // ngilangin highlight di text
    move.preventDefault();
  
    const positionTop = move.clientY - start.offsetY;
    const positionLeft = move.clientX - start.offsetX;
    box.style.top = positionTop + "px";
    box.style.left = positionLeft + "px";
  };

  // pas digerakin, boxnya ikut geser
  document.addEventListener('mousemove', onMouseMove);

  // pas tombolnya di angkat
  box.addEventListener('mouseup', () => {
    // hapus listener mousemove
    document.removeEventListener('mousemove', onMouseMove);
  });
});

