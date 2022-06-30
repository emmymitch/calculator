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
const getInput = (event) => {
    input = event.target.value;

    if (operator == undefined){
        xArray.push(input);
        display.innerText = input;
        history.innerText += input;
        console.log("XA " + xArray);

    } else{
        yArray.push(input);
        display.innerText = input;
        history.innerText += input;
        console.log("YA " + yArray);
    }
}

const resetValues = () => {
    x = 0;
    xArray = [];
    y = 0;
    yArray = [];
    z = 0;
    operator = undefined;
    plusMinus = undefined;
    history.innerText = " ";
}

const getOperator = (event) => {
    operator = event.target.value;

    if (operator == "clear"){
        resetValues();
        display.innerText = "0";

    } else if (operator == "+-"){
        xArray.unshift("-");
        console.log("XA " + xArray);
        display.innerText = "-" + display.innerText;
        history.innerText = "-" + history.innerText;

    } else{
        display.innerText = operator;
        history.innerText += operator;
    }

    return operator;
}

const switchPositiveNegative = (event) => {
    plusMinus = event.target.value;
    if (xArray[0]=="-"){
        return;
    } else{
        xArray.unshift("-");
        console.log("XA " + xArray + "PM " + plusMinus);
        display.innerText = "-" + display.innerText;
        history.innerText = "-" + history.innerText;
        return plusMinus;
    }
}

const performEquation = () => {
    if (operator == "+"){
        z = Number(xArray.join("")) + Number(yArray.join(""));

    } else if (operator == "-"){
        z = Number(xArray.join("")) - Number(yArray.join(""));

    } else if (operator == "*"){
        z = Number(xArray.join("")) * Number(yArray.join(""));

    } else if (operator == "/"){
        z = Number(xArray.join("")) / Number(yArray.join(""));

    // } else if (operator == "+-"){
    //     z =  Number(xArray.join("")) * (-1);
    //     // display.innerText = z;

    } else if (operator == "%"){
        z = Number(xArray.join("")) / 100;

    } else if (operator == undefined){
        z = Number(xArray.join(""));

    }

    // if (plusMinus = "+-"){
    //     z = z*(-1);
    // }
    console.log("x " + xArray.join(""));
    display.innerText = z;
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

//plusMinusButton.addEventListener("click", switchPositiveNegative);

equalsButton.addEventListener("click", performEquation);