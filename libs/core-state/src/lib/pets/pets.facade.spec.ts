import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { PetsEntity } from './pets.models';
import { PetsEffects } from './pets.effects';
import { PetsFacade } from './pets.facade';

import * as PetsSelectors from './pets.selectors';
import * as PetsActions from './pets.actions';
import { PETS_FEATURE_KEY, State, initialState, reducer } from './pets.reducer';

interface TestSchema {
  pets: State;
}

describe('PetsFacade', () => {
  let facade: PetsFacade;
  let store: Store<TestSchema>;
  const createPetsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PetsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PETS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PetsEffects]),
        ],
        providers: [PetsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(PetsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allPets$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(PetsActions.loadPets());

        list = await readFirst(facade.allPets$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadPetsSuccess` to manually update list
     */
    it('allPets$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allPets$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          PetsActions.loadPetsSuccess({
            pets: [createPetsEntity('AAA'), createPetsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allPets$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
