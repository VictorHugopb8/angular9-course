import { Product } from '../product.model';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../../core/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.productService.read().subscribe((response) => {
      this.products = response
      console.log(response)
    })
  }

  openDialog(id: string): void {
    this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: {id: id}
    }).beforeClosed().subscribe(() => {
      this.refreshData()
    });
  }

}
