import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  set(pageTitle: string, pageMetaTags: { name?: string; property?: string; content: string }[]) {
    this.title.setTitle(pageTitle);    pageMetaTags.forEach(tag => {
      this.meta.removeTag(tag.property ? `property='${tag.property}'` : `name='${tag.name}'`);
    });
    this.meta.addTags(pageMetaTags);
  }
}

// <!-- Canonical SEO -->
//     <link rel="canonical" href="http://bootstrapbay.com/bootstrap4/" />
//     <!--  Social tags      -->
//     <meta name="keywords" content="bootstrap, bootstrap 4, creative tim, creative-tim, bootstrapbay, html css template, web template, css3 template, frontend, responsive bootstrap template, bootstrap ui kit, responsive ui kit">
//     <meta name="description" content="Bootstrap Cheatsheet is an online tool that helps you easily find the differences between Bootstrap 3 and Bootstrap 4. Beautiful and easy-to-use, this should be your go-to page if you are looking to upgrade your Bootstrap 3 project or start a new Bootstrap 4 project.">
//     <!-- Schema.org markup for Google+ -->
//     <meta itemprop="name" content="Bootstrap 4 Cheatsheet by BootstrapBay and Creative Tim">
//     <meta itemprop="description" content="Bootstrap Cheatsheet is an online tool that helps you easily find the differences between Bootstrap 3 and Bootstrap 4. Beautiful and easy-to-use, this should be your go-to page if you are looking to upgrade your Bootstrap 3 project or start a new Bootstrap 4 project.">
//     <meta itemprop="image" content="https://s3.amazonaws.com/creativetimtest/bs4-cheatsheet.png">
//     <!-- Twitter Card data -->
//     <meta name="twitter:card" content="product">
//     <meta name="twitter:site" content="@bootstrapbay">
//     <meta name="twitter:title" content="Bootstrap 4 Cheatsheet by BootstrapBay and Creative Tim">
//     <meta name="twitter:description" content="Bootstrap Cheatsheet is an online tool that helps you easily find the differences between Bootstrap 3 and Bootstrap 4. Beautiful and easy-to-use, this should be your go-to page if you are looking to upgrade your Bootstrap 3 project or start a new Bootstrap 4 project.">
//     <meta name="twitter:creator" content="@bootstrapbay">
//     <meta name="twitter:image" content="https://s3.amazonaws.com/creativetimtest/bs4-cheatsheet.png">
//     <meta name="twitter:data1" content="Bootstrap 4 Cheatsheet by BootstrapBay and Creative Tim">
//     <meta name="twitter:label1" content="Product Type">
//     <meta name="twitter:data2" content="Free">
//     <meta name="twitter:label2" content="Price">
//     <!-- Open Graph data -->
//     <meta property="fb:app_id" content="1373401316070153">
//     <meta property="og:title" content="Bootstrap 4 Cheatsheet by BootstrapBay and Creative Tim" />
//     <meta property="og:type" content="article" />
//     <meta property="og:url" content="http://bootstrapbay.com/bootstrap4/" />
//     <meta property="og:image" content="https://s3.amazonaws.com/creativetimtest/bs4-cheatsheet.png" />
//     <meta property="og:description" content="Bootstrap Cheatsheet is an online tool that helps you easily find the differences between Bootstrap 3 and Bootstrap 4. Beautiful and easy-to-use, this should be your go-to page if you are looking to upgrade your Bootstrap 3 project or start a new Bootstrap 4 project." />
//     <meta property="og:site_name" content="BootstrapBay" />
