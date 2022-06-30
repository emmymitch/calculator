// Defining inital values and variables /////////////////////////////////////////////
let x = 0;
let xArray = [];
let y = 0;
let yArray = [];
let z = 0;
let operator = undefined;
let display = document.querySelector(".screen__current");
let history = document.querySelector(".screen__history");
const numberButtons = document.querySelectorAll(".button__number");
const symbolButtons = document.querySelectorAll(".button__symbol");
const equalsButton = document.querySelector(".button__equals");

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

const getOperator = (event) => {
    operator = event.target.value;

    if (operator == "clear"){
        x = 0;
        xArray = [];
        y = 0;
        yArray = [];
        z = 0;
        operator = undefined;
        display.innerText = "0";
        history.innerText = " ";

    } else if (operator == "+-"){
        xArray.unshift("-");
        display.innerText = "-" + display.innerText;
        history.innerText = "-" + history.innerText;

    } else{
        display.innerText = operator;
        history.innerText += operator;
    }

    return operator;
}

const performEquation = () => {
    console.log(operator);

    // if (xArray==[]){ //For if you click = before operator


    // } else 
    if (operator == "+"){
        z = Number(xArray.join()) + Number(yArray.join());
        display.innerText = z;

    } else if (operator == "-"){
        z = Number(xArray.join()) - Number(yArray.join());
        display.innerText = z;

    } else if (operator == "*"){
        z = Number(xArray.join()) * Number(yArray.join());
        display.innerText = z;

    } else if (operator == "/"){
        z = Number(xArray.join()) / Number(yArray.join());
        display.innerText = z;

    } else if (operator == "+-"){
        z =  Number(xArray.join()) * (-1);
        display.innerText = z;

    } else if (operator == "%"){
        z = Number(xArray.join()) / 100;
        display.innerText = z;

    } else if (operator == undefined){
        display.innerText = Number(xArray.join());

    } else{
        display.innerText = "ERROR";
    }
}

// Adding triggers //////////////////////////////////////////////////////////////////
numberButtons.forEach((button) => {
    button.addEventListener("click", getInput);
})

symbolButtons.forEach((button) => {
    button.addEventListener("click", getOperator);
})

equalsButton.addEventListener("click", performEquation);