import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { GuardService } from '../core/guards/dto/services/guard-service.guard';

const routes: Routes = [
  /*estas rutas las gestiona el feature, cuando yo le ingreso /autentiacion me voy al modulo de autenticacion
  y dentro de estas rutas padres yo tengo rutas hijas, a esto se le llama arquitectura modular*/
  { 
    path: "autenticacion",
    canActivate:[() => inject(GuardService).canActiveWithGuard()],
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },

  {
    path: "portafolio",
    canActivate:[() => inject(GuardService).canActiveWithoutGuard()],
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
