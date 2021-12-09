import * as conFig from "./constants/config.js";
import * as callApi from "./utils/apiCaller.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";
const swiperPromise = new Promise((resolve, reject) => {
    callApi.httpGetAsync("newArrivals", resolve, reject);
});
swiperPromise.then((data) => {
    let dataParse = JSON.parse(data.response);
    let mySwiperWrapper = conFig.$(".my-swiper-wrapper");
    for (let i = 0; i < dataParse.length; i++) {
        mySwiperWrapper.innerHTML += `<div class="swiper-slide">
        <div class="swiper-slide-content">
            <img src="${dataParse[i].img}" alt="" />
            <div class="swiper-slide-content-main">
            <a>Xem sản phẩm</a>
            </div>
        </div>
    </div>`;
    }
    const swiper = new Swiper(".swiper", {
        loop: true,
        // autoplay: {
        //     delay: 2000,
        // },
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
        },
    });
    // prevent default
    let newArrivalsLinks = conFig.$$(".new__arrivals a");
    function preventLink(event) {
        event.preventDefault();
    }
    for (let i = 0; i < newArrivalsLinks.length; i++) {
        newArrivalsLinks[i].addEventListener("click", preventLink);
    }
});
