// Defining inital values and variables /////////////////////////////////////////////
let x = 0;
let xArray = [];
let y = 0;
let yArray = [];
let z = 0;
let operator = undefined;
let plusMinus = undefined;
let display = document.querySelector(".screen__current");
let history = document.querySelector(".screen__history");
const numberButtons = document.querySelectorAll(".button__number");
const symbolButtons = document.querySelectorAll(".button__symbol");
const equalsButton = document.querySelector(".button__equals");
const plusMinusButton = document.querySelector("#plus-minus");

//Defining functions ////////////////////////////////////////////////////////////////
const resetValues = () => {
    xArray = [z];
    yArray = [];
    operator = undefined;
    plusMinus = undefined;
    history.innerText = " ";
}

const getInput = (event) => {
    input = event.target.value;

    if (operator == undefined){
        xArray.push(input);
        display.innerText = input;
        history.innerText += input;

    } else{
        yArray.push(input);
        display.innerText = input;
        history.innerText += input;
    }
}

const getOperator = (event) => {
    //perform outstanding operator
    if (yArray.length>0){
        performEquation()
    }

    //define new operator
    operator = event.target.value;

    if (operator == "clear"){
        z=0;
        resetValues();
        display.innerText = "0";

    } else if (operator == "+-"){
        switchSign();

    } else{
        display.innerText = operator;
        history.innerText += operator;
        performEquation()
    }
    return;// operator;
}

const switchSign = () => {
    if (xArray[0]=="-"){
        return operator;

    } else{
        xArray.unshift("-");
        display.innerText = "-" + display.innerText
        history.innerText = "-" + history.innerText;
    }
}

const convertToNumber = () => {
    num1 = Number(xArray.join(""));
    num2 = Number(yArray.join(""));
    return num1, num2;
}

const performEquation = () => {
    convertToNumber();

    if (operator == "+"){
        z = Number(xArray.join("")) + Number(yArray.join(""));

    } else if (operator == "-"){
        z = Number(xArray.join("")) - Number(yArray.join(""));

    } else if (operator == "*" && yArray.length>0){
        z = Number(xArray.join("")) * Number(yArray.join(""));

    } else if (operator == "/" && yArray.length>0){
        z = Number(xArray.join("")) / Number(yArray.join(""));

    } else if (operator == "%"){
        console.log(Number(xArray.join("")));
        console.log(Number(yArray.join("")));
        z = (Number(xArray.join("")) /100) * Number(yArray.join(""));

    } else if (operator == undefined){
        z = Number(xArray.join(""));

    } else if (operator == "*"||"/" && yArray.length==0){
        z = Number(xArray.join(""));
    }
    xArray = [z];
    yArray = [];
    return z;
}

const displayResult = () => {
    performEquation(); 
    console.log("displayResults z=" + z);
    display.innerText = Math.round((z+Number.EPSILON)*100)/100;
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