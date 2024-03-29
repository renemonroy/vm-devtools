import { fork } from 'redux-saga/effects';
import { default as startMissionSaga } from './Mission';

export default function* startSagas(getState) {
  yield fork(startMissionSaga, getState);
}
