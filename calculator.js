const { fromEvent,merge } = rxjs;
const { map,takeUntil,tap } =  rxjs.operators;

const numbers = document.querySelectorAll('.angka>button');

const operands = document.querySelectorAll('.operand>button');

//const calc = document.querySelectorAll('.hasil>button');

const add = operands[0];
const sub = operands[1];
const mul = operands[2];
const div = operands[3];
const opn = operands[4];
const cls = operands[5];

const one$   = fromEvent(numbers[0], 'click').pipe(map(() => 1));
const two$   = fromEvent(numbers[1], 'click').pipe(map(() => 2));
const three$ = fromEvent(numbers[2], 'click').pipe(map(() => 3));
const four$  = fromEvent(numbers[3], 'click').pipe(map(() => 4));
const five$  = fromEvent(numbers[4], 'click').pipe(map(() => 5));
const six$   = fromEvent(numbers[5], 'click').pipe(map(() => 6));
const seven$ = fromEvent(numbers[6], 'click').pipe(map(() => 7));
const eight$ = fromEvent(numbers[7], 'click').pipe(map(() => 8));
const nine$  = fromEvent(numbers[8], 'click').pipe(map(() => 9));
const zero$  = fromEvent(numbers[9], 'click').pipe(map(() => 0));

const add$ = fromEvent(add, 'click').pipe(map(() => '+'));
const sub$ = fromEvent(sub, 'click').pipe(map(() => '-'));
const mul$ = fromEvent(mul, 'click').pipe(map(() => '*'));
const div$ = fromEvent(div, 'click').pipe(map(() => '/'));
const opn$ = fromEvent(opn, 'click').pipe(map(() => '('));
const cls$ = fromEvent(cls, 'click').pipe(map(() => ')'));

//const eql$ = fromEvent(calc[0], 'click')//.pipe(map(() => '='));

const numbers$ = merge(zero$,one$,two$,three$,four$,five$,six$,seven$,eight$,nine$)

const operators$ = merge(add$,sub$,mul$,div$,opn$,cls$);

let temp = '';

const inNum$ = numbers$.pipe(
    tap((num) => {
        temp = temp + num
    }),
    map(() => temp),
    //takeUntil(operators$)
)

const inOpr$ = operators$.pipe(
    tap((num) => {
        temp = temp + num
    }),
    map(() => temp),
    //takeUntil(operators$)
)

merge(operators$, inNum$, inOpr$).subscribe((val) => {
    console.log(val)
    document.getElementById('screen').innerHTML = val;
    document.getElementById('hasil').onclick = function(){
        document.getElementById('screen').innerHTML = eval(val);
        val = ''
        temp = ''
    };
})



