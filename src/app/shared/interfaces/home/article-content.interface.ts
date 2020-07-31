export interface ArticleType {
  _id: string;
  title: string;
  titleShort: string;
  tagline: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
}

export interface ArticleContentType {
  article: ArticleType;
}
