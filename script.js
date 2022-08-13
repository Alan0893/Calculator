class Calculator {
    /**
     * @constructor
     * @param {*} prevOperand equation text element
     * @param {*} currOperand answer text element
     */
    constructor(prevOperand, currOperand) {
        this.prevOperand    = prevOperand
        this.currOperand    = currOperand
        this.equation       = ''
        this.answer         = ''
        this.clear()
    }

    /**
     * @description Clears the calculator display
     */
    clear() {
        this.currentOperand = '0'
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
     * @description Appends the number to the current operand
     * @param {String} number The number entered
     */
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    /**
     * @description Changes the sign of the current operand
     */
    changeSign() {
        if (this.previousOperand != '' && this.operation != '')
            this.currentOperand *= -1        
        else if (this.previousOperand == '' && this.operation == '')
            this.currentOperand *= -1
        else return
    }

    /**
     * @description gets the operation for the equation
     * @param {String} operation The operation entered 
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute(true)
        }
        this.operation = operation
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    /**
     * @description Calculates the equation
     * @param {boolean} calculated Checks if the equation should be calculated
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
            this.equation = this.answer
        }
    }

    /**
     * @description Converts the number to String format to display
     * @param {float} number 
     */
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

    /**
     * @description Updates the display of the calculator
     */
    updateDisplay() {
        this.currOperand.innerText = this.getDisplayNumber(this.answer)
        if (this.operation != null) {
            this.prevOperand.innerText =
                `${ this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand) }`
        } else {
            this.prevOperand.innerText = this.equation
        }
    }
}

//----------------------------------------------------------------------------------------
// FETCHING ALL DATA FROM index.html
const numberButtons         = document.querySelectorAll('[number]')
const operationButtons      = document.querySelectorAll('[operation]')
const equalsButton          = document.querySelector('[equals]')
const deleteButton          = document.querySelector('[delete]')
const allClearButton        = document.querySelector('[all-clear]')
const signButton            = document.querySelector('[sign]')
const prevOperand           = document.querySelector('[previous-operand]')
const currOperand           = document.querySelector('[current-operand]')
//----------------------------------------------------------------------------------------
const calc                  = document.querySelector('.calculator-grid');
const theme                 = document.querySelector('.theme');
//VARIABLE TO CHECK IF NAV IS OPENED
var isNavOpen               = false;

//----------------------------------------------------------------------------------------
//SETTING THE DEFAULT THEME TO SYSTEM SETTING THEME
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
if (systemTheme.matches) {
    calc.classList.toggle('dark')
    theme.firstElementChild.className = "far fa-moon"
}
else { theme.firstElementChild.className = "far fa-sun" }

//----------------------------------------------------------------------------------------
// CREATING A NEW CALCULATOR OBJECT
const calculator = new Calculator(prevOperand, currOperand)

// NUMBER BUTTONS
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.compute(false)
        calculator.updateDisplay()
    })
})
// OPERATION BUTTONS
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
// EQUALS BUTTON
equalsButton.addEventListener('click', () => {
    calculator.compute(true);
    calculator.updateDisplay();
})
// CLEAR BUTTON
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
// DELETE BUTTON
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
// SIGN BUTTON
signButton.addEventListener('click', () => {
    calculator.changeSign()
    calculator.compute(false)
    calculator.updateDisplay()
})

// THEME TOGGLE
theme.addEventListener('click', () => {
    calc.classList.toggle('dark')
        ? (theme.firstElementChild.className = "far fa-moon")
        : (theme.firstElementChild.className = "far fa-sun")
});

//----------------------------------------------------------------------------------------
// CHECKS WHEN A KEY IS PRESSED
document.onkeydown = function (e) {
    if (e.key == 'Backspace') { 
        calculator.delete() 
        calculator.updateDisplay()
    } 
    else if (e.key == '^') {
        calculator.chooseOperation('^')
        calculator.updateDisplay()
    }
    else if (e.key == '+') {
        calculator.chooseOperation('+')
        calculator.updateDisplay()
    }
    else if (e.key == '-') {
        calculator.chooseOperation('-')
        calculator.updateDisplay()
    }
    else if (e.key == '*' || e.key == 'x') {
        calculator.chooseOperation('×')
        calculator.updateDisplay()
    }
    else if (e.key == '/') {
        calculator.chooseOperation('÷')
        calculator.updateDisplay()
    }
    else if (isFinite(e.key)) {
        calculator.appendNumber(e.key)
        calculator.compute(false)
        calculator.updateDisplay()
    }
    else if (e.key == '.') {
        calculator.appendNumber(e.key)
        calculator.compute(false)
        calculator.updateDisplay()
    }
    else if (e.key == '=' || e.key == 'Enter') {
        calculator.compute(true);
        calculator.updateDisplay();
    }
    else if (e.key == 'Escape' && isNavOpen) {
        closeNav()
    }
}

//----------------------------------------------------------------------------------------
// NAVIGATION MENU
const drop = document.getElementsByClassName('dropdown')
var i;
for (i = 0; i < drop.length; i++) {
    drop[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var panel = this.nextElementSibling
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
        } else {
            panel.style.maxHeight = '100%'
        }
    });
}

//----------------------------------------------------------------------------------------
// FUNCTIONS TO OPEN & CLOSE THE MENU
function openNav() {
    document.getElementById('menu').style.width = '100%'
    isNavOpen = true
}
function closeNav() {
    document.getElementById('menu').style.width = '0'
    const drop = document.getElementsByClassName('dropdown')
    for(let i = 0; i < drop.length; i++) {
        drop[i].classList.toggle('.exit')
        var panel = drop[i].nextElementSibling
        if(panel.style.maxHeight) {
            drop[i].classList.toggle('active')
            panel.style.maxHeight = null
        }
    }
    isNavOpen = false;
}