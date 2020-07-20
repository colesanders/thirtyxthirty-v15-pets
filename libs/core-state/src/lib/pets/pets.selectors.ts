import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PETS_FEATURE_KEY,
  PetsState,
  PetsPartialState,
  petAdapter
} from './pets.reducer';

// Lookup the 'Pets' feature state managed by NgRx
export const getPetsState = createFeatureSelector<
  PetsPartialState,
  PetsState
>(PETS_FEATURE_KEY);

const { selectAll, selectEntities } = petAdapter.getSelectors();

export const getPetsLoaded = createSelector(
  getPetsState,
  (state: PetsState) => state.loaded
);

export const getPetsError = createSelector(
  getPetsState,
  (state: PetsState) => state.error
);

export const getAllPets = createSelector(
  getPetsState,
  (state: PetsState) => selectAll(state)
);

export const getPetsEntities = createSelector(
  getPetsState,
  (state: PetsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPetsState,
  (state: PetsState) => state.selectedId
);

export const getSelectedPet = createSelector(
  getPetsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);