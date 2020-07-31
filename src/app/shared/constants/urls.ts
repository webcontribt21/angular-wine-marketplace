import { FirstNav, FirstHelpNav } from '../enums';

export const NAV_URLS = {
  links: [
    FirstNav.WINES,
    // FirstNav.SPIRITS,
    FirstNav.STORIES,
    // FirstNav.EXPERIENCES,
    // FirstNav.GIFTS_ACCESSORIES,
    // FirstNav.SUBSCRIPTIONS,
  ]
};

export const HELP_NAV_URLS = {
  links: [
    FirstHelpNav.DASHBOARD,
    FirstHelpNav.HELP
  ]
};

const FOOTER_LINKS = [
  {
    title: 'customer service1',
    subLinks: [
      {
        name: 'FAQ',
        url: '/',
      },
      {
        name: 'Payment Options',
        url: '/',
      },
      {
        name: 'Delivery Options',
        url: '/',
      },
      {
        name: 'Privacy Policy',
        url: '/',
      },
      {
        name: 'Terms & Conditions',
        url: '/',
      },
    ]
  },
  {
    title: 'WINE GUIDE',
    subLinks: [
      {
        name: 'Lorem ipsum dolor',
        url: '/',
      },
      {
        name: 'Lipsum amen lorem sit',
        url: '/',
      },
      {
        name: 'Dolors lorem amet ipsum dolor',
        url: '/',
      },
      {
        name: 'Lipsum amen sit',
        url: '/',
      },
      {
        name: 'Under R500',
        url: '/',
      },
    ]
  },
  {
    title: 'Lorem',
    subLinks: [
      {
        name: 'Lorem ipsum dolor',
        url: '/',
      },
      {
        name: 'Lipsum amen lorem sit',
        url: '/',
      },
      {
        name: 'Dolors lorem amet ipsum dolor',
        url: '/',
      },
      {
        name: 'Lipsum amen sit',
        url: '/',
      },
    ]
  },
];

const FOOTER_ABOUT = {
  info: {
    top: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
      'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
      ' when an unknown printer took a galley of nestedView and scrambled it to make a nestedView specimen book.' +
      ' It has survived not only five centuries, but also the leap into electronic typesetting,' +
      ' remaining essentially unchanged.',
    bottom: 't is a long established fact that a reader will be distracted by the readable content of a page when' +
      ' looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution' +
      ' of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
  }
};

const FOOTER_BOTTOM = {
  text: 'Alcohol not for sale to persons under the age of 18 liquor licence wcp/040675',
};

export const FOOTER_DATA = {
  links: FOOTER_LINKS,
  about: FOOTER_ABOUT,
  rule: FOOTER_BOTTOM,
};
