import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-article-card',
  // pipes: [TruncatePipe],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})




export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  @Input() type: string;
  @Input() imgHeightPercent: string = 'two-third';
  @Input() styles: any = {
    categoryFont: '12px',
    padding: '25px 0 0',
    titleFont: '20px'
  };
  @Input() noImage: boolean = false;
  @Input() linked: boolean = true;

  constructor(private _router: Router) { }

  ngOnInit() {
    // console.log(this.article);
  }

  onGoToArticle() {
    console.log('goto: ', this.linked)
    if (this.linked) {
      this._router.navigate(['/stories/article/' + this.article._id]);
    }
  }
}
