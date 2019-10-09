const { fromEvent, merge } = rxjs;
const { map, tap, takeUntil } = rxjs.operators;

const numbers = document.querySelectorAll('.calcButton');
const operands = document.querySelectorAll('.operandButton');

const add$ = fromEvent(operands[0], 'click').pipe(map(() => "add"));
const substract$ = fromEvent(operands[1], 'click').pipe(map(() => "substract"));
const divide$ = fromEvent(operands[2], 'click').pipe(map(() => "divide"));
const multiple$ = fromEvent(operands[3], 'click').pipe(map(() => "multiple"));
const equal$ = fromEvent(operands[4], 'click').pipe(map(() => "equal"));

const zero$ = fromEvent(numbers[9], 'click').pipe(
    map(() => 0)
);
const one$ = fromEvent(numbers[6], 'click').pipe(
    map(() => 1)
);
const two$ = fromEvent(numbers[7], 'click').pipe(
    map(() => 2)
);
const three$ = fromEvent(numbers[8], 'click').pipe(
    map(() => 3)
);
const four$ = fromEvent(numbers[3], 'click').pipe(
    map(() => 4)
);
const five$ = fromEvent(numbers[4], 'click').pipe(
    map(() => 5)
);
const six$ = fromEvent(numbers[5], 'click').pipe(
    map(() => 6)
);
const seven$ = fromEvent(numbers[0], 'click').pipe(
    map(() => 7)
);
const eight$ = fromEvent(numbers[1], 'click').pipe(
    map(() => 8)
);
const nine$ = fromEvent(numbers[2], 'click').pipe(
    map(() => 9)
);

let input1 = 0;
let input2 = 0;
let operation = null;
let result = 0;

let qString = "";

const numbers$ = merge(
    zero$, one$, two$, three$, four$, five$, six$, seven$, eight$, nine$
).pipe(
    tap((number) => {
        if (!operation) {
            if (!operation && result != 0) {
                result = 0;
                input1 = 0;
            }
            if (parseInt(input1) == 0) {
                input1 = "";
            }
            input1 = input1.toString() + number;


        } else if (operation) {
            if (parseInt(input2) == 0) {
                input2 = "";
            }
            input2 = input2.toString() + number;

        }
    }),
    map((v) => {
        if (!operation) {
            return input1;
        } else {
            return input2;
        }
    })
)
const operands$ = merge(
    add$, substract$, divide$, multiple$, equal$
).pipe(
    tap((op) => {
        if (op != "equal") {
            operation = op
        } else {
            console.log("beres");
            switch (operation) {
                case "add": result = parseInt(input1) + parseInt(input2); break;
                case "substract": result = parseInt(input1) - parseInt(input2); break;
                case "divide": result = parseInt(input1) / parseInt(input2); break;
                case "multiple": result = parseInt(input1) * parseInt(input2); break;
            }
            input1 = result;
            input2 = 0;
            operation = null;
        }
    }),
    map((v) => {
        if (v != "equal") {
            switch (v) {
                case "add": return '+'; break;
                case "substract": return '-'; break;
                case "divide": return ':'; break;
                case "multiple": return 'x'; break;
            }
        } else {
            return result;
        }
    })
)

const calculator$ = merge(numbers$, operands$)

calculator$.subscribe((val) => {
    document.getElementById("input1").innerHTML = val;
});

const clear$ = fromEvent(document.getElementById('clear'), 'click').pipe(map(c => c));

clear$.subscribe(() => {
    input1 = 0;
    input2 = 0;
    operation = null;
    result = 0;
    document.getElementById("input1").innerHTML = input1;
})