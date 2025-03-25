import Carousel from "../components/carousel/carousel.js";
import Scroll from "../components/scroll-manipulation/scroll.js";
import Bestsellers from "../components/bestsellers/bestselers.js";
import ProductGrid from "../components/product-grid/product-grid.js";
import Nav from "../components/navigation/nav.js";

document.addEventListener('DOMContentLoaded', () => {

  if (document.querySelector('.carousel')) {
    const carousel = new Carousel;
    carousel.init();
  }
  if (document.querySelector('.home-page .hero')) {
    const scroll = new Scroll;
    scroll.init();
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