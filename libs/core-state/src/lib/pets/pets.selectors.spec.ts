import { PetsEntity } from './pets.models';
import { State, petsAdapter, initialState } from './pets.reducer';
import * as PetsSelectors from './pets.selectors';

describe('Pets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPetsId = (it) => it['id'];
  const createPetsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PetsEntity);

  let state;

  beforeEach(() => {
    state = {
      pets: petsAdapter.addAll(
        [
          createPetsEntity('PRODUCT-AAA'),
          createPetsEntity('PRODUCT-BBB'),
          createPetsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Pets Selectors', () => {
    it('getAllPets() should return the list of Pets', () => {
      const results = PetsSelectors.getAllPets(state);
      const selId = getPetsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PetsSelectors.getSelected(state);
      const selId = getPetsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPetsLoaded() should return the current 'loaded' status", () => {
      const result = PetsSelectors.getPetsLoaded(state);

      expect(result).toBe(true);
    });

    it("getPetsError() should return the current 'error' state", () => {
      const result = PetsSelectors.getPetsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
