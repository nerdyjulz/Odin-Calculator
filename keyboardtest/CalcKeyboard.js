/*Extra Credit: 
1. Fixed display length to 13 characters - DONE
2. Disabled dot on single press - DONE
3. Aligned bottom row correctly - DONE
4. Add backspace button (for one instance) - DONE
5. Add keyboard support (numbers, then operators) - DONE (need click-start fix)
6. Add backspace button (for many instance) - DONE
*/

//INITIALISATIONS54321
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
    //MOUSE CLICK INPUT
    buttons.forEach((button) => {      
        button.focus(); //sets HTMLelement focus (supports keyboard)
        button.addEventListener('click', () => {
            console.log('MOUSEPRESSED: '+button.innerText+' with name: '+button.className);
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
                                num2 = +displayVal;1
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
        //KEYBOARD INPUT
        button.addEventListener('keydown', (event) => {
            let keyVal = event.key;
            let keyDiv = keyTable(keyVal);
            console.log('KEYPRESSED with value: '+ keyVal + ' and keyDiv: ' + keyDiv);
                // if (button.className.includes(keyDiv)){
                //     butObj = button;
                // }
            if (keyTable(keyVal)) {
                console.log('Valid key: '+keyVal);
                buttons.forEach((button) => {
                    if (button.className.includes (keyDiv)){
                                //BACKSPACE BUTTON
                            if (keyVal === 'Backspace'){
                                reinstate();
                                updateDisplay(displayVal);
                            //RECORD STATE (supports Backspace)
                            } else {
                                if (stateStart === 0){
                                    stateStart += 1;
                                } else {
                                    lastState(num1,num2,displayVal,opFlag,posNeg,butType);
                                }
                                console.log('START: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);  
                                if ((keyVal !== '-') &&
                                    (keyVal !== '*') &&
                                    (keyVal !== '+') &&
                                    (keyVal !== '/') &&
                                    (keyVal !== '=') 
                                    // keyVal !== '=')
                                    ){ //NUMBER BUTTONS
                                    console.log ('in NUM function!');
                                    if (butType == 3){
                                        dotSwitch(button);
                                        displayVal = keyVal;
                                        num1 = +displayVal;
                                    } else if (butType == 2) {
                                        dotSwitch(button);
                                        displayVal = keyVal;
                                        num2 = +displayVal;
                                    } else {
                                        // if first instance, write to num1  
                                        dotSwitch(button);      
                                        if (num1 === undefined) {  
                                            displayVal = displayVal+keyVal;
                                            num1 = +displayVal;
                                        } else {
                                            //and continue to add nums until the first operator
                                            if (opFlag === 0){
                                                displayVal = displayVal+keyVal;
                                                num1 = +displayVal;
                                            //otherwise, always write to num2
                                            } else {
                                                displayVal = displayVal+keyVal;
                                                num2 = +displayVal;
                                            }
                                        }
                                    }
                                    updateDisplay(displayVal);
                                    butType = 1;
                                //OPERATOR BUTTONS
                                } else {
                                    console.log ('in OP function!');
                                    dotSwitch(button);
                                    if (keyVal === '=') {// if '=' button, evaluate and display
                                        console.log("opVal is: "+opVal+", Num1: "+num1+", Num2: "+num2);
                                        displayVal = operate(opVal, num1, num2);
                                        console.log(displayVal);
                                        updateDisplay (displayVal);
                                        num1 = +displayVal; //store latest result in Num1
                                        opFlag = 0;
                                    } else {
                                        if (opFlag == 0) {
                                            // num1 = displayVal;
                                            opVal = keyVal;
                                            opFlag = 1; 
                                        } else {
                                            displayVal = operate(opVal, num1, num2);
                                            num1 = +displayVal;
                                            opVal = keyVal;
                                            // opFlag = 0;
                                        }            
                                        updateDisplay (displayVal);                
                                    }
                                    butType = 2;
                                // RANDOM BUTTONS
                                }
                            }
                    }
                }); 
            } else {
                console.log('Random key...exiting');
            }
            console.log('END: Num1: '+num1+', Num2: '+num2+ ", butType: " + butType + ' opFlag: ' +opFlag);
            console.log('LastNum: '+lastNum1+', lastNum2: '+lastNum2+ ", lastDisp: " + lastDisp);
        });
    
        //VISUAL BUTTON QUEUE (supports mouse input)
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

// matches buttons to div names (supports keyboard input)
function keyTable (key) {
    let translateTable = [
    ['Backspace', "but20-back"],
    ['.', "but18-numdot-bot2"],
    ['0', "but17-num0-bot1"],
    ['1', "but13-num1"],
    ['2', "but14-num2"],
    ['3', "but15-num3"],
    ['4', "but9-num4"],
    ['5', "but10-num5"],
    ['6', "but11-num6"],
    ['7', "but5-num7"],
    ['8', "but6-num8"],
    ['9', "but7-num9"],
    ['/', "but4-op1"],
    ['*', "but8-op2"],
    ['-', "but12-op3"],
    ['+', "but16-op4"],
    ['=', "but19-op5-bot3"] ];
    for (i=0; i < translateTable.length; i++){
        if (key === translateTable[i][0]){
            let divName = translateTable[i][1];
            return divName;
        }
    }
    return false;
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