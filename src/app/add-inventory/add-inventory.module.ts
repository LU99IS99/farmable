import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [{ path: '', component: AddInventoryComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddInventoryModule { }
