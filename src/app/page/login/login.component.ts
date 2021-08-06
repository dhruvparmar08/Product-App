import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  visible: boolean = false;
  
  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.loginForm.value);
    this._auth.login(this.loginForm.value).subscribe(
      (res: any) => {
        this._auth.setToken('auth_token', res.token);
        this.router.navigate(['product-list']);
      }
    ), (err) => {

    }
  }

}
