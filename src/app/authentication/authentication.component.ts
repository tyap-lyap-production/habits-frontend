import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-authentication',
  imports: [
    CommonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.less',
  standalone: true,
})
export class AuthenticationComponent {
  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(readonly service: AuthenticationService) {}

  signIn(){
    if(this.form.valid){
      this.service.signIn(this.form.value);
    }

    this.form.markAllAsTouched();
  }
}
