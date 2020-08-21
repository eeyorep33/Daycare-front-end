import{combineReducers} from 'redux'
import classroomReducer from './ClassroomReducers'
import appReducer from './ApplicationReducer'
import employeeReducer from './EmployeeReducer'

const rootReducer = combineReducers({appReducer, classroomReducer, employeeReducer})

export default rootReducer;