import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PDFPageRoutingModule } from './pdf-routing.module';

import { PDFPage } from './pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PDFPageRoutingModule
  ],
  declarations: [PDFPage]
})
export class PDFPageModule {}
