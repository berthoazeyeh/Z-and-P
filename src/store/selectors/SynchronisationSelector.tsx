import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const currentStateValue = createSelector(
  (state) => state.sync,
  (sync) => sync.isSynchronised,
);
const currentDataValue = createSelector(
  (state) => state.sync,
  (sync) => sync.lastSuccessSynchronisedTime,
);


export const useCurrentSynchronisedState = () => useSelector(currentStateValue);
export const useCurrentLastSuccessSynchronisedTime = () => useSelector(currentDataValue);
