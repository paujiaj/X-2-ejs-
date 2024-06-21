const slideImage = document.querySelectorAll(".image");
const slideContainer = document.querySelector(".saved-div");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navDots = document.querySelector(".nav-dot");

let numberOfImage = slideImage.length;
let slideWidth = slideImage[0].clientWidth
let currentSlide = 0

// set up slider

function init() {
    slideImage.forEach((img, i) => {
        img.style.left = i * 100 + "%"
    })

    slideImage[0].classList.add("active")

    createNavDot()
}

init() 

// create nav dot

function createNavDot() {
    for (let i = 0; i < numberOfImage; i++) {
        const dot = document.createElement("div")
        dot.classList.add("single-dot")
        navDots.appendChild(dot)

        dot.addEventListener("click", () => {
            goToSlide(i)
        })
    }

    navDots.children[0].classList.add("active")
}

// next btn

nextBtn.addEventListener("click", () => {
    if(currentSlide >= numberOfImage - 1) {
        goToSlide(0)
        return
    }
    currentSlide++
    goToSlide(currentSlide)
})

// prev btn

prevBtn.addEventListener("click", () => {
    if(currentSlide <= 0) {
        goToSlide(numberOfImage - 1)
        return
    }
    currentSlide--
    goToSlide(currentSlide)
})

// go to slide

function goToSlide(slideNumber) {
    slideContainer.style.transform = "translateX(-" + slideWidth * slideNumber + "px)"

    currentSlide = slideNumber

    setActiveClass()
}

// set active class

function setActiveClass() {
    let currentActive = document.querySelector(".image.active")
    currentActive.classList.remove("active")
    slideImage[currentSlide].classList.add("active")

    // set active class for nav dot

    let currentDot = document.querySelector(".single-dot.active")
    currentDot.classList.remove("active")
    navDots.children[currentSlide].classList.add("active")
}

function openPopup() {
    document.getElementById("popup").style.display = "flex"
}

function closePopup() {
    document.getElementById('popup').style.display = 'none'
}

document.querySelectorAll('.image img').forEach(img => {
    img.addEventListener('click', function() {
        const imageUrl = img.src;
        document.getElementById('popup-img').src = imageUrl;
        document.getElementById('popup2').style.display = 'block';
    });
});

function closePopup2() {
    document.getElementById('popup2').style.display = 'none'
}