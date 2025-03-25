export default class Carousel {
  domElements() {
    this.caruselsContainers = document.querySelectorAll(".carousel");
    this.showTime = 5000;
  }

  init() {
    this.domElements();
    this.carouselComponent?this.carouselInit(this.caruselsContainers):null
    
  }

  carouselInit(listOfCarousels) {
    for (let i = 0; i < listOfCarousels.length; i++) {
      this.carouselComponent(listOfCarousels[i]);
    }
  }

  carouselComponent(carouselID) {
    const carouselContainer = carouselID;
    const carouselSlides =
    carouselContainer.querySelectorAll(".carousel__item");
    let currentSlide = 1;

    setInterval(() => {
      if (currentSlide > carouselSlides.length - 1) {
        currentSlide = 0;
      }
      for (let i = 0; i < carouselSlides.length; i++) {
        carouselSlides[i].classList.remove("active-slide");
      }
      carouselSlides[currentSlide].classList.add("active-slide");
      currentSlide++;
      this.carouselLoader(carouselContainer);
    }, this.showTime + 1000);
    this.carouselLoader(carouselContainer);
  }

  carouselLoader(carouselID) {
    const carouselLoader = carouselID.querySelector(".carousel__loader");
    const carouselLoaderBar = carouselLoader.querySelector(
      ".carousel__loader--load-bar"
    );

    gsap.to(carouselLoaderBar, {
      width: "100%",
      duration: this.showTime / 1000,
      ease: "none",
      onComplete: () => {
        gsap.to(carouselLoaderBar, {
          width: "0%",
          duration: 1,
        })
      },
    });
  }
}
