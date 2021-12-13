import * as conFig from "./constants/config.js";
// onload
function headerShowOnLoad() {
    let header = conFig.$("#header");
    setTimeout(() => {
        header.classList.add("active");
    }, 200);
    setTimeout(() => {
        conFig.$(".header__main__item").classList.add("active");
    }, 1200);
}
window.addEventListener("load", headerShowOnLoad);
window.addEventListener("load", preventLinks);
function preventLinks() {
    let links = document.getElementsByTagName("a");
    function preventLink(event) {
        event.preventDefault();
    }
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", preventLink);
    }
}

let headerMobileProcess = conFig.$(".header__mobile__process");
let layoutOverlayMobile = conFig.$(".layout-overlay-mobile");
let menuMobileContainer = conFig.$(".menu__mobile__container");
let menuMobileClose = conFig.$(".menu__mobile__close");
let menuMobileItem = conFig.$$(".menu__mobile__item");
// toggle menu
let openMobileNav = function () {
    layoutOverlayMobile.classList.add("active");
    menuMobileContainer.classList.add("active");
};
let closeMobileNav = function () {
    layoutOverlayMobile.classList.remove("active");
    menuMobileContainer.classList.remove("active");
};
headerMobileProcess.addEventListener("click", openMobileNav);
layoutOverlayMobile.addEventListener("click", closeMobileNav);
menuMobileClose.addEventListener("click", closeMobileNav);
menuMobileItem.forEach((element) => {
    element.addEventListener("click", closeMobileNav);
});
// sticky menu
var positionHeader = 0;
let header = conFig.$("#header");
function stickyHeader() {
    let mobileCart = conFig.$(".cart__mobile__container");
    if (
        document.body.scrollTop > positionHeader ||
        document.documentElement.scrollTop > positionHeader
    ) {
        header.classList.add("scroll_bottom");
        mobileCart.classList.remove("active");
    } else {
        header.classList.remove("scroll_bottom");
    }
    positionHeader =
        document.body.scrollTop || document.documentElement.scrollTop;
}
window.addEventListener("scroll", stickyHeader);

// data cart

// header cart
let dataProduct = function (data, resolve, reject) {
    let result = JSON.parse(localStorage.getItem(data));
    resolve(result);
};
let dataCartPromise = new Promise((resolve, reject) => {
    dataProduct("products-cart", resolve, reject);
});
dataCartPromise
    .then((data) => {
        // cap nhat so luong product khi vua vào web.
        let updateQuantiy = function () {
            let dataString = localStorage.getItem("products-cart");
            let elmQuantityCart = conFig.$(".header__cart .cart-icon p");
            let elmQuantityCartMobile = conFig.$(
                ".header__mobile__cart .quantity"
            );
            if (dataString == "") {
                elmQuantityCart.innerHTML = 0;
                elmQuantityCartMobile.innerHTML = 0;
            } else {
                let dataArray = JSON.parse(dataString);
                elmQuantityCart.innerHTML = dataArray.length;
                elmQuantityCartMobile.innerHTML = dataArray.length;
            }
        };
        // render cart desktop
        let renderCartDesktop = function () {
            let dataString = localStorage.getItem("products-cart");
            let elmCartContainerList = conFig.$(".cart__container__list");
            elmCartContainerList.innerHTML = "";
            if (dataString == "") {
                elmCartContainerList.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
            } else {
                data = JSON.parse(dataString);
                if (data.length == 0) {
                    elmCartContainerList.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
                }
                for (let i = 0; i < data.length; i++) {
                    elmCartContainerList.innerHTML += `
                <li class="cart__container__item">
                    <a href="#" class="cart__container__item__img"><img src="${data[i].img}" alt="" /></a>
                    <div class="cart__container__item__content">
                        <p>${data[i].title}</p>
                        <div
                            class="cart__container__item__content__detail">
                            <b class="cart__container__item__content__detail__price">${data[i].price}
                                <span class="quantity">x${data[i].quantity}</span>
                            </b>
                            <p class="cart__container__item__content__detail__size">kích cỡ ${data[i].size}, màu sắc
                            </p>
                            <span class="cart__container__item__content__detail__color" style="background-color: ${data[i].color}"></span>
                        </div>
                        </div>
                    <div class="cart__container__item__delete" data-delete="${data[i].idProductCart}">Xóa</div>
                </li>`;
                }
            }
            // add sk cho nut xoa
            onDeleteProductsInCart();
        };
        let renderCartMobile = function () {
            let dataString = localStorage.getItem("products-cart");
            let elmCartMobileContainerList = conFig.$(
                ".cart__mobile__container__list"
            );
            elmCartMobileContainerList.innerHTML = "";
            if (dataString == "") {
                elmCartMobileContainerList.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
            } else {
                data = JSON.parse(dataString);
                if (data.length == 0) {
                    elmCartMobileContainerList.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
                }
                for (let i = 0; i < data.length; i++) {
                    elmCartMobileContainerList.innerHTML += `
                <li class="cart__mobile__container__item">
                    <a href="#" class="cart__mobile__container__item__img"><img src="${data[i].img}" alt="" /></a>
                    <div class="cart__mobile__container__item__content">
                        <p>${data[i].title}</p>
                        <div
                            class="cart__mobile__container__item__content__detail">
                            <span class="price">${data[i].price}x${data[i].quantity}</span>
                            <span class="size">kích cỡ ${data[i].size},</span>
                            <span>màu sắc</span>
                            <span class="color" style="background-color: ${data[i].color}"></span>
                            
                        </div>
                        </div>
                    <div class="cart__mobile__container__item__delete" data-delete="${data[i].idProductCart}">Xóa</div>
                </li>`;
                }
            }
            // console.log("")
            // add sk cho nut xoa
            onDeleteProductsInCartMobile();
        };
        // khi vừa vào trang web cap nhat so lương product+ render cart desktop
        updateQuantiy();
        renderCartDesktop();
        renderCartMobile();
        // open close cart desktop
        function findIndexProductDelete(myArr, myId) {
            for (let i = 0; i < myArr.length; i++) {
                if (myArr[i].idProductCart == myId) {
                    return i;
                    break;
                }
            }
            return -1;
        }
        function onDeleteProductsInCart() {
            let cartDeletesBtn = conFig.$$(".cart__container__item__delete");
            for (let i = 0; i < cartDeletesBtn.length; i++) {
                cartDeletesBtn[i].onclick = function () {
                    let dataStringProductDeletes =
                        localStorage.getItem("products-cart");
                    if (dataStringProductDeletes == "") {
                    } else {
                        let dataProductDeletes = JSON.parse(
                            dataStringProductDeletes
                        );
                        let dataDelete = this.dataset.delete;
                        let indexProductDelete = findIndexProductDelete(
                            dataProductDeletes,
                            dataDelete
                        );
                        dataProductDeletes.splice(indexProductDelete, 1);
                        localStorage.setItem(
                            "products-cart",
                            JSON.stringify(dataProductDeletes)
                        );
                        let elmQuantityCart = conFig.$(
                            ".header__cart .cart-icon p"
                        );
                        elmQuantityCart.innerHTML =
                            elmQuantityCart.innerHTML * 1 - 1;
                        let elmCartContainerList = conFig.$(
                            ".cart__container__list"
                        );
                        if (elmQuantityCart.innerHTML == 0) {
                            elmCartContainerList.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
                        } else {
                            this.parentNode.style.display = "none";
                        }
                    }
                };
            }
        }
        function onDeleteProductsInCartMobile() {
            let cartDeletesBtnMobile = conFig.$$(
                ".cart__mobile__container__item__delete"
            );
            for (let i = 0; i < cartDeletesBtnMobile.length; i++) {
                cartDeletesBtnMobile[i].onclick = function () {
                    let dataStringProductDeletesMobile =
                        localStorage.getItem("products-cart");
                    if (dataStringProductDeletesMobile == "") {
                    } else {
                        let dataProductDeletesMobile = JSON.parse(
                            dataStringProductDeletesMobile
                        );
                        let dataDeleteMobile = this.dataset.delete;
                        let indexProductDeleteMobile = findIndexProductDelete(
                            dataProductDeletesMobile,
                            dataDeleteMobile
                        );
                        dataProductDeletesMobile.splice(
                            indexProductDeleteMobile,
                            1
                        );
                        localStorage.setItem(
                            "products-cart",
                            JSON.stringify(dataProductDeletesMobile)
                        );
                        let elmQuantityCartMobile = conFig.$(
                            ".header__mobile__cart .quantity"
                        );
                        elmQuantityCartMobile.innerHTML =
                            elmQuantityCartMobile.innerHTML * 1 - 1;
                        let elmCartContainerListMobile = conFig.$(
                            ".cart__mobile__container__list"
                        );
                        if (elmQuantityCartMobile.innerHTML == 0) {
                            elmCartContainerListMobile.innerHTML = `<p class="cart-empty">Không có sản phẩm</p>`;
                        } else {
                            this.parentNode.style.display = "none";
                        }
                    }
                };
            }
        }
        let elmHeaderCart = conFig.$(".header__cart");
        elmHeaderCart.addEventListener("mouseleave", renderCartDesktop);
        let elmHeaderCartMobile = conFig.$(".header__mobile__cart");
        elmHeaderCartMobile.addEventListener("click", renderCartMobile);
        let toggleCartMobile = function () {
            conFig.$(".cart__mobile__container").classList.toggle("active");
        };
        elmHeaderCartMobile.addEventListener("click", toggleCartMobile);

        // end render cart
    })
    .catch(() => {});
