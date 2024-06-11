"use strict";
const allImages = document.getElementsByClassName("carousel__img");
const imageWrapper = document.querySelector("#carousel-image-wrapper");
const indicatorBtns = document.querySelectorAll("indicator__btn");
const prevBtn = document.querySelector(".carousel__btn--prev");
const nextBtn = document.querySelector(".carousel__btn--next");
// current image index
let currentIndex = 0;
// calculate current, next and prev index
function leftIndex(currentIndex) {
    return currentIndex - 1 < 0 ? allImages.length - 1 : currentIndex - 1;
}
function rightIndex(currentIndex) {
    return (currentIndex + 1) % allImages.length;
}
//get previous, current and next images
let currentImage = allImages[currentIndex];
let leftImage = allImages[leftIndex(currentIndex)];
let rightImage = allImages[rightIndex(currentIndex)];
//images position
const currentImageLeft = "0px";
const leftImageLeft = `-${imageWrapper.clientWidth}px`;
const rightImageLeft = `${imageWrapper.clientWidth}px`;
currentImage.style.left = currentImageLeft;
leftImage.style.left = leftImageLeft;
rightImage.style.left = rightImageLeft;
// //change to next element
function changeNextImage() {
    //calculate current index
    currentIndex = leftIndex(currentIndex);
    //reassign images to respective variables
    rightImage = currentImage;
    currentImage = leftImage;
    leftImage = allImages[leftIndex(currentIndex)];
    // reassign image positions
    currentImage.style.left = currentImageLeft;
    leftImage.style.left = leftImageLeft;
    rightImage.style.left = rightImageLeft;
}
//change to prev element
function changePrevImage() {
    //calculate current index
    currentIndex = rightIndex(currentIndex);
    //reassign images to respective variables
    leftImage = currentImage;
    currentImage = rightImage;
    rightImage = allImages[rightIndex(currentIndex)];
    //reassign image positions
    currentImage.style.left = currentImageLeft;
    leftImage.style.left = leftImageLeft;
    rightImage.style.left = rightImageLeft;
}
function displayNext(autoScroll) {
    //get left position of current image
    const currentImgLeftPos = currentImage.style.left;
    //get left position of left image
    const leftImgLeftPos = leftImage.style.left;
    // conver position string to number
    let currentImgLeftNum = Number(currentImgLeftPos.substring(0, currentImgLeftPos.length - 2));
    let leftImgLeftNum = Number(leftImgLeftPos.substring(0, leftImgLeftPos.length - 2));
    clearInterval(autoScroll);
    //move image by 5px to right
    let change = setInterval(function () {
        currentImgLeftNum += 5;
        leftImgLeftNum += 5;
        currentImage.style.left = `${currentImgLeftNum}px`;
        leftImage.style.left = `${leftImgLeftNum}px`;
        if (currentImgLeftNum > imageWrapper.clientWidth) {
            changeNextImage();
            clearInterval(change);
        }
    }, 1);
}
function displayPrev(autoScroll) {
    //get left position of current image
    const currentImgLeftPos = currentImage.style.left;
    //get left postion of right image
    const rightImgLeftPos = rightImage.style.left;
    //convert position string to number
    let currentImgLeftNum = Number(currentImgLeftPos.substring(0, currentImgLeftPos.length - 2));
    let rightImgLeftNum = Number(rightImgLeftPos.substring(0, rightImgLeftPos.length - 2));
    clearInterval(autoScroll);
    //move image to left by 5px
    let change = setInterval(function () {
        currentImgLeftNum -= 5;
        rightImgLeftNum -= 5;
        currentImage.style.left = `${currentImgLeftNum}px`;
        rightImage.style.left = `${rightImgLeftNum}px`;
        if (currentImgLeftNum < -imageWrapper.clientWidth) {
            changePrevImage();
            clearInterval(change);
        }
    }, 1);
}
let autoScroll = setInterval(displayNext, 5000);
nextBtn.onclick = () => {
    displayNext(autoScroll);
    autoScroll = setInterval(displayNext, 5000);
};
prevBtn.onclick = () => {
    displayPrev(autoScroll);
    autoScroll = setInterval(displayNext, 5000);
};
