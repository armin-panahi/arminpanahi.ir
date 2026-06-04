'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute("name").toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute("name").toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.getAttribute("name").toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker Registered"));
}







/* =========================
   Animated Programming Background
========================= */
const canvas = document.getElementById("code-bg");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const particleColor = "#ffdb70";

const particles = [];
const symbols = [];

const symbolChars = [
  "{}",
  "</>",
  "()",
  "[]",
  "=>",
  "const",
  "let",
  "function"
];

class Particle{
  constructor(){
    this.reset();
  }

  reset(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;

    this.radius = Math.random() * 2 + 1;
  }

  update(){

    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0 || this.x > w)
      this.vx *= -1;

    if(this.y < 0 || this.y > h)
      this.vy *= -1;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

    ctx.fillStyle = "rgba(255,219,112,.8)";
    ctx.fill();
  }
}

class FloatingSymbol{

  constructor(){
    this.reset();
  }

  reset(){

    this.text =
      symbolChars[
        Math.floor(
          Math.random()*symbolChars.length
        )
      ];

    this.x = Math.random()*w;
    this.y = h + 50;

    this.speed =
      Math.random()*0.3 + 0.1;

    this.opacity =
      Math.random()*0.08 + 0.03;

    this.size =
      Math.random()*18 + 14;
  }

  update(){

    this.y -= this.speed;

    if(this.y < -100){
      this.reset();
      this.y = h + 50;
    }
  }

  draw(){

    ctx.font =
      `${this.size}px monospace`;

    ctx.fillStyle =
      `rgba(255,219,112,${this.opacity})`;

    ctx.fillText(
      this.text,
      this.x,
      this.y
    );
  }
}

for(let i=0;i<120;i++){
  particles.push(
    new Particle()
  );
}

for(let i=0;i<15;i++){
  symbols.push(
    new FloatingSymbol()
  );
}

function drawConnections(){

  for(let i=0;i<particles.length;i++){

    for(let j=i+1;j<particles.length;j++){

      const dx =
        particles[i].x -
        particles[j].x;

      const dy =
        particles[i].y -
        particles[j].y;

      const dist =
        Math.sqrt(dx*dx+dy*dy);

      if(dist < 140){

        ctx.beginPath();

        ctx.moveTo(
          particles[i].x,
          particles[i].y
        );

        ctx.lineTo(
          particles[j].x,
          particles[j].y
        );

        ctx.strokeStyle =
          `rgba(255,219,112,${
            (140-dist)/140 * 0.08
          })`;

        ctx.stroke();
      }
    }
  }
}

function animate(){

  ctx.clearRect(0,0,w,h);

  drawConnections();

  particles.forEach(p=>{
    p.update();
    p.draw();
  });

  symbols.forEach(s=>{
    s.update();
    s.draw();
  });

  requestAnimationFrame(
    animate
  );
}

animate();

window.addEventListener(
  "resize",
  ()=>{
    w = canvas.width =
      window.innerWidth;

    h = canvas.height =
      window.innerHeight;
  }
);

const glow =
document.getElementById("cursor-glow");

document.addEventListener(
"mousemove",
e => {

  glow.style.left =
  e.clientX + "px";

  glow.style.top =
  e.clientY + "px";
});

