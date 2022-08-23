import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }, */
  {
    path: '',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'area-selection',
    loadChildren: () => import('./pages/area-selection/area-selection.module').then( m => m.AreaSelectionPageModule)
  },
  {
    path: 'categoria-selection/:qArea',
    loadChildren: () => import('./pages/categoria-selection/categoria-selection.module').then( m => m.CategoriaSelectionPageModule)
  },
  {
    path: 'form/:qArea/:categoria/:index',
    loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
