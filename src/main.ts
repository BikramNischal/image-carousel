

const allImages = document.getElementsByClassName("carousel__img");
let currentIndex = 0;
let currentImage = <HTMLElement>allImages[currentIndex];
const prevBtn = <HTMLButtonElement>document.querySelector(".carousel__btn--prev");
const nextBtn = <HTMLButtonElement>document.querySelector(".carousel__btn--next");

function changeNextImage(){
    currentImage.classList.toggle("carousel__img--display");
    currentIndex = ++currentIndex % allImages.length;

    currentImage = <HTMLElement>allImages[currentIndex];
    currentImage.classList.toggle("carousel__img--display");
}

function changePrevImage(){
    currentImage.classList.toggle("carousel__img--display");
    currentIndex = --currentIndex < 0 ? allImages.length -1 : currentIndex;

    currentImage = <HTMLElement>allImages[currentIndex];
    currentImage.classList.toggle("carousel__img--display");
}



nextBtn.onclick = changeNextImage;
prevBtn.onclick = changePrevImage;



