import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache/cache.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

    constructor(
        private cacheService: CacheService,
        private router: Router){}

    ngOnInit() {
        this.router.navigate(['auth'],  { queryParams: { role:  this.cacheService.getRole()} });
    }
 
}