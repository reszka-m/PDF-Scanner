import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PDFPageRoutingModule } from './pdf-routing.module';

import { PDFPage } from './pdf.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PDFPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  declarations: [PDFPage]
})
export class PDFPageModule {}
