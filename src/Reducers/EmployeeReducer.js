export const initialState = {
  loading: false,
  employeeError: null,
  employees: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES_START':
      return { ...state, loading: true };
      break;
    case 'GET_EMPLOYEES_ERROR':
      return {
        ...state,
        employeeError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_EMPLOYEES_SUCCESS':
      return { ...state, employees: action.payload.employees, loading: false };
      break;

    case 'EDIT_EMPLOYEE_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_EMPLOYEE_ERROR':
      console.log('in employee error');
      return {
        ...state,
        employeeError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_EMPLOYEE_SUCCESS':
      const index = state.employees.findIndex((employee) => {
        return employee.id === action.payload.employee.id;
      });
      const editEmployee = [...state.employees];
      editEmployee[index] = action.payload.employee;
      return { ...state, employees: editEmployee };
      break;
    case 'CLEAR_EMPLOYEE_ERROR':
      console.log('clearing error');
      return { ...state, employeeError: null };
      break;
    case 'ADD_EMPLOYEE_START':
      return { ...state, loading: true };
      break;
    case 'ADD_EMPLOYEE_ERROR':
      return {
        ...state,
        employeeError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employees: state.employees.concat(action.payload.employee),
        loading: false,
      };
      break;

    case 'DELETE_EMPLOYEE_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_EMPLOYEE_ERROR':
      console.log(action.error.response.data.message);
      return {
        ...state,
        employeeError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_EMPLOYEE_SUCCESS':
      let newEmployee = [...state.employees];
      const employeeIndex = state.employees.findIndex((employee) => {
        return employee.id === parseInt(action.payload.id);
      });
      newEmployee.splice(employeeIndex, 1);
      return { ...state, employees: newEmployee, loading: false };
      break;
    default:
      return state;
  }
};
export default employeeReducer;
