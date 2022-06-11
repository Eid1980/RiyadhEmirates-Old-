import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@shared/services/admin.service';
import { GlobalService } from '@shared/services/global.service';
import { UserService } from '@shared/services/user.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posters: any[] = [];
  emiratesNews: any[] = [];
  latestNews: any[] = [];
  reports: any[] = [];
  services: any[] = [];

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _adminService: AdminService,
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
    }, 2000);
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
    }, 2000);
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
    }, 2000);
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
    }, 2000);

    this.getPosters();
    this.getEmiratesNews();
    this.getLatestNews();
    this.getReports();
    this.getServices();
  }

  getPosters() {
    this._adminService.getALlPosters('Poster').subscribe((result: any[]) => {
      this.posters = result;
    });
  }

  getEmiratesNews() {
    this._adminService.getALlEmiratesNews().subscribe((result: any) => {
      this.emiratesNews = result.Data;
    });
  }

  getLatestNews() {
    this._adminService.getALlLatesNews().subscribe((result: any) => {
      this.latestNews = result.Data;
    });
  }

  getReports() {
    this._adminService.getALlReports().subscribe((result: any) => {
      this.reports = result.Data;
    });
  }

  getServices() {
    this._adminService.getALlServices().subscribe((result: any) => {
      this.services = result.Data;
    });
  }

  navigateTo() {
    if (this._userService.currentUser.IsAdmin) {
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
    let newDate = new Date(date);
    let hijriDate = this.globalService.convertToHijri(newDate, 'ar');
    return hijriDate.toString();
  }
}
