"use strict";
const sidebar = document.querySelector(".sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-links__link");
const mainBox = document.querySelector(".main-box");
const threeLine = document.querySelector(".header-top__box__item");
const categories = document.querySelector(".categories");
const settings = document.querySelector(".settings");
const news = document.querySelector(".news");

// const zIndexFunc = (sidebarEl) => {
//   if (
//     categories.className !== sidebarEl &&
//     settings.className !== sidebarEl &&
//     news.className === sidebarEl
//   ) {
//     news.classList.add("zIndex");
//     categories.classList.remove("zIndex");
//     settings.classList.remove("zIndex");
//     return "news";
//   }
//   if (
//     categories.className !== sidebarEl &&
//     settings.className === sidebarEl &&
//     news.className !== sidebarEl
//   ) {
//     settings.classList.add("zIndex");
//     news.classList.remove("zIndex");
//     categories.classList.remove("zIndex");
//     return "settings";
//   }

//   if (
//     categories.className === sidebarEl &&
//     settings.className !== sidebarEl &&
//     news.className !== sidebarEl
//   ) {
//     categories.classList.add("zIndex");
//     news.classList.remove("zIndex");
//     settings.classList.remove("zIndex");
//     return "categories";
//   }
// };

// Three Line On Click

let threeLineClickCount = 0;

threeLine.addEventListener("click", () => {
  threeLineClickCount++;

  if (threeLineClickCount % 2 !== 0) {
    sidebar.style.transform = "translateX(0)";
    mainBox.style.transform = "translateX(25%)";
    mainBox.style.width = "80%";
  } else {
    sidebar.style.transform = "translateX(-105%)";
    mainBox.style.transform = "translateX(0)";
    mainBox.style.width = "100%";
  }
});

// // Into  Sidebar

sidebarLinks.forEach((e, i) => {
  e.dataset.data = `${e.children[0].textContent}`;

  e.addEventListener("click", () => {
    if (!e.classList.contains("sidebar-active"))
      e.classList.add("sidebar-active");
    else e.classList.remove("sidebar-active");

    sidebarLinks.forEach((l) => {
      if (l.dataset.data !== e.dataset.data)
        l.classList.remove("sidebar-active");
      else l.classList.add("sidebar-active");
    });

    const sidebarEl = e.dataset.data.toLowerCase().trim();
    zIndexFunc(sidebarEl);
  });
});
// // Account And Product of Main Container

// const productAndAccount = document.querySelectorAll(".mains");

// productAndAccount.forEach((e, i)=>{

//     e.dataset.index = i+1;

//     e.addEventListener("click", (event)=>{

//         e.classList.add("main-active")

//         productAndAccount.forEach(l=>{
//             if(l.dataset!==e.dataset) l.classList.remove("main-active");
//             else l.classList.add("main-active")

//         })

//         if(+event.target.dataset.index!==2){
//             document.querySelector(".products").style.transform = "translateX(100%)"
//         } else{
//             document.querySelector(".products").style.transform = "translateX(0)"

//         }
//     })
// })

// // show only

// let newfirsClickCount = 0;
// let showonlyClickCount = 0;

// function mainBoxWidth() {

//     if((newfirsClickCount%2!==0) && (showonlyClickCount%2!==0)){
//     document.querySelector(".main-box").style.width = "calc(100% - 26rem)";
//     document.querySelector(".accounts").style.display = "block"
//     } else if((newfirsClickCount%2!==0) || (showonlyClickCount%2!==0)){
//     document.querySelector(".main-box").style.width = "calc(100% - 13rem)";
//     document.querySelector(".accounts").style.display = "block"
//     } else{
//     document.querySelector(".main-box").style.width = "100%";
//     document.querySelector(".accounts").style.display = "grid"
//     }
// }

// document.querySelector(".show-only").addEventListener("click", ()=>{
//     showonlyClickCount++
//     mainBoxWidth()

//     if(showonlyClickCount%2!==0 && newfirsClickCount%2!==0){
//         document.querySelector(".show-only-container").style.transform = "translateX(0)";
//         document.querySelector(".new-first-container").style.transform = "translateX(0)"
//     } else if(newfirsClickCount%2!==0 && showonlyClickCount%2===0){
//         document.querySelector(".show-only-container").style.transform = "translateX(150%)"
//         document.querySelector(".new-first-container").style.transform = "translateX(110%)"
//     } else if(showonlyClickCount%2!==0){
//         document.querySelector(".show-only-container").style.transform = "translateX(0)"
//     } else{
//         document.querySelector(".show-only-container").style.transform = "translateX(150%)"
//     }
// })

// document.querySelector(".new-first").addEventListener("click", ()=>{
//     newfirsClickCount++
//     mainBoxWidth()

//      if(newfirsClickCount%2!==0 && showonlyClickCount%2!==0){
//         document.querySelector(".new-first-container").style.transform = "translateX(0)"
//     }else if(newfirsClickCount%2!==0 && showonlyClickCount%2===0){
//         document.querySelector(".new-first-container").style.transform = "translateX(110%)"
//     } else{
//         document.querySelector(".new-first-container").style.transform = "translateX(350%)"
//     }
