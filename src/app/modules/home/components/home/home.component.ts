import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetNewsDetailsDto } from '@shared/models/news-models';
import { GetPosterDetailsDto } from '@shared/models/posters-models';
import { GetServiceListDto } from '@shared/models/service-models';
import { NewsService } from '@shared/services/news.service';
import { GlobalService } from '@shared/services/global.service';
import { UserService } from '@shared/services/user.service';
import { ServiceService } from '@shared/services/service.service';
import { PosterService } from '@shared/services/poster.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { NewsTypes } from '@shared/enums/news-types.enum';
import { ServiceResponseVM } from '@shared/models/response-models';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  news: GetNewsDetailsDto[] = [];
  emiratesNews: GetNewsDetailsDto[] = [];
  latestNews: GetNewsDetailsDto[] = [];
  reports: GetNewsDetailsDto[] = [];
  posters: GetPosterDetailsDto[] = [];
  services: GetServiceListDto[] = [];

  constructor(
    private _userService: UserService,
    private _newsService: NewsService,
    private _serviceService: ServiceService,
    private _posterService: PosterService,
    private _router: Router,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
    setTimeout(function () {
      $('.news .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        rtl: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    }, 8000);
    setTimeout(function () {
      $('.e-services .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        rtl: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      });
    }, 8000);
    setTimeout(function () {
      $('.gov-news .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        rtl: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 2,
          },
        },
      });
    }, 8000);
    setTimeout(function () {
      $('.advertise-report .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        rtl: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    }, 8000);

    this.getAllNews();
    this.getServices();
    this.getPosters();
  }

  getAllNews() {
    this._newsService.getAll().subscribe((result : ServiceResponseVM) => {
        this.news = result.data;

        this.emiratesNews = this.getNewsByNewsTypeId(NewsTypes.EmiratesNews);

        this.latestNews = this.getNewsByNewsTypeId(NewsTypes.LatestNews);

        this.reports = this.getNewsByNewsTypeId(NewsTypes.Reports);
      });
  }

  getNewsByNewsTypeId(newsTypeId: number): GetNewsDetailsDto[] {
    return this.news.filter((n) => n.newsTypeId == newsTypeId);
  }

  getServices() {
    this._serviceService
      .getAll()
      .subscribe((result: ApiResponse<GetServiceListDto[]>) => {
        this.services = result.data;
      });
  }

  getPosters() {
    this._posterService.getAll().subscribe(
      (res: ApiResponse<GetPosterDetailsDto[]>) => {
        if (res.isSuccess) {
          this.posters = res.data;
        } else {
          // TODO
          // display error message
        }
      },
      (err) => { }
    );
  }


  navigateTo() {
    if (this._userService.currentUser.isAdmin) {
      this._router.navigate(['/e-council/incoming-orders']);
    } else {
      this._router.navigate(['/e-council/create']);
    }
  }

  formatDate(date: any) {
    let newDate = new Date(date);
    var months = [
      'يناير',
      'فبراير',
      'مارس',
      'إبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ];
    let hijriDate = this.globalService.convertToHijri(newDate, 'ar');
    return (
      hijriDate.toString() +
      '     -     ' +
      newDate.getDay().toString() +
      ' ' +
      months[newDate.getMonth()] +
      ' ' +
      newDate.getFullYear().toString() +
      ' م '
    );
  }

  getHijriDate(date: any) {
    /* let newDate = new Date(date);
     let hijriDate = this.globalService.convertToHijri(newDate, 'ar');
     return hijriDate.toString();*/
  }
}
