const { fromEvent, merge } = rxjs;
const { map, takeUntil, tap } = rxjs.operators;

const number = document.querySelectorAll(".angka>button"); //ksh >button biar layar g kluar button
const operator = document.querySelectorAll(".operand");
const result = document.querySelectorAll(".result");
const screen = document.getElementById("screen");

//listen(er)
const numberclick$ = fromEvent(number, "click").pipe(map((thiss) => parseInt(thiss.toElement.innerHTML)));
const operatorclick$ = fromEvent(operator, "click").pipe(map((thiss) => thiss.toElement.innerHTML));
const resultclick$ = fromEvent(result, "click").pipe(map((thiss) => thiss.toElement.innerHTML));


//returning number to screen (deprecated)
const shownumber$ = numberclick$.pipe(
    map((thatbutton) => {
        console.log(thatbutton)
        return thatbutton.toElement.innerHTML
    })
)

//deklarasi tumbal
let number1Chunk = "";
let number2Chunk = "";
let number1Finished = null;
let number2Finished = null;
let operatoris = null;
let resulttt = null;
    
//machine working pemrosesan event by stream blabla
const testcalc$ = merge(numberclick$, operatorclick$, resultclick$).pipe(map((watisdis) => {
    if(typeof(watisdis) == "number"){
        if(number1Finished == null){
            return number1Chunk += watisdis.toString()
        }
        else{
            return number2Chunk += watisdis.toString()
        }
        
    }
    else if(typeof(watisdis) == "string"){
        number1Finished = parseInt(number1Chunk);
        
        if(watisdis != "=" && operatoris == null){
            return operatoris = watisdis;
        }
        else{
        number2Finished = parseInt(number2Chunk);
            
        switch(operatoris){
        case "+" : return resulttt = number1Finished + number2Finished;
        break;
        case "-" : return resulttt = number1Finished - number2Finished;
        break;
        case "*" : return resulttt = number1Finished * number2Finished;
        break;
        case "/" : return resulttt = number1Finished / number2Finished;
        break;
        }
        }
        
    }
}))

//pemanggilan event emitter?
testcalc$.subscribe((clickedNumber) => {
    //just innerworking
    console.log("number1Chunk = "+number1Chunk);
    console.log("number2Chunk = "+number2Chunk);
    console.log("number1Finished = "+number1Finished);
    console.log("number2Finished = "+number2Finished);
    console.log("operatoris = "+operatoris);
    console.log("result = "+resulttt)
    //just innerworking
    screen.innerHTML = clickedNumber;
});




/*
const { fromEvent, merge } = rxjs;
const { map, takeUntil, tap } = rxjs.operators;

const numbers = document.querySelectorAll(".angka>button");

const operands = document.querySelectorAll(".operand>button");

const plus = operands[0];

const zero$ = fromEvent(numbers[0], "click").pipe(map(() => 0));
const one$ = fromEvent(numbers[1], "click").pipe(map(() => 1));
const two$ = fromEvent(numbers[2], "click").pipe(map(() => 2));
const three$ = fromEvent(numbers[3], "click").pipe(map(() => 3));
const four$ = fromEvent(numbers[4], "click").pipe(map(() => 4));
const five$ = fromEvent(numbers[5], "click").pipe(map(() => 5));
const six$ = fromEvent(numbers[6], "click").pipe(map(() => 6));
const seven$ = fromEvent(numbers[7], "click").pipe(map(() => 7));
const eight$ = fromEvent(numbers[8], "click").pipe(map(() => 8));
const nine$ = fromEvent(numbers[9], "click").pipe(map(() => 9));

const plus$ = fromEvent(plus, "click").pipe(map(() => "plus"));

const numbers$ = merge(
  zero$,
  one$,
  two$,
  three$,
  four$,
  six$,
  seven$,
  eight$,
  nine$
);

const operators$ = merge(plus$);

let number1 = '';
let number2 = '';
let operand = null;

const calculator$ = merge(
  numbers$,
  operators$
).pipe(
  tap((number) => {
    number1 = number1 + number
  }),
  takeUntil(operators$),
  map((operator) => {
    return operator;
  })
)

calculator$.subscribe(calc => console.log(calc));
*/
