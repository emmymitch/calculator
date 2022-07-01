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
    z = 0;
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
        // console.log("XA Input " + xArray);

    } else{
        yArray.push(input);
        display.innerText = input;
        history.innerText += input;
        // console.log("YA Input " + yArray);
    }
}

const getOperator = (event) => {  ////// add ifelse for =
    if (yArray.length>0){
        performEquation()
    }
    
    operator = event.target.value;

    if (operator == "clear"){
        resetValues();
        display.innerText = "0";

    // } else if (operator == "+-"){
    //     xArray.unshift("-");
    //     console.log("XA " + xArray);
    //     display.innerText = "-" + display.innerText;
    //     history.innerText = "-" + history.innerText;

    } else{
        display.innerText = operator;
        history.innerText += operator;
        performEquation()
    }
    return operator;
}

const switchSign = (event) => {
    plusMinus = event.target.value;
    if (xArray[0]=="-"){
        plusMinus = undefined;
        return plusMinus;
    } else{
        xArray.unshift("-");
        console.log("XA " + xArray + "PM " + plusMinus);
        display.innerText = "-" + display.innerText;
        history.innerText = "-" + history.innerText;
        return plusMinus;
    }
}

const performEquation = () => {
    console.log("xArray eqn input = " + xArray);
    console.log("yArray eqn input = " + yArray);
    if (operator == "+"){
        z = Number(xArray.join("")) + Number(yArray.join(""));

    } else if (operator == "-"){
        z = Number(xArray.join("")) - Number(yArray.join(""));

    } else if (operator == "*" && yArray.length>0){
        z = Number(xArray.join("")) * Number(yArray.join(""));

    } else if (operator == "/" && yArray.length>0){
        z = Number(xArray.join("")) / Number(yArray.join(""));

    // } else if (operator == "+-"){
    //     z =  Number(xArray.join("")) * (-1);
    //     // display.innerText = z;

    } else if (operator == "%" && yArray.length>0){
        z = Number(xArray.join("")) / 100;

    } else if (operator == undefined){
        z = Number(xArray.join(""));

    } else if (operator == "*"||"/"||"%" && yArray.length==0){
        z = Number(xArray.join(""));
    }
    xArray = [z];
    yArray = [];
    return z;
}

const displayResult = () => {
    performEquation(); 
    console.log("displayResults z=" + z);
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

//plusMinusButton.addEventListener("click", switchSign);

equalsButton.addEventListener("click", displayResult);