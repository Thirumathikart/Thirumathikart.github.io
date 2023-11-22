import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
    id!:string
    addressForm!: FormGroup

    constructor(
        private userService: UserService,  
        private route: ActivatedRoute, 
        public router: Router){}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getAddress(this.id);
        });
    }

    action(){
        if(this.id === undefined){
          this.userService.addAddress(this.addressForm.value).subscribe(
              {
                  next : (response:any) => {
                      console.log(response);
                   },
                  error : error => {
                      console.log(error);
                  }
              }
          );
        } else {
          this.userService.updateAddress(this.addressForm.value).subscribe(
              {
                  next : (response:any) => {
                      console.log(response);
                   },
                  error : error => {
                      console.log(error);
                  }
              }
          );
        }
      }

    getAddress(id:string){
        if(this.id === undefined){
            this.addressForm = new FormGroup({
                id: new FormControl(""),
                line1: new FormControl(""),
                line2: new FormControl(""),
                landmark: new FormControl(""),
                district: new FormControl(""),
                state: new FormControl(""),
                pin_code: new FormControl(""),
                longitude: new FormControl(0.0),
                latitude: new FormControl(0.0),
            });
        }else {
            this.userService.getAddress().subscribe(
                {
                    next : (response:any) => { 
                       console.log(response);
                       const addressList = response.address as any[];
                       for(const address of addressList) {
                            if(address._id === id) {
                                console.log(address._id);
                                this.addressForm = new FormGroup({
                                    _id: new FormControl(id),
                                    line1: new FormControl(address.line1),
                                    line2: new FormControl(address.line2),
                                    landmark: new FormControl(address.landmark),
                                    district: new FormControl(address.district),
                                    state: new FormControl(address.state),
                                    pin_code: new FormControl(address.pin_code),
                                    longitude: new FormControl(address.latitude),
                                    latitude: new FormControl(address.longitude),
                                });
                            }
                       }
                       
                      },
                      error: error => {
                        console.log(error.message);
                       // this.showError('Error in fetching Status Code');
                    }
                  }
            )
        }
    }


}
