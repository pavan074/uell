import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthService } from './module/shared/service/auth.service';
//import { AuthService } from './service/auth.service';
import { ActivateService as AuthService } from './service/activate.service';

//Resolver
//import { IntroService } from './pages/intro/intro.page';
import { FormService } from './pages/form/form.page';
import { AreaSelectionService } from './pages/area-selection/area-selection.page';
import { CategoriaSelectionService } from './pages/categoria-selection/categoria-selection.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  /* {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }, */
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
    //resolve: { data: IntroService }, 
    canActivate: [AuthService]
  },
  {
    path: 'area-selection/:userId',
    loadChildren: () => import('./pages/area-selection/area-selection.module').then( m => m.AreaSelectionPageModule),
    resolve: { data: AreaSelectionService }, 
    canActivate: [AuthService]
  },
  {
    path: 'categoria-selection/:userId/:qArea',
    loadChildren: () => import('./pages/categoria-selection/categoria-selection.module').then( m => m.CategoriaSelectionPageModule), 
    resolve: { data: CategoriaSelectionService }, 
    canActivate: [AuthService]
  },
  {
    path: 'form/:userId/:qArea/:categoria/:index',
    loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule), 
    resolve: { data: FormService }, 
    canActivate: [AuthService]
  },

  
  { path: 'signin', loadChildren: () => import('./pages/account/signin-client/signin-client.module').then( m => m.SigninClientPageModule)},
  { path: 'login', loadChildren: () => import('./pages/account/login-supplier/login-supplier.module').then( m => m.LoginSupplierPageModule)},
  { path: 'activate', loadChildren: () => import('./pages/account/activate/activate.module').then( m => m.ActivatePageModule)},
  //{ path: 'password-recovery', loadChildren: () => import('./pages/account/password-recovery-supplier/password-recovery-supplier.module').then( m => m.PasswordRecoverySupplierPageModule)},
  //{ path: 'new-password/:id', loadChildren: () => import('./pages/account/new-password-supplier/new-password-supplier.module').then( m => m.NewPasswordSupplierPageModule)},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
