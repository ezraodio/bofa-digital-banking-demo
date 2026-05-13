import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TransfersComponent } from './transfers.component';

const routes: Routes = [
  { path: '', component: TransfersComponent },
];

@NgModule({
  declarations: [TransfersComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class TransfersModule {}
