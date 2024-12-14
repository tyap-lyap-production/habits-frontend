import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core';

@Component({
  selector: 'app-start-page',
  imports: [CommonModule, TuiLinkModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.less',
  standalone: true
})
export class StartPageComponent {
  constructor(private router: Router) {}

  onSignIn() {
    this.router.navigate(['/sign-in']);
  }

  onSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
