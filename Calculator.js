/*Outstanding tweaks
1. fix display length to 10 characters.
*/


const buttons = document.querySelectorAll('button');
let displayVal = ""; //store text for display row
let butType = 0; // flag records button type (3 = trans, 2 = op, 1 = num)
let num1,num2,percentNum = 0; //numbers store button values
let posNeg = 1; // flag records positive/negative numbers
let opFlag = 0; // flag records operator action
let opVal = ""; // records operator type
const displayDiv = document.querySelector('.displayrow');

function calcInput() {
    // console.log('in calcInput...');
    buttons.forEach((button) => {
        // console.log('in loop...');
        button.addEventListener('click', () => {
            console.log('START: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);
            console.log('Pressed: '+button.innerText+' with name: '+button.className);
            //TRANSFORM BUTTONS
            if (button.className.includes("trans")) { //Clear
                if (button.className.includes("trans1")) {
                    displayVal = '0';
                    num1 = 0;
                    num2 = 0;
                    opFlag = 0;
                    updateDisplay(displayVal);
                } else if (button.className.includes("trans2")) { //Plus-Minus
                    //make negative
                    if (posNeg == 1) {
                        posNeg = 0;
                        displayVal = "-" + displayVal;
                        num1 *= -1;
                    } else { //or positive
                        posNeg = 1;
                        displayVal = displayVal.replace("-",""); //
                        num1 *= -1;
                    }
                    updateDisplay(displayVal);
                } else { //Percentage
                    percentNum = displayVal / 100;
                    displayVal = percentNum;
                    num1 = percentNum;
                    updateDisplay(displayVal);
                }
                butType = 3;
            // OPERATOR BUTTONS
            } else if (button.className.includes("op")) {
                if (button.className.includes("op5")){ // if equals, evaluate and display
                    console.log("opVal is: "+opVal+", Num1: "+num1+", Num2: "+num2);
                    displayVal = operate(opVal, num1, num2);
                    updateDisplay (displayVal);
                    num1 = +displayVal; //store latest result in Num1
                    opFlag = 0;
                } else {
                    if (opFlag == 0) {
                        // num1 = displayVal;
                        opVal = button.innerText;
                        opFlag = 1; 
                    } else {
                        opVal = button.innerText;
                        displayVal = operate(opVal, num1, num2);
                        num1 = +displayVal;
                        // opFlag = 0;
                    }            
                    updateDisplay (displayVal);                
                }
                butType = 2;
            } else { //NUMBER BUTTONS
                if (butType == 3){
                    displayVal = button.innerText;
                    num1 = +displayVal;
                    // butType = 1;
                } else if (butType == 2) {
                    displayVal = button.innerText;
                    num2 = +displayVal;
                    // butType = 1;
                } else {
                    // if first instance, write to num1        
                    if (num1 === undefined) {  
                        displayVal = displayVal+button.innerText;
                        num1 = +displayVal;
                    } else {
                        //and continue to add nums until the first operator
                        if (opFlag === 0){
                            displayVal = displayVal+button.innerText;
                            num1 = +displayVal;
                        //otherwise, always write to num2
                        } else {
                            displayVal = displayVal+button.innerText;
                            num2 = +displayVal;
                        }
                    }
                    // butType = 1;
                }
                updateDisplay(displayVal);
                butType = 1;
            }
            // isNum = (button.className.includes("num")) ? true : false;
            console.log('END: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);
        });
        button.addEventListener("mouseover", (event) => {
            // console.log ("Moused-over: " + button.className);
            button.className = button.className + " playing";
        });
        
        button.addEventListener("mouseout", (event) => {
            // console.log ("Moused-out: " + button.className);
            if (button.className.includes(" playing") ){
                button.className = button.className.slice(0, (button.className.length - 8));
            }
        });
    });
}

function updateDisplay(num){
    displayDiv.innerText = num;
}
 
const add = function (num1, num2) {
    return result = num1+num2;
}

const subtract = function (num1, num2) {
    return result = num1-num2;
}

const multiply = function (num1, num2) {
    console.log('X: '+ num1 +" * " + num2 + " = " + (num1*num2));
    return result = num1*num2;   
}

const divide = function (num1, num2) {
    if (num2 === 0){
        return result = 'dumby!';
    }
    return result = num1/num2;
}

const operate = function (op, num1, num2){
    console.log(op);
    if (isNaN(num1) || isNaN (num2)){
        result = 'NaN';
    } else {
        switch (op) {
            case '+':
                console.log("In add...");
                add (num1, num2);
                console.log("...with result: "+result);
            break;
            case '-':
                console.log("In sub...");
                subtract (num1, num2);
                console.log("...with result: "+result);
            break;
            case '*':
                console.log("In mult...");
                multiply (num1, num2);
                console.log("...with result: "+result);
            break;
            case '/':
                console.log("In div...");
                divide (num1, num2);
                console.log("...with result: "+result);
            break;
        }
    }
    return result;
}

calcInput();