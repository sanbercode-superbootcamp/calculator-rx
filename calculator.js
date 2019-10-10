const { fromEvent, merge } = rxjs;
const { map, takeUntil, tap } = rxjs.operators;

const numbers = document.querySelectorAll(".angka>button");

const operands = document.querySelectorAll(".operand>button");

const screen = document.querySelector(".screen>h1");

const plus = operands[0];
const minus = operands[1];
const multi = operands[2];
const div = operands[3];
const equals = operands[4];
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

const plus$ = fromEvent(plus, 'click').pipe(map(() => '+'));
const minus$ = fromEvent(minus, 'click').pipe(map(() => '-'));
const multi$ = fromEvent(multi, 'click').pipe(map(() => '*'));
const div$ = fromEvent(div, 'click').pipe(map(() => '/'));
const equals$ = fromEvent(equals, 'click').pipe(map(() => '='));
const clear$ = fromEvent(clear, 'click').pipe(map(() => 'c'));

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

const operators$ = merge(plus$, minus$, multi$, div$, equals$, clear$);

// merge(numbers$, operators$).subscribe((val) => console.log(val));

let number1 = '';
let number2 = '';
let operand = null;
let result = '';

// const calculator$ = merge(numbers$, operators$).pipe(
//     tap((number) => {
//         number1 = number1 + number;
//         screen.innerHTML = number1;
//     }),
//     takeUntil(operators$),
//     map((operator) => {
//         return operator;
//     })
// )

const calculator$ = merge(numbers$, operators$).pipe(
    tap((number) => {
        if(typeof number == 'number' && operand == null){
            number1 += number;
            screen.innerHTML = number1;         
        } else if(typeof number == 'number' && operand != null) {
            number2 += number;
            screen.innerHTML = number2;
        } else if(number == '=') {
            if(operand == '+') {
                parseInt(result = parseInt(number1) + parseInt(number2));
            } else if(operand == '-') {
                parseInt(result = parseInt(number1) - parseInt(number2));
            } else if(operand == '*') {
                parseInt(result = parseInt(number1) * parseInt(number2));
            } else if(operand == '/') {
                parseInt(result = parseInt(number1) / parseInt(number2));
            }
            screen.innerHTML = result;
            number1 = '';
            number2 = '';
            number1 = result;
        } else if(number == 'c') {
            number1 = '';
            number2 = '';
            result = '';
            operand = null;
            screen.innerHTML = '0';
        }
        else {
            operand = number;
            screen.innerHTML = operand;
        }
    })
)

calculator$.subscribe(calc => console.log(calc));