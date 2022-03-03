import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantTreeComponent } from "./pages/plant-tree/plant-tree.component";

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'plant/:id',
    component: PlantTreeComponent
  },
  {
    path: '**',
    redirectTo: '/search',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
