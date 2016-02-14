import { fork } from 'redux-saga';
import { default as startMissionSaga } from './Mission';

export default function* startSagas(getState) {
  yield fork(startMissionSaga, getState);
}
