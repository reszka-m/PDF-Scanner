import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OCRPageRoutingModule } from './ocr-routing.module';

import { OCRPage } from './ocr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OCRPageRoutingModule
  ],
  declarations: [OCRPage]
})
export class OCRPageModule {}
