import { CartIcons, HeartIcons, FooterIcons, FormIcons, HeaderIcons, ProductListIcons, WinesIcons } from '../interfaces/images.interface';

export const IMG_URLS = {
  LOGO: '/assets/img/icons/header/logo.svg',
  LOGO_SMALL: '/assets/img/icons/header/logoSmall.png',
  QUESTION: '/assets/img/icons/header/question.svg',
  SEARCH_DESKTOP: '/assets/img/icons/header/search.svg',
  SEARCH_MOBILE: '/assets/img/icons/header/mobile/search.svg',
  DOWN_ARROW: '/assets/img/icons/header/downArrow.svg',
  DOWN_ARROW_SMALL: '/assets/img/icons/down-chevron.svg',
  // DOWN_ARROW_SMALL: '/assets/img/icons/header/downArrowSmall.svg',
  // UP_ARROW: '/assets/img/icons/header/upArrowSmall.svg',
  UP_ARROW: '/assets/img/icons/up-chevron.svg',
  CART: '/assets/img/icons/header/cart/cart.svg',
  HEART: '/assets/img/icons/header/heart/heart.svg',
  LETTER: '/assets/img/icons/letter.svg',
  FACEBOOK: '/assets/img/icons/footer/facebook.svg',
  TWITTER: '/assets/img/icons/footer/twitter.svg',
  INSTAGRAM: '/assets/img/icons/footer/instagram.svg',
  GOOGLE: '/assets/img/icons/footer/google.svg',
  YOUTUBE: '/assets/img/icons/footer/youtube.svg',
  GROUP: '/assets/img/icons/footer/group.png',
  GROUP_2X: '/assets/img/icons/footer/group-2x.png',
  FOOTER_LOGOS: '/assets/img/icons/footer/footer-logos.svg',
  TWO_MEDALS: '/assets/img/icons/footer/-medals.png',
  BOTTLE: '/assets/img/icons/wines/bottle.svg',
  LITTLE_BOTTLE: '/assets/img/icons/wines/little_bottle.svg',
  GOLD_DOWN_ARROW: '/assets/img/icons/form/goldDownArrow.png',
  MENU: '/assets/img/icons/header/mobile/menu-open.svg',
  WHITE_UP_ARROW: '/assets/img/icons/footer/upArrow.svg',
  WHITE_DOWN_ARROW: '/assets/img/icons/footer/downArrow.svg',
  CANCEL: '/assets/img/icons/productList/Cancel.svg',
  MINUS: '/assets/img/icons/productList/minus.svg',
  PLUS: '/assets/img/icons/productList/Add.svg',
  CIRCLE: '/assets/img/icons/header/cart/circle.svg',
  CIRCLE_UN_AUTH: '/assets/img/icons/header/cart/circle_un_auth.svg',
  CLOSE_MODAL_RATING: '/assets/img/icons/ratingModal/close.svg',
  CLOSE_FILTERS: '/assets/img/icons/filters/close.svg',
  DELETE_FILTER: '/assets/img/icons/filters/delete.svg'
};

export const FOOTER_ICONS: FooterIcons = {
  TWITTER: IMG_URLS.TWITTER,
  FACEBOOK: IMG_URLS.FACEBOOK,
  YOUTUBE: IMG_URLS.YOUTUBE,
  INSTAGRAM: IMG_URLS.INSTAGRAM,
  GOOGLE: IMG_URLS.GOOGLE,
  GROUP_2X: IMG_URLS.GROUP_2X,
  GROUP: IMG_URLS.GROUP,
  FOOTER_LOGOS: IMG_URLS.FOOTER_LOGOS,
  TWO_MEDALS: IMG_URLS.TWO_MEDALS,
  WHITE_UP_ARROW: IMG_URLS.WHITE_UP_ARROW,
  WHITE_DOWN_ARROW: IMG_URLS.WHITE_DOWN_ARROW
};

export const CART: CartIcons = {
  CIRCLE: IMG_URLS.CIRCLE,
  CART: IMG_URLS.CART,
  CIRCLE_UN_AUTH: IMG_URLS.CIRCLE_UN_AUTH
};

export const HEART: HeartIcons = {
  CIRCLE: IMG_URLS.CIRCLE,
  HEART: IMG_URLS.HEART,
  CIRCLE_UN_AUTH: IMG_URLS.CIRCLE_UN_AUTH
};

export const HEADER_ICONS: HeaderIcons = {
  LOGO: IMG_URLS.LOGO,
  LOGO_SMALL: IMG_URLS.LOGO_SMALL,
  QUESTION: IMG_URLS.QUESTION,
  SEARCH_DESKTOP: IMG_URLS.SEARCH_DESKTOP,
  SEARCH_MOBILE: IMG_URLS.SEARCH_MOBILE,
  DOWN_ARROW: IMG_URLS.DOWN_ARROW,
  DOWN_ARROW_SMALL: IMG_URLS.DOWN_ARROW_SMALL,
  UP_ARROW: IMG_URLS.UP_ARROW,
  CART,
  HEART,
  MENU: IMG_URLS.MENU
};

export const WINES_ICONS: WinesIcons = {
  BOTTLE: IMG_URLS.BOTTLE,
  LITTLE_BOTTLE: IMG_URLS.LITTLE_BOTTLE
};

export const FORM_ICONS: FormIcons = {
  GOLD_DOWN_ARROW: IMG_URLS.GOLD_DOWN_ARROW
};

export const PRODUCT_LIST: ProductListIcons = {
  CANCEL: IMG_URLS.CANCEL,
  MINUS: IMG_URLS.MINUS,
  PLUS: IMG_URLS.PLUS
};

export const RATING_ICONS = {
  CLOSE_MODAL_RATING: IMG_URLS.CLOSE_MODAL_RATING
};

export const FILTERS_ICONS = {
  CLOSE: IMG_URLS.CLOSE_FILTERS,
  DELETE: IMG_URLS.DELETE_FILTER
};
