import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalInternalComponent } from './modal-internal/modal-internal.component';



@NgModule({
  declarations: [
    ModalComponent,
    ModalInternalComponent,
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ModalComponent,
        ModalInternalComponent,
    ]
})
export class SharedModule { }
