import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/api/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CacheService } from 'src/app/services/cache/cache.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    role!: number
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    isLogin : boolean = true;

    constructor(
        private cacheService: CacheService,
        private messageService: MessageService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router){}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.role  = this.cacheService.getRole();
            console.log(this.role);
            if(this.role==0) {
                this.role = params['role'];
                if(this.role==null){
                    this.router.navigate(['**']);
                } else {
                this.role = Number(this.role)
                }
            }
            var fcm = this.cacheService.getFCM();
            if(fcm==null) {
                fcm = params['fcm'];
                if(fcm==null||fcm==""){
                    this.router.navigate(['**'])
                } else {
                    localStorage.setItem('fcm',fcm);
                }
            }
         
            this.loginForm = new FormGroup({
                email: new FormControl(""),
                member_code: new FormControl(""),
                contact_number: new FormControl(""),
                password: new FormControl(""),
                fcm_token: new FormControl(fcm),
                role: new FormControl(this.role)
            });

            this.registerForm = new FormGroup({
                first_name: new FormControl(""),
                last_name: new FormControl(""),
                contact_number: new FormControl(""),
                password: new FormControl(""),
                role: new FormControl(this.role),
                email: new FormControl(""),
                member_code: new FormControl(""),
                ifsc_code: new FormControl(""),
                account_number: new FormControl(""),
                account_name: new FormControl(""),
                branch: new FormControl(""),
                vehicle_number:  new FormControl(""),
            });
        });
       
    }

    change() {
        this.isLogin = !this.isLogin;
    }

    login() {
        this.userService.login(this.loginForm.value).subscribe(
            {
              next : (user:any) => { 
                 console.log(user);
                 localStorage.setItem('jwt', user.jwt);
                 localStorage.setItem('role', user.role);
                 var route = '';
                 switch(user.role) {
                    case 1: route = 'home'; break;
                    case 2: route = 'seller'; break;
                    case 3: route = 'delivery';
                 }
                 this.router.navigate([route]).then(()=>{
                    this.messageService.add({severity:'success',summary:"Success", detail: "Login Success"})
                 });
                },
                error: error => {
                  console.log(error.message);
                  this.messageService.add({severity:'error',summary:"Failed", detail: error.message})
              }
            }
        );
    }

    register() {
        this.userService.register(this.registerForm.value).subscribe(
            {
              next : (user:any) => { 
                 console.log(user);
                 this.messageService.add({severity:'success',summary:"Success", detail: "Registration Success"})
                },
                error: error => {
                  console.log(error);
                  this.messageService.add({severity:'error',summary:"Failed", detail: error.message})
              }
            }
        );
    }
}
