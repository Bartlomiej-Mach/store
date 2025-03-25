export default class ProductGrid {
  domElements() {
    this.offerContainers = document.querySelector('.product-grid');
    this.url = '/src/products/MOCK_DATA.json';
    this.numberOfOffersAtOneTime = 3;
    this.loadedOffersNumber = 0;
    this.offerList;
    this.observer;
    this.offerLoader = document.querySelector('.product-grid__offer-loader--loader')
    this.currentCount = 0;
    this.userWidth = window.innerWidth;
    this.hiddenOffers;
  }

  init() {
    this.domElements();
    this.resizeCheck();
    this.fetchProdcuts();
  }


  fetchProdcuts() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(this.url, { signal: controller.signal })
        .then(response => response.json())
        .then(data => {

          this.createofferList(data);
          this.prodcutsDomInit(this.offerContainers)
          this.createObserver();
          
        })
        .catch(error => {
            if (error.name === "AbortError") {
                console.error("Request rejected!");
            } else {
                console.error("Error:", error);
            }
            this.errorMessage(this.offerContainers)
        })
        .finally(() => clearTimeout(timeout)); 

  }

  createofferList = (data) => {
    this.offerList = data;
  }

  errorMessage(prodcutContainer) {
    prodcutContainer.querySelector('.offer-grid').classList.add('error');
    this.offerLoader.classList.add('hide');
  }

  prodcutsDomInit(prodcutContainer) {
    this.currentCount = 0;
    
    while (this.currentCount < this.numberOfOffersAtOneTime && this.loadedOffersNumber < this.offerList.length) {

      this.productDomCreator(this.offerList[this.loadedOffersNumber], prodcutContainer)
      this.animateNewOffers();

      this.loadedOffersNumber++;
      this.currentCount++;

      this.removeObserver();

    }

  }

  resizeCheck = () => {
    this.setOffersLimit();
    window.addEventListener('resize', () => {
      this.userWidth = window.innerWidth;
      this.setOffersLimit();      
    })
  }

  animateNewOffers = () => {
    this.hiddenOffers = document.querySelectorAll(
      ".product-grid .offer-grid .offer-grid__item.hidden-element"
    );

    setTimeout(() => {      
      for (let i = 0; i < this.hiddenOffers.length; i++) {
        this.hiddenOffers[i].classList.remove("hidden-element");
      }
    }, 100);
  }

  setOffersLimit = () => {
    if(this.userWidth > 824) {
      this.numberOfOffersAtOneTime = 3;
    }
    if (this.userWidth <= 824) {
      this.numberOfOffersAtOneTime = 2;
    }
    if (this.userWidth <= 630) {
      this.numberOfOffersAtOneTime = 1;
    }
  }

  removeObserver = () => {
    if (this.loadedOffersNumber == this.offerList.length) {
      this.observer.unobserve(this.offerLoader);
      this.offerLoader.classList.add('hide');
    }
  }

  createObserver = () => {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.prodcutsDomInit(this.offerContainers)
      }
    });
    this.observer.observe(this.offerLoader)
  }

  productDomCreator(productItem, prodcutContainer) {
    if(prodcutContainer.querySelector('.offer-grid')) {
      prodcutContainer.querySelector('.offer-grid').innerHTML +=
      `
      <a href="offer-product-${productItem.id?productItem.id:'no-offer'}" class="offer-grid__item hidden-element" id="${productItem.id?productItem.id:''}" data-offer-id="${productItem.id?productItem.id:''}">
        <div class="offer-grid__item--image-container ${productItem.product_images.length > 1 ?'two-images':''}">
          <img 
            src="${productItem.product_images[0].offer_image?productItem.product_images[0].offer_image:''}" 
            alt="${productItem.product_name?productItem.product_name:'Offer Image'}" 
            offerLoader="lazy" 
            class="offer-image"
          >
          ${productItem.product_images.length > 1?
            `
            <img 
              src="${productItem.product_images[1].offer_image}" 
              alt="${productItem.product_name}" 
              offerLoader="lazy" 
              class="offer-image"
            >
            `
            :''
          }
        </div>
        <div class="offer-grid__item--content-container">
          ${productItem.bestseller===true && productItem.bestseller?
            `
            <div class="offer-ribbon">BESTSELLER</div>
            `
            :''
          }
          ${productItem.product_name?
            `
            <span class="offer-name">${productItem.product_name}</span>
            `
            :''
          }
          ${productItem.product_price?
            `
            <span class="offer-price">${productItem.product_price} PLN</span>
            `
            :''
          }
          <button class="button light">
            <span> Shop now </span>
            <div class="icon">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_669)">
                  <path
                    d="M7.5 0.234375C11.5137 0.234375 14.7656 3.48633 14.7656 7.5C14.7656 11.5137 11.5137 14.7656 7.5 14.7656C3.48633 14.7656 0.234375 11.5137 0.234375 7.5C0.234375 3.48633 3.48633 0.234375 7.5 0.234375ZM4.10156 8.78906H7.5V10.8662C7.5 11.1797 7.88086 11.3379 8.10059 11.1152L11.4492 7.74902C11.5869 7.61133 11.5869 7.3916 11.4492 7.25391L8.10059 3.88477C7.87793 3.66211 7.5 3.82031 7.5 4.13379V6.21094H4.10156C3.9082 6.21094 3.75 6.36914 3.75 6.5625V8.4375C3.75 8.63086 3.9082 8.78906 4.10156 8.78906Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_669">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      </a>
      `
    }
  }




}
