const { merge, fromEvent } = rxjs
const { map, takeUntil, tap } = rxjs.operators

const numbers = document.querySelectorAll(".angka>button")
const operator = document.querySelectorAll(".operand>button")
const display = document.getElementById("display")

const plus  = operator[0]
const minus = operator[1]
const multi = operator[2]
const div   = operator[3]

const zero$  = fromEvent(numbers[9], 'click').pipe(map(() => 0))
const one$   = fromEvent(numbers[6], 'click').pipe(map(() => 1))
const two$   = fromEvent(numbers[7], 'click').pipe(map(() => 2))
const three$ = fromEvent(numbers[8], 'click').pipe(map(() => 3))
const four$  = fromEvent(numbers[3], 'click').pipe(map(() => 4))
const five$  = fromEvent(numbers[4], 'click').pipe(map(() => 5))
const six$   = fromEvent(numbers[5], 'click').pipe(map(() => 6))
const seven$ = fromEvent(numbers[0], 'click').pipe(map(() => 7))
const eight$ = fromEvent(numbers[1], 'click').pipe(map(() => 8))
const nine$  = fromEvent(numbers[2], 'click').pipe(map(() => 9))

const eq$    = fromEvent(numbers[10], 'click').pipe(map(() => "equal"))

const plus$  = fromEvent(plus, 'click').pipe(map(() => "+"))
const minus$ = fromEvent(minus, 'click').pipe(map(() => "-"))
const multi$ = fromEvent(multi, 'click').pipe(map(() => "*"))
const div$   = fromEvent(div, 'click').pipe(map(() => "/"))

const numbers$ = merge(zero$, one$, two$, three$, four$, five$, six$, seven$, eight$, nine$)
const operators$ = merge(plus$, minus$, multi$, div$)

// merge(numbers$, operator$).subscribe((val) => console.log(val))

let number1 = ''
let number2 = ''
let operand = null
let res = ''

const num1$ = merge(numbers$,operators$)
.pipe(
    tap((number) => {
    number1 = number1 + number
    display.value = number1
    }),
    takeUntil(operators$),
    map((operator) => {
    return operator
    })
)

const operand$ = operators$.pipe(
    tap((operator) => {
        operand = operator
        display.value = ''
    }),
    // takeUntil(numbers$),
    // map((number) => {
    // return number
    // })
)

const num2$ = merge(numbers$,operators$)
.pipe(
    tap((n) => {
    number2 = number2 + n
    display.value = number2
    }),
    // takeUntil(operators$),
    // map((operator) => {
    // return operator
    // })
)
  
num1$.subscribe((calc) => {
    // console.log(display.value)
})

operand$.subscribe((op) => {
    display.value = ''
})

num2$.subscribe((calc) => {
    
})

eq$.subscribe((ccc) => {
    console.log(number1, operand, number2)
    display.value = parseInt(number1) + parseInt(number2)
})

function clear() {
    display.value = ''
}

