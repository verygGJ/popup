class SimplePopup {
  constructor(options) {
    const defaultOptions = {
      popupOpenLink: 'popup-link',
      popupClassName: 'popup',
      popupActiveClass: 'popup--visible',
      popupCloseButton: 'close-btn',
      popupOverlayClass: 'popup__overlay',
      holderBlock: 'html'
    };
    this.options = {
      ...defaultOptions,
      ...options
    }
  }
  openPopup() {
    const popupOpenLink = document.querySelectorAll(`.${this.options.popupOpenLink}`);
    const classPopup = document.querySelectorAll(`.${this.options.popupClassName}`);
    popupOpenLink.forEach(currentLink => {
      currentLink.addEventListener('click', (event) => {
        event.preventDefault();
        classPopup.forEach(popupElement => {
          popupElement.classList.toggle(this.options.popupActiveClass);
          this.holderActive();
        });
      });
    });
  }
  popupOpenForData() {
    const popupLink = document.querySelectorAll('.popup-open[data-for]');
    const fn = (link) => {
      const popupElementData = document.querySelector(`.${link.dataset.for}`);
      if (popupElementData) {   
        link.addEventListener('click', (event) => {
          event.preventDefault();
          popupElementData.classList.toggle(this.options.popupActiveClass);
          this.holderActive();
        });
      }
    }
    Array.from(popupLink).forEach(fn); 
  };
  holderActive() {
    const htmlBlockHollder = document.querySelector(`${this.options.holderBlock}`);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    htmlBlockHollder.style.marginRight = scrollbarWidth;
    htmlBlockHollder.style.overflow = 'hidden';
  }
  holderDestroy() {
    const htmlBlockHollder = document.querySelector(`${this.options.holderBlock}`);
    htmlBlockHollder.removeAttribute('style');
  }
  popupInnerClose() {
    const classPopup = document.querySelectorAll(`.${this.options.popupClassName}`);
    classPopup.forEach(popupElement => {
      popupElement.classList.remove(this.options.popupActiveClass);
    });
  }
  popupCloseButtonClick() {
    const classCloseBtn = document.querySelectorAll(`.${this.options.popupCloseButton}`);
    classCloseBtn.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.popupInnerClose();
        this.holderDestroy();
      });
    });  
  }
  overlayClickClose() {
    const classOverlay = document.querySelectorAll(`.${this.options.popupOverlayClass}`);
    classOverlay.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.popupInnerClose();
        this.holderDestroy();
      });
    });
  }
  initPopup() {
    this.openPopup();
    this.popupCloseButtonClick();
    this.overlayClickClose();
    this.holderActive();
    this.holderDestroy();
  }
  initPopupData() {
    this.popupCloseButtonClick();
    this.overlayClickClose();
    this.holderActive();
    this.holderDestroy();
    this.popupOpenForData();
  }
}

// export default SimplePopup;

// Init popups ------->
// const initPopup = new SimplePopup({
//   popupOpenLink: 'first-link',
//   popupClassName: 'first-popup'
// });
// initPopup.initPopup();

// const initPopup2 = new SimplePopup({
//   popupOpenLink: 'second-link',
//   popupClassName: 'second-popup'
// });
// initPopup2.initPopup();