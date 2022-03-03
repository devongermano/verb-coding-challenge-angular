import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchResultComponent } from "./search-result/search-result.component";


@NgModule({
  declarations: [
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule
  ]
})
export class SearchModule { }
