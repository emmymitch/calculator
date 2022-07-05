// Defining inital values and variables /////////////////////////////////////////////
let num1Array = [];
let num2Array = [];
let num1 = 0;
let num2 = 0;
let numResult = 0;

let operator = undefined;
let plusMinus = undefined;
let includesDecimal = false;

let display = document.querySelector(".screen__current");
let history = document.querySelector(".screen__history");
const numberButtons = document.querySelectorAll(".button__number");
const symbolButtons = document.querySelectorAll(".button__symbol--operator");
const equalsButton = document.querySelector("#equals");
const plusMinusButton = document.querySelector("#plus-minus");



//Defining functions ////////////////////////////////////////////////////////////////
const resetValues = () => {
    num1Array = [numResult];
    num2Array = [];
    operator = undefined;
    plusMinus = undefined;
}

const getInput = (event) => {

    // Input control for mouse/keyboard
    if (event.type == "click"){
        input = event.target.value;
    } else if ((event.type = "keydown") && ((event.key<=9 && event.key>=0))){
        input = event.key;
    } else if ((event.type = "keydown") && (!event.key<=9)){ //For non-numerical key press
        return;
    }

    // To prevent having multiple decimal points
    checkDecimal();
        if (operator == undefined){
            if (includesDecimal == false && input =="."){
                num1Array.push(input);
            } else if (includesDecimal == true && input =="."){
                return;
            } else{
                num1Array.push(input);
            }

        } else{
            if (includesDecimal == false && input =="."){
                num2Array.push(input);
            } else if (includesDecimal == true && input =="."){
                return;
            } else{
                num2Array.push(input);
            }
        }

        display.innerText = input;
        history.innerText += input;

}

const checkDecimal = () => {
    if (operator == undefined){
        includesDecimal = num1Array.includes(".");
    } else{
        includesDecimal = num2Array.includes(".");
    }
    return includesDecimal;
}

const getOperator = (event) => {
    //Perform outstanding operator
    if (num2Array.length>0){
        performEquation()
    }

    //Define new operator
    operator = event.target.value;

    if (operator == "all-clear"){
        numResult=0;
        resetValues();
        display.innerText = "0";
        history.innerText = " ";

    } else{
        display.innerText = operator;
        history.innerText += operator;
        if (operator != "%"){performEquation()}
    }
    return;
}

const switchSign = () => {
    if (operator == undefined){
        if (num1Array[0] == "-"){
            num1Array.shift();
            display.innerText = display.innerText.slice(1);
            history.innerText = history.innerText.slice(1);

        } else{
            num1Array.unshift("-");
            display.innerText = "-" + display.innerText;
            history.innerText = "-" + history.innerText;

        }

    } else{
        const operatorPlace = history.innerText.indexOf(operator);

        if (num2Array[0] == "-"){
            num2Array.shift();
            display.innerText = " " + display.innerText;
            history.innerText = history.innerText.slice(0, operatorPlace+1) + history.innerText.slice(operatorPlace+2);
            
        } else{
            num2Array.unshift("-");
            display.innerText = "-" + display.innerText;
            history.innerText = history.innerText.slice(0, operatorPlace+1) + "-" + history.innerText.slice(operatorPlace+1);
        }
    }
}

const convertToNumber = () => {
    num1 = Number(num1Array.join(""));
    num2 = Number(num2Array.join(""));
    return num1, num2;
}

const performEquation = () => {
    convertToNumber();

    //Addition
    if (operator == "+"){
        numResult = num1 + num2;

    //Subtraction
    } else if (operator == "-"){
        numResult = num1 - num2;

    //Multiplication - with check so don't multiply by 0 - this would be bad
    } else if (operator == "*" && num2Array.length>0){
        numResult = num1 * num2;

    //Division  - with check so don't divide by 0 - this would be worse
    } else if (operator == "/" && num2Array.length>0){
        numResult = num1 / num2;

    //Percentage
    } else if (operator == "%"){
        numResult = (num1 /100);
        if (num2 != 0){
            numResult = numResult * num2;
        }
    
    //Return same number if no operator or if attempting to * or / by 0
    } else if ((operator == undefined) || (operator == "*"||"/" && num2Array.length==0)){
        numResult = num1;
    }

    num1Array = [numResult];
    num2Array = [];
    return numResult;
}

const displayResult = () => {
    performEquation();
    roundNumber = Math.round((numResult+Number.EPSILON)*(10**7))/(10**7); //to prevent stretching the screen for numbers with lots of digits
    display.innerText = roundNumber;
    history.innerText = roundNumber; //shows that the result is still stored
    resetValues();
}



// Adding triggers //////////////////////////////////////////////////////////////////
numberButtons.forEach((button) => {
    button.addEventListener("click", getInput);
})

symbolButtons.forEach((button) => {
    button.addEventListener("click", getOperator);
})

plusMinusButton.addEventListener("click", switchSign);
equalsButton.addEventListener("click", displayResult);

window.addEventListener("keydown", getInput);
