import { Pet } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedPet = createAction('[Pets] Reset Selected Pet');
export const resetPets = createAction('[Pets] Reset Pets');

// Select Pet
export const selectPet = createAction(
  '[Pets] Select Pet',
  props<{ selectedId: string }>()
);

// Load Pets
export const loadPets = createAction('[Pets] Load Pets');

export const loadPetsSuccess = createAction(
  '[Pets] Load Pets Success',
  props<{ pets: Pet[] }>()
);

export const loadPetsFailure = createAction(
  '[Pets] Load Pets Failure',
  props<{ error: any }>()
);

// Load Pet
export const loadPet = createAction(
  '[Pets] Load Pet',
  props<{ petId: string }>()
);

export const loadPetSuccess = createAction(
  '[Pets] Load Pet Success',
  props<{ pet: Pet }>()
);

export const loadPetFailure = createAction(
  '[Pets] Load Pet Failure',
  props<{ error: any }>()
);

// Create Pet
export const createPet = createAction(
  '[Pets] Create Pet',
  props<{ pet: Pet }>()
);

export const createPetSuccess = createAction(
  '[Pets] Create Pet Success',
  props<{ pet: Pet }>()
);

export const createPetFailure = createAction(
  '[Pets] Create Pet Failure',
  props<{ error: any }>()
);

// Update Pet
export const updatePet = createAction(
  '[Pets] Update Pet',
  props<{ pet: Pet }>()
);

export const updatePetSuccess = createAction(
  '[Pets] Update Pet Success',
  props<{ pet: Pet }>()
);

export const updatePetFailure = createAction(
  '[Pets] Update Pet Failure',
  props<{ error: any }>()
);

// Delete Pet
export const deletePet = createAction(
  '[Pets] Delete Pet',
  props<{ pet: Pet }>()
);

export const deletePetCancelled = createAction(
  '[Pets] Delete Pet Cancelled'
);

export const deletePetSuccess = createAction(
  '[Pets] Delete Pet Success',
  props<{ pet: Pet }>()
);

export const deletePetFailure = createAction(
  '[Pets] Delete Pet Failure',
  props<{ error: any }>()
);