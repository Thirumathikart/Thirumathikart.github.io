import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router){}
    ngOnInit() {
       if(this.router.url === '' ||  this.router.url === '/'){
        this.route.queryParams.subscribe((params) => {
            const fcm = params['fcm'];
            this.router.navigate(['auth'], { queryParams: { fcm: fcm } });
        })
       }
    }
 
}
