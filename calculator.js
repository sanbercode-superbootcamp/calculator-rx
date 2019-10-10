const { fromEvent, merge  } = rxjs;
const { tap, switchMap, map, takeUntil } = rxjs.operators;

const numbers = document.querySelectorAll(".angka>button");
const operands = document.querySelectorAll(".operand>button");
const numDisplay = document.querySelectorAll(".screen>h3");
const display = document.getElementById("result");

const [ reset, plus, minus, times, divide, equal ] = operands;

// 1. angka diklik takeuntil operands
// 2. angka diklik lagi until samadengan
const result$ = fromEvent(display, 'click');
const zero$ = fromEvent(numbers[10], 'click')
  .pipe(map(() => 0));
const one$ = fromEvent(numbers[0], 'click')
  .pipe(map(() => 1));
const two$ = fromEvent(numbers[1], 'click')
  .pipe(map(() => 2));
const three$ = fromEvent(numbers[2], 'click')
  .pipe(map(() => 3));
const four$ = fromEvent(numbers[3], 'click')
  .pipe(map(() => 4));
const five$ = fromEvent(numbers[4], 'click')
  .pipe(map(() => 5));
const six$ = fromEvent(numbers[5], 'click')
  .pipe(map(() => 6));
const seven$ = fromEvent(numbers[6], 'click')
  .pipe(map(() => 7));
const eight$ = fromEvent(numbers[7], 'click')
  .pipe(map(() => 8));
const nine$ = fromEvent(numbers[8], 'click')
  .pipe(map(() => 9));


const reset$ = fromEvent(reset, 'click').pipe(map(() => 'c'));
const plus$ = fromEvent(plus, 'click').pipe(map(() => '+'));
const minus$ = fromEvent(minus, 'click').pipe(map(() => '-'));
const times$ = fromEvent(times, 'click').pipe(map(() => '*'));
const divide$ = fromEvent(divide, 'click').pipe(map(() => '/'));
const equal$ = fromEvent(equal, 'click').pipe(map(() => '='));

let number1 = '';
let number2 = '';
let result = '';
let operand = null;


const operators$ = merge(reset$, plus$, minus$, times$, divide$, equal$)
  .pipe(
    tap((sign) => {
       //operand = sign;
    })
  );//.pipe(takeUntil(numbers$));

//strams of numbers
const numbers$ = merge(
  zero$,
  one$,
  two$,
  three$,
  four$,
  five$,
  six$,
  seven$,
  eight$,
  nine$,
);//.pipe(takeUntil(equal$));


numbers$.subscribe((number) => {
  //console.log(operand);
  if(operand == null && result != ''){
    display.innerHTML = number;
    result = '';
  } else {
    display.innerHTML += number;
  }
})

operators$.subscribe((operator) => {
  let res = display.innerHTML;
  let n = ["+", "-", "*", "/"];
  console.log(operator)
  switch(operator) {
    case '+':
      if(!n.includes(res[res.length-1])) {
        number1 = res;
        operand =  "+";
        display.innerHTML += "+";
      }
      break;
    case '-':
      if(!n.includes(res[res.length-1])) {
        number1 = res;
        operand =  "-";
        display.innerHTML += "-";
      }
      break;
    case '*':
      if(!n.includes(res[res.length-1])) {
        number1 = res;
        operand =  "*";
        display.innerHTML += "*";
      }
      break;
    case '/':
      if(!n.includes(res[res.length-1])) {
        number1 = res;
        operand =  "/";
        display.innerHTML += "/";
      }
      break;
    default:
      display.innerHTML = '';
      break;
    case '=':
      //console.log(operand);
      let numbers = display.innerHTML.split(operand);
      if(numbers[1] != undefined) {
        number2 = numbers[1].trim();
        console.log(isNumber(number1), isNumber(number2))
        if(isNumber(number1) && isNumber(number2)){
          switch(operand) {
            case '+':
              result = parseInt(number1) + parseInt(number2);
              break;
            case '-':
              result = parseInt(number1) - parseInt(number2);
              break;
            case '*':
              result = parseInt(number1) * parseInt(number2);
              break;
            case '/':
              result = parseInt(number1) / parseInt(number2);
              break;
            }
          display.innerHTML = result;
        } else {
          alert('kayaknya ada yg bukan angka bro');
        }
      } else if(result != '') {
        result += result;
        display.innerHTML = result;
      } else {
        alert("harus udah ada angka / operasinya bos!");
      }
      operand = null;
      break;


  }
})

function isNumber(string) {
  return !isNaN(string);
}
