export default class Bestsellers {
  domElements() {
    this.bestsellerContainers = document.querySelectorAll('.bestsellers');
    this.url = '/src/products/MOCK_DATA.json';
    this.bestSellersList = [];
    this.noRepeatNumbersList = null;
    this.maxNumberOfBestSellers = 3;
  }

  init() {
    this.domElements();
    this.fetchBestSellersOffers();
  }


  fetchBestSellersOffers() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(this.url, { signal: controller.signal })
        .then(response => response.json())
        .then(data => {

          this.bestsellersOfferList(data)
          this.noRepeatNumbers(this.bestSellersList);
          this.bestsellerOffersDomInit(this.bestsellerContainers);

        })
        .catch(error => {
            if (error.name === "AbortError") {
                console.error("Request rejected!");
            } else {
                console.error("Error:", error);
            }
            this.errorMessage(this.bestsellerContainers)
        })
        .finally(() => clearTimeout(timeout)); 

  }

  errorMessage(bestsellerContainer) {
    for (let i = 0; i < bestsellerContainer.length; i++) {
      bestsellerContainer[i].querySelector('.offer-grid').classList.add('error');
    }
  }

  bestsellersOfferList(dataInput) {
    for (let i = 0; i < dataInput.length; i++) {
      if (dataInput[i].bestseller === true) {
        this.bestSellersList.push(dataInput[i]);
      }
    }
    
  }

  noRepeatNumbers(listOfBestsellers) {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < this.maxNumberOfBestSellers) { 
        const randomNumber = Math.floor(Math.random() * listOfBestsellers.length); 
        uniqueNumbers.add(randomNumber); 
    }
    const result = Array.from(uniqueNumbers);
    this.noRepeatNumbersList = result;
  }

  bestsellerOffersDomInit(bestsellerContainer) {

    
    for (let i = 0; i < bestsellerContainer.length; i++) {
      
      for (let j = 0; j < this.maxNumberOfBestSellers; j++) {
        
        this.bestsellersOfferDomCreator(this.bestSellersList[this.noRepeatNumbersList[j]], bestsellerContainer[i])
        
      }
    }
  }

  bestsellersOfferDomCreator(bestsellerItem, bestsellerContainer) {    
    
    if(bestsellerContainer.querySelector('.offer-grid')) {
      bestsellerContainer.querySelector('.offer-grid').innerHTML +=
      `
      <a href="offer-product-${bestsellerItem.id?bestsellerItem.id:'no-offer'}" class="offer-grid__item" id="${bestsellerItem.id?bestsellerItem.id:''}" data-offer-id="${bestsellerItem.id?bestsellerItem.id:''}">
        <div class="offer-grid__item--image-container ${bestsellerItem.product_images.length > 1 ?'two-images':''}">
          <img 
            src="${bestsellerItem.product_images[0].offer_image?bestsellerItem.product_images[0].offer_image:''}" 
            alt="${bestsellerItem.product_name?bestsellerItem.product_name:'Offer Image'}" 
            loading="lazy" 
            class="offer-image"
          >
          ${bestsellerItem.product_images.length > 1?
            `
            <img 
              src="${bestsellerItem.product_images[1].offer_image}" 
              alt="${bestsellerItem.product_name}" 
              loading="lazy" 
              class="offer-image"
            >
            `
            :''
          }
        </div>
        <div class="offer-grid__item--content-container">
          ${bestsellerItem.bestseller===true && bestsellerItem.bestseller?
            `
            <div class="offer-ribbon">BESTSELLER</div>
            `
            :''
          }
          ${bestsellerItem.product_name?
            `
            <span class="offer-name">${bestsellerItem.product_name}</span>
            `
            :''
          }
          ${bestsellerItem.product_price?
            `
            <span class="offer-price">${bestsellerItem.product_price} PLN</span>
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
