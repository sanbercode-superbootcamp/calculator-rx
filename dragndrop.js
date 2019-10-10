//window.prompt('calculator');
// document.addEventListener('mousemove', moveEvent => {
//   console.log(moveEvent.clientX, moveEvent.clientY);
// })

const box = document.getElementById('box');
// mouse didrag, kotak pindah
box.addEventListener('mousedown', (start) => {

  const onMouseMove = (move) => {
      const positionTop = move.clientY - start.offsetY;
      const positionLeft = move.clientX - start.offsetX;
      box.style.top = positionTop + "px";
      box.style.left = positionLeft + "px";
  }
  // mouse pindah, kotak pindah
  document.addEventListener('mousemove', (onMouseMove));

  box.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  });
});
