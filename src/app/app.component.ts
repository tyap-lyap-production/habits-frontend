import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TuiRootModule, TuiDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {}
