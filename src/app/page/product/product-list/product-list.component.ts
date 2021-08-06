import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = [ 'img', 'name', 'desc', 'price', 'quan', 'total_price', 'action'];
  dataSource = new  MatTableDataSource();

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getdetails();
  }

  getdetails() {
    this._auth.getProductlist().subscribe((res: any) => {
      this.dataSource = res.data;
      if(res.data.length == 0) {
        this.router.navigate(['Product-add']);
      }
      // console.log(this.dataSource);
    }, (err) => { })
  }

  delete(id) {
    console.log(id);
    this._auth.deleteproduct(id).subscribe((res: any) => {
      console.log(res);
      alert(res.message);
      this.getdetails();
    }, (err) => {
      console.log(err);
    })
  }
}
