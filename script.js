let inputVal = 0;
let firstnum = 0;
let factor1 = 0;
let factor2 = 0;
let char = 'abcdefghijklmnopqrstuvwxyz';
let letter = '';
let index = 0;
let firstFinal = 0;
let secondFinal = 0;
let finalAnswer = 0;
let sign1;
let sign2;
let variable;
let middleNum;
let factorsFirstNum = [];

function getInputValue() {
    const factors = [];
    inputVal = document.getElementById("inputbox").value;
    const expression = inputVal.split(" ");
    expression.forEach(function(value, index) {
        expression[index] = expression[index].toLowerCase();
    })
    //expression = ['x2', '+', '8x', '+', '7'];

    //if x is first
    if(char.includes(expression[0][0])) {
        variable = expression[0][0];
        firstnum = 1;
        console.log({firstnum})
    } else {
        [...expression[0]].forEach(thing => {
            if(char.includes(thing)) {
                variable = thing;
                index = expression[0].indexOf(thing);
                firstnum = Number(expression[0].slice(0, index));
            }
        })
    }

    console.log({firstnum});

    let lastnum = Number(expression.slice(3, 5).join(''));
    console.log({lastnum});

    let product = firstnum * lastnum;
    console.log({product});

    // for middleNum remove the x(letters) 
    // -8
    //if the middle num is only a variable e.g. w
    if(char.includes(expression.slice(2, 3)[0][0])) {
        if(expression.slice(1, 3)[0] === '+') {
            middleNum = 1;
        } else if(expression.slice(1, 3)[0] === '-') {
            middleNum = -1;
        }
    } else {
        //if the middleNum is 8x
        middleNum = Number(expression.slice(1, 3).join('').replace(/[a-z]/g, ''));
    }

    console.log({middleNum});
    
    // finding the factors
    for(let i = -100; i<100; i++) {
        if(product % i === 0) {
            factors.push(i);
        }
        
        for(let b = 0; b<100; b++) {
            if(i * b === firstnum && i !== 1 && i !== firstnum) {
                factorsFirstNum.push(i);
                factorsFirstNum.push(b);
            }
        }
    }

    console.log({factorsFirstNum});
    factorsFirstNum = [...new Set(factorsFirstNum)];
    //error di set, don't use set, because if 4, [2, 2], there will only be 1 2;
    console.log({factorsFirstNum});

    //finding the real factor,  = the middle num
    const factors2 = [...factors]
    factors2.forEach(value2 => {
        factors.forEach(value => {
            if(value2 * value === product && value2 + value === middleNum) {
                console.log({value}, {value2});
                factor1 = value;
                factor2 = value2;
            }
        })
    })

    //(4u[firstFinal] + 3)(4u + 7)
    //(4u + 3)(4u[secondFinal] + 7)
    firstFinal = firstnum; //include the variable
    secondFinal = firstFinal;

    if(factor1 % firstnum === 0) {
        factor1 /= firstnum;
        firstFinal /= firstnum;
    } else if(factor2 % firstnum === 0) {
        factor2 /= firstnum;
        secondFinal /= firstnum;
    } else {
        //else if the (sdsfd) can't be divided by the firstnum directly, divide each() 
        //with the factors of firstnum. 
        console.log({factorsFirstNum});
        factorsFirstNum.forEach(value => {
            if(factor1 % value === 0) {
                factor1 /= value;
                firstFinal /= value;
                console.log('1', {value});
            } else if(factor2 % value === 0) {
                factor2 /= value;
                secondFinal /= value;
                console.log('2',  {value});
            }
        })
    }

    if(factor1 > 0) {
        sign1 = '+';
    } else {
        sign1 = '';
    }
    
    if(factor2 > 0) {
        sign2 = '+';
    } else {
        sign2 = '';
    }

    if(firstFinal === 1) {
        firstFinal = variable;
    } else {
        firstFinal = String(firstFinal) + variable;
    }

    if(secondFinal === 1) {
        secondFinal = variable;
    } else {
        secondFinal = String(secondFinal) + variable;
    }

    finalAnswer = `(${firstFinal} ${sign1} ${factor1})(${secondFinal} ${sign2} ${factor2})`;
    // finalAnswer = `(${firstFinal} ${factor1})(${secondFinal} ${factor2})`;
    console.log(finalAnswer);
    // document.body.innerHTML = finalAnswer;
    //TODO simplify the answer
    console.log('testing that the commit works');

    //this is a called mom commit

}



