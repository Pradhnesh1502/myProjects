const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
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

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
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
    
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


let main=document.querySelectorAll('main')

window.onscroll = () => {
    main.forEach(main => {
        let top = window.scrollY;
        let offset = main.offsetTop - 150;
        let height = main.offsetHeight;

        if(top >= offset && top < offset + height){
            main.classList.add('show-animate');
        }
        else{
            main.classList.remove('show-animate');
            
        }
      })
}

const allPosts= [
    {
        title:"100% Offers in more than 100 restaurants and lot more !",
        label:"Only On Zomato !!!",
        thumbnail:"Images/pic1.png",
        summary: "",
        link: "#"
    },
    {
        title:"Khalid's Biriyani",
        label:"3.6⭐",
        thumbnail:"Images/res1.png",
        summary: "Biriyani, Chinese  Rs 250 for one",
        link: "#"
    },
    {
        title:"Chai Kings",
        label:"4.2⭐",
        thumbnail:"Images/res2.png",
        summary: "Tea, Shake, Beverages Rs 250 for one",
        link: "#"
    },
    {
        title:"KFC",
        label:"4.8⭐",
        thumbnail:"Images/res3.png",
        summary: "Burger, Fast Food Rs 250 for one",
        link: "#"
    },
    {
        title:"Domino's Pizza",
        label:"4.5⭐",
        thumbnail:"Images/res4.png",
        summary: "Pizza, Italian, Pasta, Fast Food Rs 300 for one",
        link: "#"
    },

];

const blogPostsContainer=document.querySelector(".blog-posts-container");

const generatePostsHTML=() =>{
             allPosts.forEach((p) => {
                const HTML = `<div class="thumbnail">
                <img src="${p.thumbnail}" alt="">
            </div>
            <div class="text-content">
                <div class="label">${p.label}</div>
                <h3 class="post-title">
                   ${p.title}
                </h3>
                <div class="summary">
                    ${p.summary}
                </div>
                <a class="read-more-btn" href="${p.link}">Read more...</a>
            </div>`;

            const blogPost=document.createElement("div");
            blogPost.classList.add("blog-post");
            blogPost.innerHTML=HTML;

            blogPostsContainer.appendChild(blogPost);

             });
};
generatePostsHTML();