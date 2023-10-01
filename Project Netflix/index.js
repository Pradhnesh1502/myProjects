const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});


carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    
    
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);



const carousel1 = document.querySelector(".carousel1");
const firstCard = carousel1.querySelector(".card1").offsetWidth;
const carouselChild = [...carousel1.children];

let isDragg = false,  startx, startScrollLft;
let cardView = Math.round(carousel1.offsetWidth / firstCard);

carouselChild.slice(-cardView).reverse().forEach(card => {
    carousel1.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChild.slice(0, cardView).forEach(card => {
    carousel1.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel1.classList.add("no-transition");
carousel1.scrollLeft = carousel1.offsetWidth;
carousel1.classList.remove("no-transition");

const dragSt=(e)=>{
    isDragg = true;
    carousel1.classList.add("dragging");
    
    startx = e.pageX;
    startScrollLft = carousel1.scrollLeft;
}
const dragg = (e) => {
    if(!isDragg) return; 
    carousel1.scrollLeft = startScrollLft - (e.pageX - startx);
}
const dragStp = () => {
    isDragg = false;
    carousel1.classList.remove("dragging");
}
const infiScroll = () => {
    
    if(carousel1.scrollLeft === 0) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.scrollWidth - (2 * carousel1.offsetWidth);
        carousel1.classList.remove("no-transition");
    }
    
    else if(Math.ceil(carousel1.scrollLeft) === carousel1.scrollWidth - carousel1.offsetWidth) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.offsetWidth;
        carousel1.classList.remove("no-transition");
    }
    
    
}
carousel1.addEventListener("mousedown", dragSt);
carousel1.addEventListener("mousemove", dragg);
document.addEventListener("mouseup", dragStp);
carousel1.addEventListener("scroll", infiScroll);