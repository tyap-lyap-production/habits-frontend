import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-index',
    imports: [],
    template: '',
  })
  export class IndexComponent implements OnInit {
    constructor(readonly router: Router) {}

    ngOnInit(): void {
      if(window.localStorage.getItem('userId')) {
        this.router.navigateByUrl('habits')
        return;
    }

    this.router.navigateByUrl('start')
    }
  }