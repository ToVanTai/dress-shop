import * as conFig from "./constants/config.js";
import * as callApi from "./utils/apiCaller.js";
const sliderPromise = new Promise((resolve, reject) => {
    callApi.httpGetAsync("home-slider", resolve, reject);
});

sliderPromise
    .then((data) => {
        let slidesContainer = conFig.$(".slider__container");
        slidesContainer.innerHTML = "";
        let innerHTMLSliderContainer = "";
        let renderHTML = function (mydata) {
            for (let i = 0; i < mydata.length; i++) {
                let sizesHtml = "";
                for (let j = 0; j < mydata[i].sizes.length; j++) {
                    if (j === 0) {
                        sizesHtml += `<span data-size="${mydata[i].sizes[j].size}" class="active">${mydata[i].sizes[j].size}</span>`;
                    } else {
                        sizesHtml += `<span data-size="${mydata[i].sizes[j].size}" >${mydata[i].sizes[j].size}</span>`;
                    }
                }
                let colorsHtml = "";
                for (let j = 0; j < mydata[i].colors.length; j++) {
                    if (j === 0) {
                        colorsHtml += `<span
                        style="background-color: ${mydata[i].colors[j].color}"
                        class="active"
                        data-color = "${mydata[i].colors[j].color}"
                    ></span>`;
                    } else {
                        colorsHtml += `<span
                        style="background-color: ${mydata[i].colors[j].color}"
                        data-color = "${mydata[i].colors[j].color}"
                    ></span>`;
                    }
                }
                innerHTMLSliderContainer += `<div class="slider__container__slide">
            <div class="slide__left">
                <h2
                    class="slide__left__title"
                    style="-webkit-text-stroke-color: ${mydata[i].mainColor}"
                >
                    ${mydata[i].name}
                </h2>
                <div class="slide__left__size">
                    <p>kích cỡ</p>
                    <div>
                        ${sizesHtml}
                    </div>
                </div>
                <div class="slide__left__color">
                    <p>màu sắc</p>
                    <div>
                        ${colorsHtml}
                    </div>
                </div>
                <div class="slide__left__price">
                    <p>Giá</p>
                    <b>${mydata[i].price}</b>
                    
                </div>
                <div
                    class="slide__left__btn"
                    style="background-color: ${mydata[i].mainColor}"
                    data-slider = ${mydata[i].id}
                >
                    Mua ngay
                </div>
            </div>
            <div class="slide__right">
                <div class="slide__right__img">
                    <img data-src="${mydata[i].img}" src="${mydata[i].img}" alt="" />
                </div>
            </div>
        </div>`;
            }
        };
        renderHTML(JSON.parse(data.response));
        slidesContainer.innerHTML = innerHTMLSliderContainer;
        let slides = conFig.$$(".slider__container__slide"); //danh sach slide
        let indexSlide = 0;
        let slideControlBottoms = conFig.$$(
            //icon dot
            ".slider__control__bottom i"
        );
        let slideControlBottom = conFig.$(".slider__control__bottom"); //thung chua iocn dot
        let sliderControlLeft = conFig.$(".slider__control__left"); //left
        let sliderControlRight = conFig.$(".slider__control__right"); //right
        setTimeout(() => {
            sliderControlLeft.classList.add("active");
            sliderControlRight.classList.add("active");
            slides[0].classList.add("active");
            slideControlBottom.classList.add("active");
            slideControlBottoms[indexSlide].classList.add("active");
        }, 0);
        // khi click vao left, right
        let controlSlide = function (mydata) {
            slides[indexSlide].classList.remove("active");
            slideControlBottoms[indexSlide].classList.remove("active");
            let indexControlBottom = indexSlide + mydata;
            if (indexControlBottom < 0) {
                indexControlBottom = slides.length - 1;
            }
            if (indexControlBottom === slides.length) {
                indexControlBottom = 0;
            }
            slideControlBottoms[indexControlBottom].classList.add("active");
            setTimeout(() => {
                indexSlide += mydata;
                if (indexSlide < 0) {
                    indexSlide = slides.length - 1;
                }
                if (indexSlide === slides.length) {
                    indexSlide = 0;
                }
                slides[indexSlide].classList.add("active");
                slidesContainer.style.marginTop = -indexSlide * 50 + "%";
            }, 1200);
        };
        // khi click vao dots
        function activeSlide(mydata) {
            slides[indexSlide].classList.remove("active");
            slideControlBottoms[indexSlide].classList.remove("active");
            slideControlBottoms[mydata].classList.add("active");
            setTimeout(() => {
                indexSlide = mydata;
                slides[indexSlide].classList.add("active");
                slidesContainer.style.marginTop = -indexSlide * 50 + "%";
            }, 1200);
        }
        //add su kien cho nut left, right
        sliderControlLeft.addEventListener("click", () => {
            controlSlide(-1);
        });
        sliderControlRight.addEventListener("click", () => {
            controlSlide(1);
        });
        //add su kien cho dots
        for (let i = 0; i < slideControlBottoms.length; i++) {
            slideControlBottoms[i].addEventListener("click", () => {
                activeSlide(i);
            });
        }
    })
    .then(() => {
        // chon mau sac:
        let elmSlideColors = conFig.$$(".slide__left__color span");
        function sliderChooseColor(event) {
            let childrenColors = event.target.parentNode.children;
            for (let j = 0; j < childrenColors.length; j++) {
                childrenColors[j].classList.remove("active");
            }
            event.target.classList.add("active");
        }
        for (let i = 0; i < elmSlideColors.length; i++) {
            elmSlideColors[i].addEventListener("click", sliderChooseColor);
        }
        // chon kich co:
        let elmSlideSizes = conFig.$$(".slide__left__size span");
        function sliderChooseSize(event) {
            let childrenColors = event.target.parentNode.children;
            for (let j = 0; j < childrenColors.length; j++) {
                childrenColors[j].classList.remove("active");
            }
            event.target.classList.add("active");
        }
        for (let i = 0; i < elmSlideSizes.length; i++) {
            elmSlideSizes[i].addEventListener("click", sliderChooseSize);
        }
    })
    .then(() => {
        // khi click mua hàng
        let sliderBtns = conFig.$$(
            ".slider__container__slide .slide__left__btn"
        );
        function updateQuantity(nameId) {}
        function addProductInCart(product) {}
        function existProduct(list, item) {
            let result = list.find((element, index) => {
                return (
                    element.id === item.id &&
                    element.color === item.color &&
                    element.size === item.size
                );
            });
            if (result) {
                return result.idProductCart;
            } else {
                return -1;
            }
        }
        function findIndex(list, idItem) {
            let result = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i].idProductCart == idItem) {
                    result = i;
                    break;
                }
            }
            return result;
        }
        function randomString() {
            var result = "";
            function random() {
                return Math.floor(Math.random() * 10);
            }
            result = `${random()}${random()}${random()}-${random()}${random()}${random()}-${random()}${random()}${random()}`;
            return result;
        }
        let onClickSliderBtn = function (event) {
            let cartString = localStorage.getItem("products-cart");
            let cartList;
            if (cartString == "") {
                cartList = [];
            } else {
                cartList = JSON.parse(cartString);
            }
            let currentTarget = event.target;
            let dataSlider = currentTarget.dataset.slider; //1...
            let parentNode = currentTarget.parentNode;
            let colorTarget = parentNode.querySelector(
                ".slide__left__color span.active"
            ).dataset.color; //1...
            let sizeTarget = parentNode.querySelector(
                ".slide__left__size span.active"
            ).dataset.size; //1...
            let dataSrc = parentNode.nextElementSibling.querySelector(
                ".slide__right__img img"
            ).dataset.src;
            let dataTitle = parentNode.querySelector(
                ".slide__left__title"
            ).innerText;
            let dataPrice = parentNode.querySelector(
                ".slide__left__price b"
            ).innerText;
            let dataItem = {
                id: dataSlider,
                quantity: 1,
                color: colorTarget,
                size: sizeTarget,
                img: dataSrc,
                title: dataTitle,
                price: dataPrice,
            };
            let elmQuantityCart = conFig.$(".header__cart .cart-icon p");
            let elmQuantityCartMobile = conFig.$(
                ".header__mobile__cart .quantity"
            );
            if (cartList === null) {
                cartList = [];
                cartList.unshift(dataItem);
                cartList[0].idProductCart = randomString();
                localStorage.setItem("products-cart", JSON.stringify(cartList));
                alert("Thêm sản phẩm vào giở hàng thành công");
                elmQuantityCart.innerHTML = elmQuantityCart.innerHTML * 1 + 1;
                elmQuantityCartMobile.innerHTML =
                    elmQuantityCartMobile.innerHTML * 1 + 1;
            } else if (existProduct(cartList, dataItem) !== -1) {
                let index = findIndex(
                    cartList,
                    existProduct(cartList, dataItem)
                );
                cartList[index].quantity++;
                localStorage.setItem("products-cart", JSON.stringify(cartList));
                alert("Cập nhật sản phẩm vào giở hàng thành công");
            } else {
                dataItem.idProductCart = randomString();
                cartList.unshift(dataItem);
                localStorage.setItem("products-cart", JSON.stringify(cartList));
                alert("Thêm sản phẩm vào giở hàng thành công");
                elmQuantityCart.innerHTML = elmQuantityCart.innerHTML * 1 + 1;
                elmQuantityCartMobile.innerHTML =
                    elmQuantityCartMobile.innerHTML * 1 + 1;
            }
            /**th0: cart rỗng: thêm vào đầu
             * th1: tồn tại id và tồn tại color,size->tăng số lượng
             * th2: còn lại: thêm vào đầu
             */
        };
        for (let i = 0; i < sliderBtns.length; i++) {
            sliderBtns[i].addEventListener("click", onClickSliderBtn);
        }
    })
    .catch((err) => {
        console.log("da xay ra loi");
    });
