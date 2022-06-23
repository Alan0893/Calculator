class Calculator {
    /**
     * @constructor
     * @param {*} previousOperandTextElement equation text element
     * @param {*} currentOperandTextElement answer text element
     */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.equation = ''
        this.answer = ''
        this.clear()
    }

    /**
     * @description Clears the calculator display
     */
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
        this.equation = ''
        this.answer = ''
    }

    /**
     * @description Deletes the previous character 
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /**
     * 
     * @param {String} number The number entered
     * @returns 
     * @description Appends the number to the current operand
     */
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    changeSign() {
        if (this.previousOperand != '' && this.operation != '')
            this.currentOperand *= -1        
        else if (this.previousOperand == '' && this.operation == '')
            this.currentOperand *= -1
        else 
            return
    }

    /**
     * 
     * @param {String} operation The operation entered 
     * @returns 
     * @description gets the operation for the equation
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute(true);
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * 
     * @param {boolean} calculated Checks if the equation should be calculated
     * @returns 
     * @description Calculates the equation
     */
    compute(calculated) {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            default:
                return
        }
        this.equation = prev + ' ' + this.operation + ' ' + current
        this.answer = computation

        if(calculated)  {
            this.previousOperand = ''
            this.currentOperand = this.answer
            this.operation = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.answer)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${ this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand) }`
        } else {
            this.previousOperandTextElement.innerText = this.equation
        }
    }
}

const calc = document.querySelector(".calculator-grid");
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[data-sign]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const theme = document.querySelector(".theme");
const github = document.querySelector(".github");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.compute(false)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute(true)
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

signButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.compute(false)
    calculator.updateDisplay()
})

theme.addEventListener('click', () => {
    calc.classList.toggle("dark")
        ? (theme.firstElementChild.className = "far fa-moon")
        : (theme.firstElementChild.className = "far fa-sun");
});

github.addEventListener('click', () => {
    location.href = 'https://github.com/Alan0893/Calculator'
})