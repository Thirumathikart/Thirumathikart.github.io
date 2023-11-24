import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user/user.service';
import { CacheService } from 'src/app/services/cache/cache.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    user!: any
    role!: number

    ngOnInit(): void {
        this.role = this.cacheService.getRole();
        this.get();
    }

    constructor(
        public sanitizer: DomSanitizer,
        private userService: UserService,
        private cacheService: CacheService,
        private messageService: MessageService,
        private router: Router) {}
 
     get() {
         this.userService.getUser().subscribe(
             {
               next : (response:any) => { 
                     this.user = response
                     const first_name = this.user.first_name
                     this.user.first_name = {
                        key: "first_name",
                        value: first_name,
                        selected: false,
                     }
                     const last_name = this.user.last_name
                     this.user.last_name = {
                        key: "last_name",
                        value: last_name,
                        selected: false,
                     }
                 },
                 error: error => {
                   console.log(error.message);
               }
             }
         );
     }

    update(key: string, val:string) {
        this.userService.updateUser(key,val).subscribe(
            {
              next : (response:any) => { 
                    console.log(response);
                    this.messageService.add({severity:'success',summary:"Success", detail: "Update Success"})
                },
                error: error => {
                  console.log(error.message);
                  this.messageService.add({severity:'error',summary:"Error", detail: "Update Failed"})
              }
            }
        );
    }


    updateAddress(addressID:string) {
        this.router.navigate(['/address'], { queryParams: { id: addressID } });
    }

    addAddress() {
        this.router.navigate(['/address']);
    }

    mapsurl(add:any){
        return `https://www.google.com/maps?q=${add.latitude},${add.longitude}&z=14&output=embed`
    }

    logout() {
        const fcm = this.cacheService.getFCM();
        localStorage.clear();
        this.router.navigate(['auth'], { queryParams: { fcm: fcm } });
    }
}
