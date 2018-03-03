document.addEventListener("DOMContentLoaded", () => {
  const htmlBlockHollder =  document.querySelector('html');
  const popupLink = document.querySelectorAll('.popup-open[data-for]');
  const closeButton = document.createElement('div');
  
  const popupOverlayActive = function() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    htmlBlockHollder.style.marginRight = scrollbarWidth;
    htmlBlockHollder.style.overflow = 'hidden';
  }
  const popupOverlayDestroy = function() {
    htmlBlockHollder.removeAttribute('style');
  }

  const popupOpen = (link) => {
    const popupElement = document.querySelector(`.${link.dataset.for}`);
    if (popupElement) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        popupElement.classList.toggle('popup--visible');
        popupOverlayActive();
      });
    }
  };
  Array.from(popupLink).forEach(popupOpen); 

  const popupClose = (link) => {
    const close = document.querySelectorAll('.close-popup-btn');
    const popupInner = document.querySelectorAll('.popup');
    const popupOverlays = document.querySelectorAll('.popup__overlay');
    
    for (let i = 0; i < close.length; i+= 1) {
      close[i].addEventListener('click', () => {
        for (let j = 0; j < popupInner.length; j+= 1) {
          popupInner[j].classList.remove('popup--visible');
          popupOverlayDestroy();
        }
      });
    }  

    [].forEach.call(popupOverlays, function(popup__overlay) {
      popup__overlay.addEventListener('click', () => {
        [].forEach.call(popupInner, function(popup) {
          popup.classList.remove('popup--visible');
          popupOverlayDestroy();
        }); 
      }); 
    });
  }
  popupClose();
});