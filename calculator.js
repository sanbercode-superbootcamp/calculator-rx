const { fromEvent, merge } = rxjs;
const { takeUntil, map, tap, switchMap, takeWhile } = rxjs.operators;

const screenText = document.querySelector(".screen>h1");

const numbers = document.querySelectorAll(".angka>button");

const operands = document.querySelectorAll(".operand>button");

const plus = operands[0];
const minus = operands[1];
const times = operands[2];
const divide = operands[3];
const equal = operands[4];
const clear = operands[5];

const zero$ = fromEvent(numbers[0], 'click').pipe(map(() => 0));
const one$ = fromEvent(numbers[1], 'click').pipe(map(() => 1));
const two$ = fromEvent(numbers[2], 'click').pipe(map(() => 2));
const three$ = fromEvent(numbers[3], 'click').pipe(map(() => 3));
const four$ = fromEvent(numbers[4], 'click').pipe(map(() => 4));
const five$ = fromEvent(numbers[5], 'click').pipe(map(() => 5));
const six$ = fromEvent(numbers[6], 'click').pipe(map(() => 6));
const seven$ = fromEvent(numbers[7], 'click').pipe(map(() => 7));
const eight$ = fromEvent(numbers[8], 'click').pipe(map(() => 8));
const nine$ = fromEvent(numbers[9], 'click').pipe(map(() => 9));

const plus$ = fromEvent(plus, 'click').pipe(map(() => "+"));
const minus$ = fromEvent(minus, 'click').pipe(map(() => "-"));
const times$ = fromEvent(times, 'click').pipe(map(() => "*"));
const divide$ = fromEvent(divide, 'click').pipe(map(() => "/"));
const equal$ = fromEvent(equal, 'click').pipe(map(() => "="));
const clear$ = fromEvent(clear, 'click').pipe(map(() => "C"));


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
    nine$
);

const operands$ = merge(
    plus$, minus$, times$, divide$
)

const calculate = function(operator, a, b){
    switch(operator){
        case '+':
            return parseInt(a)+parseInt(b);
            break;
        case '-':
            return parseInt(a)-parseInt(b);
            break;
        case '*':
            return parseInt(a)*parseInt(b);
            break;
        case '/':
            return parseInt(a)/parseInt(b);
            break;
    }
}

let number1 = '';
let number2 = '';
let hasil = '';
let operator1 = null;

const calculator$ = numbers$.pipe(
    tap((number) => {
        if(operator1==null){
            number1 += number;
            screenText.innerHTML += number;
            console.log('number1 = '+number1);
        }else{
            number2 += number;
            screenText.innerHTML += number;
            console.log('number2 = '+number2);
        }
    }),
    switchMap(() => {
        return operands$.pipe(
            tap((operator) => {
                operator1 = operator;
                screenText.innerHTML += operator1;
                if(number2 != ''){
                    number1 = calculate(operator1, number1, number2);
                    number2 = '';
                }
                console.log('operator = '+operator1);
                console.log(number1);
            })
        )
    })  
)

calculator$.subscribe();
equal$.subscribe(()=>{
    if(number2 != ''){
        number1 = calculate(operator1, number1, number2);
        number2 = '';
        hasil = number1;
        screenText.innerHTML = hasil;
    }
})
clear$.subscribe(() => {
    screenText.innerHTML = '';
    number1 = '';
    number2 = '';
    hasil = '';
    operator1 = null;
})