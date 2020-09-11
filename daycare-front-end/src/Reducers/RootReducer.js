import { combineReducers } from 'redux';
import classroomReducer from './ClassroomReducers';
import appReducer from './ApplicationReducer';
import employeeReducer from './EmployeeReducer';
import studentReducer from './StudentReducer';
import reportReducer from './ReportReducer';

const rootReducer = combineReducers({
  appReducer: appReducer,
  classReducer: classroomReducer,
  employeeReducer: employeeReducer,
  reportReducer: reportReducer,
  studentReducer: studentReducer,
});

export default rootReducer;
