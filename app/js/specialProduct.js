import * as conFig from "./constants/config.js";
import * as callApi from "./utils/apiCaller.js";
function pending() {
    conFig.$(".special__product__main__loading").classList.add("loading");
}
function renderSpecialProduct(dataName) {
    //callapi + appendhtml
    const specialProductPm = new Promise((resolve, reject) => {
        callApi.httpGetAsync(dataName, resolve, reject, pending);
    });
    specialProductPm
        .then((res) => {
            let data = JSON.parse(res.response);
            if (data.length > 0) {
                let div = document.createElement("div");
                let dataArrtribute = `${dataName} special__product__container row`;
                div.setAttribute("class", dataArrtribute);
                let html = "";

                data.forEach((element) => {
                    html += `<div
            class="
                special__product__content
                col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3
            "
        >
            <div class="img-container">
                <img
                    src="${element.img}"
                    alt=""
                />
            </div>
            <div  class="img-content">
                <div class="img-description">
                    ${element.description}
                </div>
                <div class="img-price">${element.price.replace(
                    /đ||Đ/g,
                    ""
                )} <sup>đ</sup></div>
            </div>
        </div>`;
                });
                div.innerHTML = html;
                specialProductMain.insertBefore(
                    div,
                    specialProductMain.childNodes[0]
                );
            } else {
                let div = document.createElement("div");
                let dataArrtribute = `${dataName} special__product__container row`;
                div.setAttribute("class", dataArrtribute);
                let html = `<p class="empty">Không tìm thấy kết quả !<p>`;
                div.innerHTML = html;
                specialProductMain.insertBefore(
                    div,
                    specialProductMain.childNodes[0]
                );
            }
            setTimeout(() => {
                conFig
                    .$(".special__product__main__loading")
                    .classList.remove("loading");
            }, 200);
        })
        .catch((err) => {
            console.error(`lỗi không tìm thấy ${err}`);
        });
}
let fnIsRendered = function (list, item) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }
    return false;
};
let specialProductList = conFig.$(".special__product__list");
let specialProductItems = conFig.$$(".special__product__item");
let specialProductMain = document.getElementById("special__product__main");
var specialProductRendered = [];
var specialProductActive = "";
function onClickProductItem() {
    let dataName = this.dataset.name;
    let isRendered = fnIsRendered(specialProductRendered, dataName);
    if (specialProductActive !== dataName) {
        specialProductList
            .querySelector(".special__product__item.active")
            .classList.remove("active");
        this.classList.add("active");
    }
    if (isRendered === false) {
        //chưa render bao giờ
        renderSpecialProduct(dataName);
        specialProductRendered.push(dataName);

        if (specialProductActive !== "") {
            specialProductMain.getElementsByClassName(
                specialProductActive
            )[0].style.display = "none";
        }
        specialProductActive = dataName;
    } else {
        //đã từng render 1 lần
        if (dataName !== specialProductActive) {
            specialProductMain.getElementsByClassName(
                specialProductActive
            )[0].style.display = "none";
            specialProductMain.getElementsByClassName(
                dataName
            )[0].style.display = "block";
            specialProductActive = dataName;
        }
    }
}
specialProductItems.forEach((element, index) => {
    element.addEventListener("click", onClickProductItem);
});
specialProductItems[0].click();
