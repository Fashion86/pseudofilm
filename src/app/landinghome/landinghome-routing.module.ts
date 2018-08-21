import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandinghomeComponent } from './landinghome.component';

const routes: Routes = [
    {
        path: '',
        component: LandinghomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandinghomeRoutingModule {}
