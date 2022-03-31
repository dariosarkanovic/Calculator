class Calculator{
    constructor(previousOperandTextElement, currentsOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentsOperandTextElement = currentsOperandTextElement;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentsOperand = '';
        this.operation = undefined;
    }

    delete(){
        console.log('delete')
        this.currentsOperand = this.currentsOperand.slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentsOperand.includes('.')) return;
        this.currentsOperand += number;
    }

    chooseOperation(operation){
        if(this.currentsOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentsOperand;
        this.currentsOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentsOperand);
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                 computation = prev +- curr;
                 break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                 computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentsOperand = computation.toString();
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        console.log('update')
        this.currentsOperandTextElement.innerText = this.getDisplayNumber(this.currentsOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equeal = document.querySelector('[data-equal]');
const allClear = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentsOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentsOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equeal.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});