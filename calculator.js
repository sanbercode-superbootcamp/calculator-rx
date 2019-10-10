const {
    fromEvent,
    merge
} = rxjs;

const {
    tap,
    map,
    switchMap,
    takeUntil,
    mergeMap
} = rxjs.operators;

const numbers = document.querySelectorAll(".angka>button");
const operands = document.querySelectorAll(".operand>button");
const screen = document.querySelector('.screen>h1')
const historyScreen = document.querySelector('.screen>p')

const plus = operands[0];
const minus = operands[1];
const multiply = operands[2];
const div = operands[3];

const zero$ = fromEvent(numbers[0], 'click')
    .pipe(map(() => 0));
const one$ = fromEvent(numbers[1], 'click')
    .pipe(map(() => 1));
const two$ = fromEvent(numbers[2], 'click')
    .pipe(map(() => 2));
const three$ = fromEvent(numbers[3], 'click')
    .pipe(map(() => 3));
const four$ = fromEvent(numbers[4], 'click')
    .pipe(map(() => 4));
const five$ = fromEvent(numbers[5], 'click')
    .pipe(map(() => 5));
const six$ = fromEvent(numbers[6], 'click')
    .pipe(map(() => 6));
const seven$ = fromEvent(numbers[7], 'click')
    .pipe(map(() => 7));
const eight$ = fromEvent(numbers[8], 'click')
    .pipe(map(() => 8));
const nine$ = fromEvent(numbers[9], 'click')
    .pipe(map(() => 9));

const reset$ = fromEvent(operands[0], 'click')
    .pipe(map(() => 'AC'));
const plus$ = fromEvent(operands[1], 'click')
    .pipe(map(() => '+'));
const min$ = fromEvent(operands[2], 'click')
    .pipe(map(() => '-'));
const multiply$ = fromEvent(operands[3], 'click')
    .pipe(map(() => '*'));
const div$ = fromEvent(operands[4], 'click')
    .pipe(map(() => '/'));

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
)

const operators$ = merge(
    reset$,
    plus$,
    min$,
    multiply$,
    div$);


let number1 = null;
let number2 = null;
let operand = null;
let historyCalc = [];

const calculator$ = merge(
    numbers$,
    operators$
).pipe(
    map((input) => {
        if (typeof input == 'number' && number1 == null) {
            return number1 = input;
        } else if (typeof input == 'number' && operand != null) {
            number2 = input;
            switch (operand) {
                case '+':
                    operand = null;
                    return number1 = number1 + number2;
                case '-':
                    operand = null;
                    return number1 = number1 - number2;
                case '*':
                    operand = null;
                    return number1 = number1 * number2;
                case '/':
                    operand = null;
                    return number1 = number1 / number2;
            }
        } else if (typeof input != 'number') {
            if (input == 'AC') {
                resetScreen()
                return 0;
            } else {
                return operand = input;
            }

        }
    })
)

const history$ = merge(
    numbers$,
    operators$
).pipe(
    map((item) => {
        if (item != 'AC') {
            historyCalc.push(item);
            return historyCalc;
        } else {
            return historyCalc;
        }
    })
)

calculator$.subscribe(calc => screen.innerHTML = calc);
history$.subscribe(item => historyScreen.innerHTML = item.join(''));

function resetScreen() {
    number1 = null
    number2 = null
    operand = null
    historyCalc = []
}