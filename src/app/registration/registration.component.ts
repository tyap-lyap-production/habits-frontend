import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { isValidPwd } from '../shared/validators';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.less',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  readonly form = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, isValidPwd]),
  });

  constructor(readonly service: AuthenticationService) {}


  signUp(){
    if(this.form.valid){
      this.service.signUp(this.form.value);
    }
    else{
      this.form.markAllAsTouched();
    }
  }
}
