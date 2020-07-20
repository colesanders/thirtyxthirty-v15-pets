import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PetsEffects } from './pets.effects';
import * as PetsActions from './pets.actions';

describe('PetsEffects', () => {
  let actions: Observable<any>;
  let effects: PetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PetsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(PetsEffects);
  });

  describe('loadPets$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PetsActions.loadPets() });

      const expected = hot('-a-|', {
        a: PetsActions.loadPetsSuccess({ pets: [] }),
      });

      expect(effects.loadPets$).toBeObservable(expected);
    });
  });
});
