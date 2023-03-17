import * as flsFunction from './modules/functions.js'

flsFunction.isWebp()

const main = document.querySelector(".main")
const header = document.querySelector(".header")
const burger = document.querySelector(".burger")
const navbar = document.querySelector(".nav")


let lastKnownScrollPosition = 0;
let ticking = false;
let scrollY = 0


function doSomething(scrollPos) {

    if (scrollPos - scrollY > 200) {
        header.style.top = "-200px"
        scrollY = scrollPos
    }

    if (scrollPos - scrollY < 0) {
        header.style.top = "0"
        scrollY = scrollPos
    }

}

document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});


(async function () {
    await fetch("/files/data.json")
        .then((res) => res.json())
        .then(data => (
            main.innerHTML = data.map(item => (`
            <div class="container-post">
                <picture>
                    <source srcset=${item.src}.webp type="image/webp">
                    <img src=${item.src}.webp>
                </picture>
                <span class="type-text">${item.type}</span>
                <h2 class="title-text">${item.title}</h2>
                <p class="text-inform">
                    <span class="text-name">${item.name}</span>
                    <span>${item.dey}</span>
                    <span>${item.view}</span>
                </P>
                <p class="text-post">${item.text}</p>
            </div>`
            )
            ).join('')
        )
        )
})()

let isBurger = true

burger.addEventListener('click', () => {
    isBurger = !isBurger
    if (isBurger) {
        burger.classList.remove("open-burger")
        document.body.style.overflow = "auto"
        navbar.classList.add("close")
    }
    if (!isBurger) {
        burger.classList.add("open-burger")
        document.body.style.overflow = "hidden"
        navbar.classList.remove("close")
    }

})

