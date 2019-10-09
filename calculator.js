const { fromEvent, merge } = rxjs;
const { tap, map } = rxjs.operators;

const numbers = document.querySelectorAll(".numbers > button");
const operations = document.querySelectorAll(".operations > button");
const clear = document.querySelector(".clear > button");

const arrNum = ['one$', 'two$', 'three$', 'four$', 'five$', 'six$', 'seven$', 'eight$', 'nine$', 'zero$'];

arrNum.forEach((item, index) => {
  window[item] = fromEvent(numbers[index], 'click').pipe(map(() => index));
});

const numbers$ = merge(
  // arrNum.map((num) => window[num]).join()
  one$, two$, three$, four$, five$, six$, seven$, eight$, nine$, zero$
);

const add$ = fromEvent(operations[0], 'click').pipe(map(() => '+'))
const substract$ = fromEvent(operations[1], 'click').pipe(map(() => '-'))
const multiply$ = fromEvent(operations[2], 'click').pipe(map(() => '*'))
const divide$ = fromEvent(operations[3], 'click').pipe(map(() => '/'))
const equal$ = fromEvent(operations[4], 'click').pipe(map(() => '='))

const operators$ = merge(add$, substract$, multiply$, divide$, equal$);

const clear$ = fromEvent(clear, 'click')


// 
// OPERATION

let resultTemp = '';
let operator = null;
let result = 0;

// init
const number$ = numbers$.pipe(
  tap((input) => {
    resultTemp += input;
  }),
  map(() => resultTemp)
);

const calculator$ = operators$.pipe(
  tap((input) => {

    if (!operator) {
      result = Number(resultTemp);
    } else {
      switch(operator) {
        case '+':
          result += Number(resultTemp);
        break;
        case '-':
          result -= Number(resultTemp);
        break;
        case '*':
          result *= Number(resultTemp);
        break;
        case '/':
          result /= Number(resultTemp);
        break;
      }
    }
    operator = input;
    // if (input == '=') {
    //   document.getElementById('log').textContent += ` = ${result} `;
    // } else {
    //   document.getElementById('log').textContent += `${resultTemp} ${input} `;
    // }
    document.getElementById('log').textContent += `${resultTemp} ${input} `;
    resultTemp = ''; // reset resultTemp
  }),
  map(() => result)
);

// subscriber
number$.subscribe(number => {
  document.getElementById('result').textContent = number;
});

calculator$.subscribe((result) => {
  document.getElementById('result').textContent = result;
});

clear$.subscribe(() => {
  document.getElementById('result').textContent = 0;
  document.getElementById('log').textContent = ' ';
  
  resultTemp = '';
  operator = null;
  result = 0;
})