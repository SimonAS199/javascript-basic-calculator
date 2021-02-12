const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".operatorButton");
const equalsBtn = document.getElementById("equals");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clearAll");
const previousOperand = document.getElementById("previousOperand");
const currentOperand = document.getElementById("currentOperand");

let operator = "";
let result;
let wasFinal = false;

const appendDigit = (digit) => {
    while (wasFinal == true && previousOperand.innerText == "") {
        clearDisplay();
    }
    if (digit == "." && currentOperand.innerText.includes(".")) {
        return;
    } else {
        currentOperand.innerText += digit.toString();
    }
}

const chooseOperator = (chosenOperator) => {
    if (operator == "" || wasFinal == true) {
        operator = chosenOperator;
        previousOperand.innerText = currentOperand.innerText + " " + operator;
        currentOperand.innerText = "";
    } else {
        calculate();
        operator = chosenOperator;
        previousOperand.innerText = result.toString() + " " + operator;
        currentOperand.innerText = "";
    }
}

const calculate = () => {
    if (previousOperand == "") {
        result = currentOperand.innerText;
    } else {
        switch (operator) {
            case "+":
                result = parseFloat(previousOperand.innerText.slice(0, -2)) + parseFloat(currentOperand.innerText);
                break;
            case "-":
                result = parseFloat(previousOperand.innerText.slice(0, -2)) - parseFloat(currentOperand.innerText);
                break;
            case "*":
                result = parseFloat(previousOperand.innerText.slice(0, -2)) * parseFloat(currentOperand.innerText);
                break;
            case "÷":
                result = parseFloat(previousOperand.innerText.slice(0, -2)) / parseFloat(currentOperand.innerText);
                break;
            default:
                return;
        }
    }

}

const clearDisplay = () => {
    previousOperand.innerText = "";
    currentOperand.innerText = "";
    operator = "";
    wasFinal = false;
}

const deleteDigit = () => {
    currentOperand.innerText = currentOperand.innerText.slice(0, -1);
}

const showFinalResult = () => {
    calculate();
    previousOperand.innerText = "";
    currentOperand.innerText = result.toString();
    wasFinal = true;
}

opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.innerText);
    })
})

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendDigit(button.innerText);
    })
})

clearBtn.addEventListener("click", () => {
    clearDisplay();
})

equalsBtn.addEventListener("click", () => {
    showFinalResult();
})

deleteBtn.addEventListener("click", () => {
    deleteDigit();
})