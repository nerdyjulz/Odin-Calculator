/*Extra Credit: 
1. Fixed display length to 13 characters - DONE
2. Disabled dot on single press - DONE
3. Aligned bottom row correctly - DONE
4. Add backspace button - DONE
5. Add keyboard support (numbers, then operators) - INCOMPLETE
*/

//INITIALISATIONS
const buttons = document.querySelectorAll('button');
let displayVal = ""; //store text for display row
displayVal.length = 8;
let butType = 0; // flag records button type (3 = trans, 2 = op, 1 = num)
let num1,num2,lastNum1, lastNum2, lastOpFlag, lastButType, percentNum, stateStart = 0; //numbers store button values
let posNeg = 1; // flag records positive/negative numbers
let opFlag = 0; // flag records operator action
let opVal, lastDisp = ""; // records operator type
const displayDiv = document.querySelector('.displayrow');

// RUN CALCULATOR BUTTON LISTENERS AND RESPOND TO CLICKS
function calcInput() {
    buttons.forEach((button) => {       
        button.addEventListener('click', () => {
            console.log('PRESSED: '+button.innerText+' with name: '+button.className);
            //BACKSPACE BUTTON
            if (button.className.includes("back")){
                reinstate();
                updateDisplay(displayVal);
            //RECORD STATE (supports Backspace)
            } else {
                if (stateStart === 0){
                    stateStart += 1;
                } else {
                    lastState(num1,num2,displayVal,opFlag,posNeg,butType);
                }
                // console.log('START: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);  
                //TRANSFORM BUTTONS        
                if (button.className.includes("trans")) { //Clear
                    dotSwitch(button);
                    if (button.className.includes("trans1")) {
                        displayVal = '0';
                        num1 = 0; //reset values
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
                            displayVal = displayVal.replace("-",""); 
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
                    dotSwitch(button);
                    if (button.className.includes("op5")){ // if '=' button, evaluate and display
                        console.log("opVal is: "+opVal+", Num1: "+num1+", Num2: "+num2);
                        displayVal = operate(opVal, num1, num2);
                        console.log(displayVal);
                        updateDisplay (displayVal);
                        num1 = +displayVal; //store latest result in Num1
                        opFlag = 0;
                    } else {
                        if (opFlag == 0) {
                            // num1 = displayVal;
                            opVal = button.innerText;
                            opFlag = 1; 
                        } else {
                            displayVal = operate(opVal, num1, num2);
                            num1 = +displayVal;
                            opVal = button.innerText;
                            // opFlag = 0;
                        }            
                        updateDisplay (displayVal);                
                    }
                    butType = 2;
                } else { //NUMBER BUTTONS
                    if (butType == 3){
                        dotSwitch(button);
                        displayVal = button.innerText;
                        num1 = +displayVal;
                    } else if (butType == 2) {
                        dotSwitch(button);
                        displayVal = button.innerText;
                        num2 = +displayVal;
                    } else {
                        // if first instance, write to num1  
                        dotSwitch(button);      
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
                    }
                    updateDisplay(displayVal);
                    butType = 1;
                }
            console.log('END: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);
            console.log('LastNum: '+lastNum1+', lastNum2: '+lastNum2+ ", lastDisp: " + lastDisp);
        }
        });
        //VISUAL BUTTON QUEUE
        button.addEventListener("mouseover", (event) => {
            button.className = button.className + " playing";
        });
        
        button.addEventListener("mouseout", (event) => {
            if (button.className.includes(" playing") ){
                button.className = button.className.slice(0, (button.className.length - 8));
            }
        });
    });
}

// stores previous button state (for backspace utility)
function lastState (num1, num2, disp, opflag, posneg, buttype){
    lastNum1 = num1;
    lastNum2 = num2;
    lastDisp = disp;
    lastOpFlag = opflag;
    lastPosNeg = posneg;
    lastButType = buttype;
    console.log('LAST STATE RECORDED AS: Num1: '+lastNum1+', Num2: '+lastNum2+ ', displayVal: '+lastDisp+ ', opFlag: ' + lastOpFlag+ ", posNeg:  "+ lastPosNeg+", butType: "+lastButType);
}

// reverts to previous button state (for backspace utility)
function reinstate () {
    num1 = lastNum1;
    num2 = lastNum2;
    displayVal = lastDisp;
    opFlag = lastOpFlag;
    posNeg = lastPosNeg;
    butType = lastButType;
    console.log('REINSTATING: Num1: '+num1+', Num2: '+num2+ ', displayVal: '+displayVal+ ', opFlag: ' + opFlag+ ", posNeg:  "+ posNeg+", butType: "+butType);
}

// refresh Display row
function updateDisplay(num){
    let temp = +num;
    displayDiv.innerText = temp;
}

// disable/enable dot button, depending on if it has been pressed already.
function dotSwitch (but) {
    if (but.className.includes("dot")){
        dotFlag = 1;
        if (dotFlag === 1) {
            but.disabled = true;
        }  
    } else if (but.className.includes("op") || but.className.includes("trans1")){
        buttons.forEach((button) => {
            button.disabled = false;
        });           
    }   
}
 
// CALCULATOR OPERATORS
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

// EXECUTE MATH COMBINATION (i.e. two nums + operator)
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
    let toNum = +result;
    let shortner = toNum.toString();
    result = shortner.substring(0, 13);
    console.log('toNum:'+toNum + ' shortner: '+shortner+' result: '+result)
    return result;
}

calcInput();