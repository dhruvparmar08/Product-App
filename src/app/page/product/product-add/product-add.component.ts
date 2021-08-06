import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  ProductForm: FormGroup;
  imageUrl: string = environment.boyImage;
  image: File;
  title = "Add";
  btn = "Submit";
  id: string;

  constructor(private fb: FormBuilder, private _auth: AuthService, private route: ActivatedRoute, private router: Router) { 
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if(params.id) {
        this._auth.getproduct(params.id).subscribe((res: any) => {
          console.log(res);
          this.patchvalue(res.data[0]);
        }, (err) => console.log(err))
        this.title = "Update";
        this.btn = "Update";
      } else {
        return;
      }
    })
  }

  submit() {
    if(this.ProductForm.valid) {

      let fb = new FormData();
      fb.append("name", this.ProductForm.controls['name'].value);
      fb.append("desc", this.ProductForm.controls['desc'].value);
      fb.append("price", this.ProductForm.controls['price'].value.toString());
      fb.append("quantity", this.ProductForm.controls['quantity'].value.toString());
      fb.append("image", this.image);

      this._auth.addproduct(fb).subscribe((res: any) => {
        console.log(res);
        if(res) {
          alert(res.message) 
          this.router.navigate(['product-list']);
        }
      }, (err) => console.log(err))
    }
  }

  update() {
    if(this.ProductForm.valid) {
      
      let fb = new FormData();
      fb.append("id", this.id);
      fb.append("name", this.ProductForm.controls['name'].value);
      fb.append("desc", this.ProductForm.controls['desc'].value);
      fb.append("price", this.ProductForm.controls['price'].value.toString());
      fb.append("quantity", this.ProductForm.controls['quantity'].value.toString());
      
      this._auth.updateproduct(fb).subscribe((res: any) => {
        console.log(res);
        alert(res.message);
        this.router.navigate(['product-list']);
      }, (err) => alert(err.error.message))
    }
  }

  patchvalue(data) {
    this.ProductForm.patchValue({
      name : data.name,
      desc : data.desc,
      price : data.price,
      quantity : data.quantity,
    })
    this.imageUrl = "http://localhost:8080/"+data.image_path;
  }

  handleUpload(filePath: Event) {
    if ((filePath.target as HTMLInputElement).files.length <= 0) {
      return;
    }
    this.image = (filePath.target as HTMLInputElement).files[0];
    console.log(this.image);
    let ext = this.image.name
      .substring(this.image.name.lastIndexOf(".") + 1)
      .toLowerCase();
    if (!(ext === "jpeg" || ext === "jpg" || ext === "png")) {
      alert("Upload image file only !!!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  reset() {
    this.ProductForm.reset();
    this.imageUrl = environment.boyImage;
  }
}
