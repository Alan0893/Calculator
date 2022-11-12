class Calculator {
    /**
     * @constructor
     * @param {*} unitElement1 top unit
     * @param {*} unitElement2 bottom unit
     */
    constructor(unitElement1, unitElement2, select1, select2) {
        this.unitElement1 = unitElement1
        this.unitElement2 = unitElement2
        this.selected = 0
        this.clear()
        this.convert(select1, select2)
        this.updateDisplay()
    }

    /**
     * @description Clears the calculator display
     */
    clear() {
        this.unit1 = '0'
        this.unit2 = '0'
    }

    /**
     * @description Deletes the previous character 
     */
    delete() {
        if(this.selected == 0) {
            if(this.unit1.length == 1 && this.unit1 == '0') return
            this.unit1 = this.unit1.toString().slice(0, -1)
        }
        else if(this.selected == 1) {
            if (this.unit2.length == 1 && this.unit2 == '0') return
            this.unit2 = this.unit2.toString().slice(0,-1)
        }
        else { return }
    }

    /**
     * @description Appends the number to the current unit
     * @param {String} number The number entered
     */
    appendNumber(number) {
        if(this.selected == 0) {
            if (number === '.' && this.unit1.includes('.')) return
            this.unit1 = this.unit1.toString() + number.toString()
        }
        else if(this.selected == 1) {
            if (number === '.' && this.unit2.includes('.')) return
            this.unit2 = this.unit2.toString() + number.toString()
        }
        else { return }
    }

    /**
     * @description Switches the selected unit
     */
    switchSelected() {
        this.selected = (this.selected+1)%2
    }

    /**
     * @description Converts the current unit
     */
    convert(select1, select2) {
        const un1 = select1.options[select1.selectedIndex].value.toLowerCase().replace(' ','_')
        const un2 = select2.options[select2.selectedIndex].value.toLowerCase().replace(' ', '_')
        const selected = this.selected
        var valNum = 0
        if(selected == 0) valNum = parseFloat(this.unit1)
        else if (selected == 1) valNum = parseFloat(this.unit2)
        else return

        var converted = {
            milliseconds: 0,
			seconds: 0, 
			minutes: 0,
			hours: 0,
			days: 0,
			weeks: 0
        }

        if(selected == 0) {
            if(un1 == "milliseconds") {
                converted.milliseconds = valNum
				converted.seconds = valNum / 1000
				converted.minutes = valNum / 60000
				converted.hours = valNum / 3600000
				converted.days = valNum / 86400000
				converted.weeks = valNum / 604800000
                this.unit2 = converted[un2]
            }   
            else if(un1 == "seconds") {
                converted.milliseconds = valNum * 1000
				converted.seconds = valNum
				converted.minutes = valNum / 60
				converted.hours = valNum / 3600
				converted.days = valNum / 86400
				converted.weeks = valNum / 604800
                this.unit2 = converted[un2]
            }
            else if(un1 == "minutes") {
                converted.milliseconds = valNum * 60000
				converted.seconds = valNum * 60
				converted.minutes = valNum 
				converted.hours = valNum / 60
				converted.days = valNum / 1440
				converted.weeks = valNum / 10080
                this.unit2 = converted[un2]
            }
            else if (un1 == "hours") {
                converted.milliseconds = valNum * 3600000
				converted.seconds = valNum * 3600
				converted.minutes = valNum * 60
				converted.hours = valNum
				converted.days = valNum / 24
				converted.weeks = valNum / 168
                this.unit2 = converted[un2]
            }
            else if (un1 == "days") {
                converted.milliseconds = valNum * 86400000
				converted.seconds = valNum * 86400
				converted.minutes = valNum * 1440
				converted.hours = valNum * 24
				converted.days = valNum
				converted.weeks = valNum / 7
                this.unit2 = converted[un2]
            }
            else if (un1 == "weeks") {
                converted.milliseconds = valNum * 604800000
				converted.seconds = valNum * 604800
				converted.minutes = valNum * 10080
				converted.hours = valNum * 168
				converted.days = valNum * 7
				converted.weeks = valNum
                this.unit2 = converted[un2]
            }
        }
        else if (selected == 1) {
			if (un2 == "milliseconds") {
				converted.milliseconds = valNum
				converted.seconds = valNum / 1000
				converted.minutes = valNum / 60000
				converted.hours = valNum / 3600000
				converted.days = valNum / 86400000
				converted.weeks = valNum / 604800000
				this.unit1 = converted[un1]
			}
			else if (un2 == "seconds") {
				converted.milliseconds = valNum * 1000
				converted.seconds = valNum
				converted.minutes = valNum / 60
				converted.hours = valNum / 3600
				converted.days = valNum / 86400
				converted.weeks = valNum / 604800
				this.unit1 = converted[un1]
			}
			else if (un2 == "minutes") {
				converted.milliseconds = valNum * 60000
				converted.seconds = valNum * 60
				converted.minutes = valNum
				converted.hours = valNum / 60
				converted.days = valNum / 1440
				converted.weeks = valNum / 10080
				this.unit1 = converted[un1]
			}
			else if (un2 == "hours") {
				converted.milliseconds = valNum * 3600000
				converted.seconds = valNum * 3600
				converted.minutes = valNum * 60
				converted.hours = valNum
				converted.days = valNum / 24
				converted.weeks = valNum / 168
				this.unit1 = converted[un1]
			}
			else if (un2 == "days") {
				converted.milliseconds = valNum * 86400000
				converted.seconds = valNum * 86400
				converted.minutes = valNum * 1440
				converted.hours = valNum * 24
				converted.days = valNum
				converted.weeks = valNum / 7
				this.unit1 = converted[un1]
			}
			else if (un2 == "weeks") {
				converted.milliseconds = valNum * 604800000
				converted.seconds = valNum * 604800
				converted.minutes = valNum * 10080
				converted.hours = valNum * 168
				converted.days = valNum * 7
				converted.weeks = valNum
				this.unit1 = converted[un1]
			}
        }
        else return
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
        this.unitElement1.innerText = this.getDisplayNumber(this.unit1)
        this.unitElement2.innerText = this.getDisplayNumber(this.unit2)
    }
}

//----------------------------------------------------------------------------------------
// FETCHING ALL DATA FROM index.html
const numberButtons         = document.querySelectorAll('[number]')
const unit1                 = document.querySelector('[unit1]')
const unit2                 = document.querySelector('[unit2]')
const deleteButton          = document.querySelector('[delete]')
const allClearButton        = document.querySelector('[all-clear]')
const caratButtons          = document.querySelectorAll('[carat]')
const homeButton            = document.querySelector('[home]')
const select1               = document.getElementById('select-units')
const select2               = document.getElementById('select-units2')
//----------------------------------------------------------------------------------------
const calc                  = document.querySelector('.calculator-grid');
const theme                 = document.querySelector('.theme');
//VARIABLE TO CHECK IF NAV IS OPENED
var isNavOpen               = false

//SETTING THE INITIAL VALUE OF SELECT MENU 2
select1.value = 'Milliseconds'
select2.value = 'Seconds'
//----------------------------------------------------------------------------------------
// CREATING A NEW CALCULATOR OBJECT
const calculator = new Calculator(unit1, unit2, select1, select2)

// NUMBER BUTTONS
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.convert(select1, select2)
        calculator.updateDisplay()
    })
})
// CLEAR BUTTON
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
// DELETE BUTTON
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.convert(select1, select2)
    calculator.updateDisplay()
})
// CARAT BUTTONS
caratButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.switchSelected()
    })
})
// HOME BUTTON
homeButton.addEventListener('click', () => {
    location.href = '/../options/select.html'
})
// SELECT MENU
select1.addEventListener('click', () => {
    calculator.convert(select1, select2)
    calculator.updateDisplay()
}) 
select2.addEventListener('click', () => {
    calculator.convert(select1, select2)
    calculator.updateDisplay()
})
document.addEventListener('click', () => {
    calculator.convert(select1, select2)
    calculator.updateDisplay()
})

//----------------------------------------------------------------------------------------
//SETTING THE DEFAULT THEME TO SYSTEM SETTING THEME
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
if (systemTheme.matches) {
    calc.classList.toggle('dark')
    theme.firstElementChild.className = "far fa-moon"
}
else { theme.firstElementChild.className = "far fa-sun" }

//----------------------------------------------------------------------------------------
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
        calculator.convert(select1, select2)
        calculator.updateDisplay()
    }
    else if (isFinite(e.key)) {
        calculator.appendNumber(e.key)
        calculator.convert(select1, select2)
        calculator.updateDisplay()
    }
    else if (e.key == '.') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    else if (e.key == '^' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        calculator.switchSelected()
        calculator.convert(select1, select2)
        calculator.updateDisplay()
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
    for (let i = 0; i < drop.length; i++) {
        drop[i].classList.toggle('.exit')
        var panel = drop[i].nextElementSibling
        if (panel.style.maxHeight) {
            drop[i].classList.toggle('active')
            panel.style.maxHeight = null
        }
    }
    isNavOpen = false;
}
