export default class Nav {
  domElements() {
    this.navContainer = document.querySelector(".header");
    this.hamburgerContainer = document.querySelector(
      ".header .nav .hamburger-menu"
    );
  }

  init() {
    this.domElements();
    this.navToggle();
    this.animationOnScrol();
  }

  navToggle = () => {
    if (this.hamburgerContainer && this.navContainer) {
      this.hamburgerContainer.addEventListener("click", () => {
        this.navContainer.classList.toggle("active");
      });
    }
  };

  animationOnScrol = () => {
    if (this.navContainer) {
      gsap.to(this.navContainer, {
        scrollTrigger: {
          trigger: ".hero",
          start: "bottom 10%", 
          end: "bottom 10%", 
          toggleActions: "play none reverse none", 
          markers: false, 
        },
        backgroundColor: "rgb(51, 51, 51, 0.6)",
        duration: 0.4,
        ease: "none",
      });

      
    }
  };
}
