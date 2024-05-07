import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IRoleId } from '../core/variables/interface';
import { ServiceService } from '../service/service.service';
import { UtilService } from '../core/util/util.service';
import { ApiList } from '../core/variables/api-list';
import { HttpErrorResponse } from '@angular/common/http';
import { roleList } from '../core/variables/enum';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  roleResponse!: IRoleId

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ServiceService,
    private utilService: UtilService
  ) { 

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });

  }

  ngOnInit() {
  
  }

  get form() {
    return this.loginForm.controls;
  }


  login() {
    if(this.loginForm.invalid)   {
      return this.loginForm.markAllAsTouched();
    }
    const data = this.loginForm.value
    this.apiService.post(ApiList.login, data).subscribe({
      next:(res: any) =>  {
        if (res.status) {
          this.roleResponse = res.data;
          localStorage.setItem('roleResponse',JSON.stringify(this.roleResponse));
          this.utilService.showSuccess(res.message)
          this.router.navigate(['/menu']);
        } 
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

}
