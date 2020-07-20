import { PetsEntity } from './pets.models';
import * as PetsActions from './pets.actions';
import { State, initialState, reducer } from './pets.reducer';

describe('Pets Reducer', () => {
  const createPetsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PetsEntity);

  beforeEach(() => {});

  describe('valid Pets actions', () => {
    it('loadPetsSuccess should return set the list of known Pets', () => {
      const pets = [
        createPetsEntity('PRODUCT-AAA'),
        createPetsEntity('PRODUCT-zzz'),
      ];
      const action = PetsActions.loadPetsSuccess({ pets });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
