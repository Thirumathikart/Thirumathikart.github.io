import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache/cache.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {

    constructor(
        private cacheService: CacheService,
        private router: Router){}

    ngOnInit() {
       if(this.router.url === '' ||  this.router.url === '/'){
            this.router.navigate(['auth'],  { queryParams: { role:  this.cacheService.getRole()} });
       }
    }
 
}
