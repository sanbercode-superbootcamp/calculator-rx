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
