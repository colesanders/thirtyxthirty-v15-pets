import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsComponent } from './pets/pets.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';

const routes: Routes = [
    { path: 'pets', component: PetsComponent},
    { path: 'login', component: LoginComponent},
    { path: '404', component: FourOhFourComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: FourOhFourComponent }
  ];

@NgModule({
    imports: [
      UiLoginModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}