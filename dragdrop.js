document.addEventListener('mousemove', (moveEvent) => {
    console.log(moveEvent.clientX, moveEvent.clientY);
});

/*
1. kotaknya di klik
2. mousenya di geser
3. tombolnya di lepas dari kotak
*/

const box = document.getElementById("box");
// clicking box
box.addEventListener('mousedown', (start) => {
    //func for move box
    const onMouseMove = (move) => {
        //remoev highlight on text
        move.preventDefault();

        let positionTop = move.clientY - start.offsetY;
        let positionLeft = move.clientX - start.offsetX;
        box.style.top = positionTop + "px";
        box.style.left = positionLeft + "px";
    };
    //add listener when mouse moving 
    document.addEventListener('mousemove', onMouseMove);
    //add listener when unclick mouse
    box.addEventListener('mouseup', () => {
        //remove listener mousemove
        document.removeEventListener('mousemove', onMouseMove);
    })
});