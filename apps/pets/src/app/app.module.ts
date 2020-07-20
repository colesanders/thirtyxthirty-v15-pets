import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromPets from '@thirty/core-state';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets.component';
import { PetsOverviewComponent } from './pets/components/pets-overview/pets-overview.component';
import { PetsDetailComponent } from './pets/components/pets-detail/pets-detail.component';
import { PetsListComponent } from './pets/components/pets-list/pets-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';



@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    PetsOverviewComponent,
    PetsDetailComponent,
    PetsListComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromPets.petsReducer, {}),
    EffectsModule.forRoot([fromPets.PetsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


