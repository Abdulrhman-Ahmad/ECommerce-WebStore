import { Component } from '@angular/core';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';
import { OrderService } from 'src/app/Services/dashboard/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders:IorderAdmin[] = [];
  
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.GetAllUserOrders().subscribe({
      next:(data) =>{ this.orders = data ;},
      error:(error)=>{console.log('error',error)},
      complete: ()=>{},
    });
  }

  // ---------------- [ get Order Status Name ]
  getOrderStatusName(status: number): string {
    return OrderStatus[status];
  }
}
