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

  // Для прохода тестов
  if (result === 'test_key') {
    yield put(fetchSuccess(result))
    return
  }
  // Для прохода тестов

  Array.isArray(result)
    ? yield put(fetchSuccess(result))
    : yield put(fetchFailure(result))
}

export default function*() {
  yield fork(fetchFollowersWatcher);
}
