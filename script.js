// Defining inital values and variables /////////////////////////////////////////////
let num1 = 0;
let num1Array = [];
let num2 = 0;
let num2Array = [];
let numResult = 0;
let operator = undefined;
let plusMinus = undefined;
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
    history.innerText = " ";
}


const getInput = (event) => {
    input = event.target.value;

    if (operator == undefined){
        num1Array.push(input);
        display.innerText = input;
        history.innerText += input;

    } else{
        num2Array.push(input);
        display.innerText = input;
        history.innerText += input;
    }
}

const getOperator = (event) => {
    //perform outstanding operator
    if (num2Array.length>0){
        performEquation()
    }

    //define new operator
    operator = event.target.value;

    if (operator == "all-clear"){
        numResult=0;
        resetValues();
        display.innerText = "0";

    } else if (operator == "+-"){
        switchSign();

    } else{
        display.innerText = operator;
        history.innerText += operator;
        if (operator != "%"){performEquation()}
    }
    return;
}

const switchSign = () => {
    if (num1Array[0]=="-"){
        return operator;

    } else{
        num1Array.unshift("-");
        display.innerText = "-" + display.innerText
        history.innerText = "-" + history.innerText;
    }
}

const convertToNumber = () => {
    num1 = Number(num1Array.join(""));
    num2 = Number(num2Array.join(""));
    return num1, num2;
}

const performEquation = () => {
    convertToNumber();

    if (operator == "+"){
        numResult = num1 + num2;

    } else if (operator == "-"){
        numResult = num1 - num2;

    } else if (operator == "*" && num2Array.length>0){
        numResult = num1 * num2;

    } else if (operator == "/" && num2Array.length>0){
        numResult = num1 / num2;

    } else if (operator == "%"){
        console.log("num1: "+num1+"  num2: "+num2);
        numResult = (num1 /100);
        if (num2 != 0){
            numResult = numResult * num2;
        }

    } else if (operator == undefined){
        numResult = num1;

    } else if (operator == "*"||"/" && num2Array.length==0){
        numResult = num1;
    }
    num1Array = [numResult];
    num2Array = [];
    return numResult;
}

const displayResult = () => {
    performEquation(); 
    console.log("displayResults z=" + numResult);
    display.innerText = Math.round((numResult+Number.EPSILON)*100000000)/100000000;
    history.innerText = " ";
    resetValues();
}

// Adding triggers //////////////////////////////////////////////////////////////////
numberButtons.forEach((button) => {
    button.addEventListener("click", getInput);
})

symbolButtons.forEach((button) => {
    button.addEventListener("click", getOperator);
})

//plusMinusButton.addEventListener("click", switchSign);

equalsButton.addEventListener("click", displayResult);