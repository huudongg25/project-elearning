import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { lessonsSlice } from './reducers/lessonsReducer';
import { lessonIdSlice } from './reducers/lessonIdReduce';
import { lessonStateSlice } from './reducers/lessonState';


const rootReducer = combineReducers({
    lessons : lessonsSlice.reducer,
    lessonId: lessonIdSlice.reducer,
    lessonState: lessonStateSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
export default store