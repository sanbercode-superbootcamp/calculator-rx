

var mousedowned = false;
var startOffsetY = 0;
var startOffsetX = 0;

const simpleBox = document.getElementById('simpleBox');

simpleBox.addEventListener('click', (event) => {
    console.log("clicked");
})
simpleBox.addEventListener('mousedown', (event) => {
    event.preventDefault();
    mousedowned = true;
    startOffsetY = event.offsetY;
    startOffsetX = event.offsetX;
})
document.addEventListener('mouseup', (event) => {
    mousedowned = false;
})
document.addEventListener('mousemove', (event) => {
    event.preventDefault();
    if (mousedowned) {
        const positionTop = event.clientY - startOffsetY;
        const positionLeft = event.clientX - startOffsetX;
        // console.log(positionTop, positionLeft);
        simpleBox.style.left = positionLeft + 'px';
        simpleBox.style.top = positionTop + 'px';
        console.log(simpleBox.style.left);
    }

})