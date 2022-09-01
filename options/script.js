class Calculator {
    /**
     * @constructor
     * @param {*} info information on the button being hovered over
     */
    constructor(info) {
        this.info = info
    }

    /**
     * @description Clears the calculator display
     */
    clear() {
        this.info = ''
    }

    /**
     * @description Gets the text to display on the calculator
     * @param {String} text to display on calculator
     * @returns 
     */
    getDisplayText(text) {
        let textArr = [{
            name: 'Home',
            text: 'Returns to the home page.'
        }, {
            name: 'Area',
            text: 'Area Conversion Calculator'
        }, {
            name: 'Length',
            text: 'Length Conversion Calculator'
        }, {
            name: 'Temp.',
            text: 'Temperature Conversion Calculator'
        }, {
            name: 'Volume',
            text: 'Volume Conversion Calculator'
        }, {
            name: 'Mass',
            text: 'Mass Conversion Calculator'
        }, {
            name: 'Data',
            text: 'Data Conversion Calculator'
        }, {
            name: 'Speed',
            text: 'Speed Conversion Calculator'
        }, {
            name: 'Time',
            text: 'Time Conversion Calculator'
        }, {
            name: '-',
            text: 'Not Available'
        }]
        let pos = textArr.map(t => t.name == text.toString()).indexOf(true)

        if (pos == -1) return
        return textArr[pos].text
    }

    /**
     * @description Updates the display of the calculator
     * @param {String} text to display on calculator
     */
    updateDisplay(text) {
        const info = document.getElementById('para')
        info.innerHTML = this.getDisplayText(text)
    }
}

//----------------------------------------------------------------------------------------
// FETCHING ALL DATA FROM index.html
const optionButtons     = document.querySelectorAll('[option]')
const info              = document.querySelector('[data-description]')
const home              = document.getElementById('home')
const area              = document.getElementById('area')
const length            = document.getElementById('length')
const temp              = document.getElementById('temp')
const volume            = document.getElementById('volume')
const mass              = document.getElementById('mass')
const data              = document.getElementById('data')
const speed             = document.getElementById('speed')
const time              = document.getElementById('time')
//----------------------------------------------------------------------------------------
const calc = document.querySelector('.calculator-grid');
const theme = document.querySelector('.theme');
//VARIABLE TO CHECK IF NAV IS OPENED
var isNavOpen           = false;

//----------------------------------------------------------------------------------------
// CREATING A NEW CALCULATOR OBJECT
const calculator = new Calculator(info)

//ON BUTTON CLICK - REDIRECT
home.addEventListener('click', () => {
    location.href = '../index.html'
})
area.addEventListener('click', () => {
    location.href = '../conversions/area/index.html'
})
length.addEventListener('click', () => {
    location.href = '../conversions/length/index.html'
})
temp.addEventListener('click', () => {
    location.href = '../conversions/temperature/index.html'
})
volume.addEventListener('click', () => {
    location.href = '../conversions/volume/index.html'
})
mass.addEventListener('click', () => {
    location.href = '../conversions/mass/index.html'
})
data.addEventListener('click', () => {
    location.href = '../conversions/data/index.html'
})
speed.addEventListener('click', () => {
    location.href = '../conversions/speed/index.html'
})
time.addEventListener('click', () => {
    location.href = '../conversions/time/index.html'
})

// OPTION BUTTONS - HOVER
optionButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        calculator.updateDisplay(button.innerText)
    })
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
    if (e.key == 'Escape' && isNavOpen) {
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