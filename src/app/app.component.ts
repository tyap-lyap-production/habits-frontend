import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'habits-tracker';
}
