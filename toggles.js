/*
<!-----------------------------------------------HTML----------------------------------------------->
<!--GITHUB TOGGLE-->
<div class="github">
    <i class="fa-brands fa-github"></i>
</div>

<!--INFO TOGGLE-->
<div class="info">
    <i class="fa-solid fa-info"></i>
    <span class="extra-info">
        <h4>Coded by: Alan</h4>
        <p>
            With the ability to solve basic mathematical operations, this calculator was coded
            using a combination of HTML, CSS, & JavaScript.
            <br>
            <i class="fa-brands fa-html5"></i>
            <i class="fa-brands fa-css3"></i>
            <i class="fa-brands fa-js-square"></i>
        </p>
    </span>
</div>
*/

/*
//-----------------------------------------------JAVASCRIPT-----------------------------------------------
const github = document.querySelector('.github');

// GITHUB TOGGLE
github.addEventListener('click', () => {
    location.href = 'https://github.com/Alan0893/Calculator'
})
*/

/*
//-----------------------------------------------CSS-----------------------------------------------
GITHUB TOGGLE
.github {
    width: 3.75rem;
    height: 3.75rem;
    background-color: #eee8e1;
    position: absolute;
    top: 5.5rem;
    right: 1rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
}
GITHUB ICON
.github i {
    font-size: 2.9rem;
    color: #777;
    position: absolute;
}
DARK MODE GITHUB TOGGLE
.dark .github {
    background-color: #464646;
}

INFO TOGGLE
.info {
    width: 3.75rem;
    height: 3.75rem;
    background-color: #eee8e1;
    position: absolute;
    top: 10rem;
    right: 1rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
}
INFO ICON
.info i {
    font-size: 2.5rem;
    color: #777;
    position: inherit;
}
DARK MODE INFO TOGGLE
.calculator-grid.dark .info {
    background-color: #464646;
}
INFO TOGGLE HOVER
.info:hover {
    background-color: white;
    width: 175px;
    height: 200px;
    text-align: left !important;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
}

EXTRA INFO TOGGLE
.extra-info {
    display: none;
    line-height: 20px;
    font-size: 18px;
    font-family: verdana;
    position: absolute;
    top: 0;
    left: 50px;
}
EXTRA INFO TEXT
.calculator-grid.dark .extra-info {
    color: white;
}
EXTRA INFO HOVER
.info:hover .extra-info {
    display: inline-block;
}
*/