import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-index',
    imports: [],
    template: '',
  })
  export class IndexComponent {
    constructor(readonly router: Router) {
        if(window.localStorage.getItem('userId')) {
            this.router.navigateByUrl('habits')
            return;
        }

        this.router.navigateByUrl('start')
    }
  }