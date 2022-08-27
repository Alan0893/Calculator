class Calculator {
    /**
     * @constructor
     * @param {*} unitElement1 top unit
     * @param {*} unitElement2 bottom unit
     */
    constructor(unitElement1, unitElement2) {
        this.unitElement1 = unitElement1
        this.unitElement2 = unitElement2
        this.selected = 0
        this.clear()
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
    //console.log(select1.options[select1.selectedIndex].value)
    convert(select1, select2) {
        const un1 = select1.options[select1.selectedIndex].value.toLowerCase().replace(' ','_')
        const un2 = select2.options[select2.selectedIndex].value.toLowerCase().replace(' ', '_')
        const selected = this.selected
        var valNum = 0
        if(selected == 0) valNum = parseFloat(this.unit1)
        else if (selected == 1) valNum = parseFloat(this.unit2)
        else return

        var converted = {
            acres: 0,
            ares: 0,
            hectares: 0,
            square_centimeters: 0,
            square_feet: 0,
            square_inches: 0,
            square_meters: 0
        }

        if(selected == 0) {
            if(un1 == "acres") {
                converted.acres = valNum 
                converted.ares = valNum * 40.4686
                converted.hectares = valNum / 2.471
                converted.square_centimeters = valNum * 40468564.224
                converted.square_feet = valNum * 43560
                converted.square_inches = valNum * 6272640
                converted.square_meters = valNum * 4047
                this.unit2 = converted[un2]
            }   
            else if(un1 == "ares") {
                converted.acres = valNum / 40.469
                converted.ares = valNum
                converted.hectares = valNum / 100
                converted.square_centimeters = valNum * 1000000
                converted.square_feet = valNum * 1076.391042
                converted.square_inches = valNum * 6272640
                converted.square_meters = valNum * 100
                this.unit2 = converted[un2]
            }
            else if(un1 == "hectares") {
                converted.acres = valNum * 2.4711
                converted.ares = valNum * 100
                converted.hectares = valNum
                converted.square_centimeters = valNum * 100000000
                converted.square_feet = valNum * 107639.1042
                converted.square_inches = valNum * 15500031.000062
                converted.square_meters = valNum * 10000
                this.unit2 = converted[un2]
            }
            else if(un1 == "square_centimeters") {
                converted.acres = valNum * 0.000000024711
                converted.ares = valNum / 1000000
                converted.hectares = valNum / 100000000
                converted.square_centimeters = valNum 
                converted.square_feet = valNum * 0.001076391 
                converted.square_inches = valNum * 0.15500031
                converted.square_meters = valNum * 0.0001
                this.unit2 = converted[un2]
            }
            else if(un1 == "square_feet") {
                converted.acres = valNum / 43560
                converted.ares = valNum / 1076
                converted.hectares = valNum * 0.00000929
                converted.square_centimeters = valNum * 929.0304
                converted.square_feet = valNum
                converted.square_inches = valNum * 144
                converted.square_meters = valNum / 10.764
                this.unit2 = converted[un2]
            }
            else if(un1 == "square_inches") {
                converted.acres = valNum / 6273000
                converted.ares = valNum / 155000
                converted.hectares = valNum / 15500000
                converted.square_centimeters = valNum * 6.4516
                converted.square_feet = valNum / 144
                converted.square_inches = valNum
                converted.square_meters = valNum / 1550
                this.unit2 = converted[un2]
            }
            else if(un1 == "square_meters") {
                converted.acres = valNum / 4047
                converted.ares = valNum / 100
                converted.hectares = valNum / 10000
                converted.square_centimeters = valNum * 10000
                converted.square_feet = valNum * 10.764
                converted.square_inches = valNum * 1550
                converted.square_meters = valNum
                this.unit2 = converted[un2]
            }
        }
        else if (selected == 1) {
            if (un2 == "acres") {
                converted.acres = valNum
                converted.ares = valNum * 40.4686
                converted.hectares = valNum / 2.471
                converted.square_centimeters = valNum * 40468564.224
                converted.square_feet = valNum * 43560
                converted.square_inches = valNum * 6272640
                converted.square_meters = valNum * 4047
                this.unit1 = converted[un1]
            }
            else if (un2 == "ares") {
                converted.acres = valNum / 40.469
                converted.ares = valNum
                converted.hectares = valNum / 100
                converted.square_centimeters = valNum * 1000000
                converted.square_feet = valNum * 1076.391042
                converted.square_inches = valNum * 6272640
                converted.square_meters = valNum * 100
                this.unit1 = converted[un1]
            }
            else if (un2 == "hectares") {
                converted.acres = valNum * 2.4711
                converted.ares = valNum * 100
                converted.hectares = valNum
                converted.square_centimeters = valNum * 100000000
                converted.square_feet = valNum * 107639.1042
                converted.square_inches = valNum * 15500031.000062
                converted.square_meters = valNum * 10000
                this.unit1 = converted[un1]
            }
            else if (un2 == "square_centimeters") {
                converted.acres = valNum * 0.000000024711
                converted.ares = valNum / 1000000
                converted.hectares = valNum / 100000000
                converted.square_centimeters = valNum
                converted.square_feet = valNum * 0.001076391
                converted.square_inches = valNum * 0.15500031
                converted.square_meters = valNum * 0.0001
                this.unit1 = converted[un1]
            }
            else if (un2 == "square_feet") {
                converted.acres = valNum / 43560
                converted.ares = valNum / 1076
                converted.hectares = valNum * 0.00000929
                converted.square_centimeters = valNum * 929.0304
                converted.square_feet = valNum
                converted.square_inches = valNum * 144
                converted.square_meters = valNum / 10.764
                this.unit1 = converted[un1]
            }
            else if (un2 == "square_inches") {
                converted.acres = valNum / 6273000
                converted.ares = valNum / 155000
                converted.hectares = valNum / 15500000
                converted.square_centimeters = valNum * 6.4516
                converted.square_feet = valNum / 144
                converted.square_inches = valNum
                converted.square_meters = valNum / 1550
                this.unit1 = converted[un1]
            }
            else if (un2 == "square_meters") {
                converted.acres = valNum / 4047
                converted.ares = valNum / 100
                converted.hectares = valNum / 10000
                converted.square_centimeters = valNum * 10000
                converted.square_feet = valNum * 10.764
                converted.square_inches = valNum * 1550
                converted.square_meters = valNum
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
select2.value = 'Ares'
//----------------------------------------------------------------------------------------
// CREATING A NEW CALCULATOR OBJECT
const calculator = new Calculator(unit1, unit2)

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
        calculator.updateDisplay()
    }
    else if (isFinite(e.key)) {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    else if (e.key == '.') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    else if (e.key == '^' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        calculator.switchSelected()
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
