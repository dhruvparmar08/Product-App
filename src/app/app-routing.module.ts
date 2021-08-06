import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProductAddComponent } from './page/product/product-add/product-add.component';
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { AuthGuard } from './service/auth.guard';
import { MainGuard } from './service/main.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'Product-add',
    component: ProductAddComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'Product-edit/:id',
    component: ProductAddComponent,
    canActivate: [MainGuard]
  },
  {
    path: '**',
    redirectTo: 'product-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
