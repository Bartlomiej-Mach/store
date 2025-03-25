export default class Nav {
  domElements() {
    this.navContainer = document.querySelector('.header')
    this.hamburgerContainer = document.querySelector('.header .nav .hamburger-menu')
  }

  init() {
    this.domElements();
    this.navToggle();
  }

  navToggle = () => {
    if (this.hamburgerContainer && this.navContainer) {
      this.hamburgerContainer.addEventListener('click', () => {
        this.navContainer.classList.toggle('active');
      })
    }
  }

}
