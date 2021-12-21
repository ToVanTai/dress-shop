import * as conFig from "./constants/config.js";
import * as callApi from "./utils/apiCaller.js";
const newPromise = new Promise((resolve, reject) => {
    callApi.httpGetAsync("news", resolve, reject);
});
newPromise
    .then((data) => {
        let dataParse = JSON.parse(data.response);
        if (dataParse != null && dataParse.length > 0) {
            let newsContainer = conFig.$(".news__container");
            for (let i = 0; i < dataParse.length; i++) {
                let div = document.createElement("div");
                div.setAttribute(
                    "class",
                    "news__container__item col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
                );
                div.innerHTML += `<div class="news__container__item__img">
                <img src="${dataParse[i].img}" alt="" />
            </div>
            <div class="news__container__item__content">
                <div class="news__container__item__content__title">
                    <b
                        >${dataParse[i].title}</b
                    >
                </div>
                <div class="news__container__item__content__article">
                    <div class="date-time">
                        <i class="bx bxs-calendar"></i>
                        <p>${dataParse[i].created_at}</p>
                    </div>
                    <div class="poster">
                        <i class="bx bxs-user"></i>
                        <p>${dataParse[i].poster}</p>
                    </div>
                    <div class="comment">
                        <i class="bx bxs-message-rounded-dots"></i>
                        <p>${dataParse[i].coment_quantity}</p>
                    </div>
                </div>
                <div
                    class="news__container__item__content__description"
                >
                    <p>
                    ${dataParse[i].description}
                    </p>
                </div>
            </div>`;
                newsContainer.insertBefore(div, newsContainer.childNodes[0]);
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
