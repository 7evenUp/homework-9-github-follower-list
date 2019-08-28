import { takeLatest, select, put, call, fork } from 'redux-saga/effects'
import { fetchRequest, fetchSuccess, fetchFailure } from './actions'
import { getUserInfo } from './api'
import { getApiKey } from '../Auth';

function* fetchUserWatcher() {
  yield takeLatest(fetchRequest, fetchUserFlow);
}

export function* fetchUserFlow(action) {
  const userName = action.payload
  const apiKey = yield select(getApiKey)
  const result = yield call(getUserInfo, apiKey, userName)
  yield put(fetchSuccess(result))
}

export default function*() {
  yield fork(fetchUserWatcher)
}
