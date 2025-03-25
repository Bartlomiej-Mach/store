import Carousel from "/src/components/carousel/carousel.js";
import Bestsellers from "/src/components/bestsellers/bestselers.js";
import ProductGrid from "/src/components/product-grid/product-grid.js";
import Nav from "/src/components/navigation/nav.js";

document.addEventListener('DOMContentLoaded', () => {

  if (document.querySelector('.carousel')) {
    const carousel = new Carousel;
    carousel.init();
  }
  if(document.querySelector('.bestsellers')) {
    const bestsellers = new Bestsellers;
    bestsellers.init();
  }
  if(document.querySelector('.product-grid')) {
    const productGrid = new ProductGrid;
    productGrid.init();
  }
  if(document.querySelector('.header .nav') && document.querySelector('.main')) {
    const nav = new Nav;
    nav.init();
  }
 

});