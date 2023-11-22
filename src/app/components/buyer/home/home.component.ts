import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent 
{
    categories!: any[]
    selectedMenu = 0;
    menus: any[] = [
        {
            index: 0,
            label: 'Home',
            icon: PrimeIcons.HOME
        },
        {
            index: 1,
            label: 'Orders',
            icon: PrimeIcons.HISTORY
        },
        {
            index: 2,
            label: 'Profile',
            icon: PrimeIcons.USER
        }
    ];
    
    constructor(public router: Router){}


    onProfileClick() {
        this.router.navigate(['/profile'])
    }

}
