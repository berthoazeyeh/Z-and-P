import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { SynchronisationAction } from 'store/actions/SynchronisationAction';

interface SynchroisationState {
  isSynchronised: boolean;
  lastSuccessSynchronisedTime: string | null
}

const initialState: SynchroisationState = {
  isSynchronised: false,
  lastSuccessSynchronisedTime: (new Date()).toString()
};


const SynchroisationReducer = createReducer(initialState, builder => {
  builder
    .addCase(SynchronisationAction.UPDATE_STATUS, (state, action: PayloadAction<any>) => {
      state.isSynchronised = action.payload;
    })
    .addCase(SynchronisationAction.UPDATE_DATE, (state, action: PayloadAction<any>) => {
      state.lastSuccessSynchronisedTime = action.payload;
    })
    .addCase(PURGE, () => {
      return {
        ...initialState,
      };
    });
});

export {
  SynchroisationReducer
}