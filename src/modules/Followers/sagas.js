import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions'
import { getFollowersInfo } from './api'
import { getApiKey } from '../Auth';

function* fetchFollowersWatcher() {
  yield takeLatest(fetchRequest, fetchFollowersFlow);
}

export function* fetchFollowersFlow(action) {
  const userName = action.payload
  const apiKey = yield select(getApiKey)
  const result = yield call(getFollowersInfo, apiKey, userName)
  yield put(fetchSuccess(result))
}

export default function*() {
  yield fork(fetchFollowersWatcher);
}
