//Load rxjs
const { fromEvent, merge, interval } = rxjs
const { tap, map, takeUntil } = rxjs.operators

//Getting query from HTML page
const screen = document.querySelector('.screen>h1')
const historyScreen = document.querySelector('.screen>p')
const numbers = document.querySelectorAll('.number')
const operands = document.querySelectorAll('.operator')

//Declaring numbers from query
const zero$ = fromEvent(numbers[9], 'click').pipe(map(() => 0))
const one$ = fromEvent(numbers[0], 'click').pipe(map(() => 1))
const two$ = fromEvent(numbers[1], 'click').pipe(map(() => 2))
const three$ = fromEvent(numbers[2], 'click').pipe(map(() => 3))
const four$ = fromEvent(numbers[3], 'click').pipe(map(() => 4))
const five$ = fromEvent(numbers[4], 'click').pipe(map(() => 5))
const six$ = fromEvent(numbers[5], 'click').pipe(map(() => 6))
const seven$ = fromEvent(numbers[6], 'click').pipe(map(() => 7))
const eight$ = fromEvent(numbers[7], 'click').pipe(map(() => 8))
const nine$ = fromEvent(numbers[8], 'click').pipe(map(() => 9))

//Declaring operands from query
const erase$ = fromEvent(operands[0], 'click').pipe(map(() => 'AC'))
const plus$ = fromEvent(operands[1], 'click').pipe(map(() => '+'))
const minus$ = fromEvent(operands[2], 'click').pipe(map(() => '-'))
const kali$ = fromEvent(operands[3], 'click').pipe(map(() => 'x'))
const bagi$ = fromEvent(operands[4], 'click').pipe(map(() => '/'))

//Declaring Rxjs operator merge 
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
    plus$,
    minus$,
    kali$,
    bagi$,
    erase$
)


//Declaring number and operand to be calculating
let number1 = null
let number2 = null
let operand = null
let historyCalc = []

//Declaring calculator pipeline for calculating
const calculator$ = merge(
    numbers$,
    operators$
).pipe(
    map((input) => {
        if(typeof input == 'number' && number1 == null){
            return number1 = input
        }else if(typeof input == 'number' && operand != null){
            number2 = input
            switch(operand){
                case '+' :
                    return number1 = number1+number2
                case '-' :
                    return number1 = number1-number2
                case 'x' :
                    return number1 = number1*number2
                case '/' :
                    return number1 = Math.round(number1*1000/number2)/1000
            }
        }
        else if(typeof input != 'number' ){
            if(input == 'AC'){
                resetScreen()
                return 0
            }else{
                return operand = input
            }
            
        }
    })
)

const history$ = merge(
    numbers$,
    operators$
).pipe(
    map((item)=>{
        if(item != 'AC'){
            historyCalc.push(item)
            return historyCalc
        }{
            return historyCalc
        }
    })
)

//Subscribing to calculator pipeline
calculator$.subscribe(calc => screen.innerHTML = calc)
history$.subscribe( item => historyScreen.innerHTML = item.join(''))

function resetScreen(){
    number1 = null
    number2 = null
    operand = null
    historyCalc = []
}

