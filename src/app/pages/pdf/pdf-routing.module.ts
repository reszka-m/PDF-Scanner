import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDFPage } from './pdf.page';

const routes: Routes = [
  {
    path: '',
    component: PDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFPageRoutingModule {}
