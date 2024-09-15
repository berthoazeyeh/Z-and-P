import { createAction } from '@reduxjs/toolkit';

export const SynchronisationAction = {
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_DATE: 'UPDATE_DATE',
}

export const updateSynchronisationStateStored = createAction<any>(SynchronisationAction.UPDATE_STATUS);
export const updateSynchronisationDateStored = createAction<any>(SynchronisationAction.UPDATE_DATE);
