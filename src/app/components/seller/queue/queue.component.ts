import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})


export class QueueComponent implements OnInit {
    private cancelPolling$ = new Subject<void>();

    constructor(
        private orderService:OrderService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const id = params['id'];
            
            this.startPolling(id);
        });
    }

    ngOnDestroy(): void {
        this.cancelPolling$.next();
        this.cancelPolling$.complete();
    }
    
  
    startPolling(id:string): void {
      timer(0, 5000) // Poll every 5 seconds
        .pipe(
          switchMap(() => this.orderService.getOrderByID(id)),
          takeUntil(this.cancelPolling$)
        )
        .subscribe(
          (response) => {
            if (response.order.status === 'ACCEPTED') {
              this.cancelPolling( 'error','Error',  'No Active Carriers Near you' );
            } else  if (response.order.status === 'ENROUTE') {
                this.cancelPolling('success', 'Success', 'Carrier Found');
            }
        },
          (error) => {
            console.log(error);
            this.cancelPolling('error', 'Error', 'Carrier Not Found');
          }
        );
    }
  
    private cancelPolling(severity:string, summary:string, detail:string): void {
      this.cancelPolling$.next();
      this.cancelPolling$.complete();
      this.router.navigate(['dashboard']).then(() => {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
      });
    }
}
