import { Pet } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PetsActions from './pets.actions';

export const PETS_FEATURE_KEY = 'pet';

export interface PetsState extends EntityState<Pet> {
  selectedId?: string | number; // which Pets record has been selected
  loaded: boolean; // has the Pets list been loaded
  error?: string | null; // last known error (if any)
}

export interface PetsPartialState {
  readonly [PETS_FEATURE_KEY]: PetsState;
}

export const petAdapter: EntityAdapter<Pet> = createEntityAdapter();

export const initialPetsState: PetsState = petAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _petsReducer = createReducer(
  initialPetsState,
  on(PetsActions.resetPets, state => petAdapter.removeAll(state)),
  on(PetsActions.resetSelectedPet, state => Object.assign({}, state, { selectedId: null })),
  on(PetsActions.selectPet, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load pets
  on(
    PetsActions.loadPetsSuccess,
    (state, { pets }) =>
    petAdapter.setAll(pets, { ...state, loaded: true })
  ),
  // Load pet
  on(
    PetsActions.loadPetSuccess,
    (state, { pet }) =>
    petAdapter.upsertOne(pet, { ...state, loaded: true })
  ),
  // Add pet
  on(PetsActions.createPetSuccess,
    (state, { pet }) =>
    petAdapter.addOne(pet, state)
  ),
  // Update pet
  on(PetsActions.updatePetSuccess,
    (state, { pet }) =>
    petAdapter.updateOne({ id: pet.id, changes: pet }, state)
  ),
  // Delete pet
  on(PetsActions.deletePetSuccess,
    (state, { pet }) =>
    petAdapter.removeOne(pet.id, state)
  ),

  // failure actions
  on(
    PetsActions.deletePetFailure,
    PetsActions.updatePetFailure,
    PetsActions.createPetFailure,
    PetsActions.loadPetFailure,
    PetsActions.loadPetsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    PetsActions.loadPet,
    PetsActions.loadPets,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function petsReducer(state: PetsState | undefined, action: Action) {
  return _petsReducer(state, action);
}