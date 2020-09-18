import axios from 'axios';


export const getEmployeesStart = () => {
  return { type: 'GET_EMPLOYEES_START' };
};

export const getEmployees = (token, facility, user) => {
  return (dispatch) => {
    dispatch(getEmployeesStart());
    axios
      .get('https://helping-hand-node.herokuapp.com/employees' 
      , {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getEmployeesError(err));
      });
  };
};
export const getEmployeesSuccess = (data) => {
  return { type: 'GET_EMPLOYEES_SUCCESS', payload: data };
};
export const getEmployeesError = (error) => {
  return { type: 'GET_EMPLOYEES_ERROR', error };
};

export const editEmployeeStart = () => {
  return { type: 'EDIT_EMPLOYEE_START' };
};

export const editEmployee = (employee, id, token, user, facility) => {
  return (dispatch) => {
    dispatch(editEmployeeStart());
    return axios
      .put('https://helping-hand-node.herokuapp.com/employee/' + id 
     , employee, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(editEmployeeSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editEmployeeError(err));
      });
  };
};
export const editEmployeeSuccess = (data) => {
  return { type: 'EDIT_EMPLOYEE_SUCCESS', payload: data };
};
export const editEmployeeError = (error) => {
  return { type: 'EDIT_EMPLOYEE_ERROR', error };
};

export const deleteEmployeeStart = () => {
  return { type: 'DELETE_EMPLOYEE_START' };
};

export const deleteEmployee = (id, token, user, facility) => {
  return (dispatch) => {
    dispatch(deleteEmployeeStart());
    axios
      .delete('https://helping-hand-node.herokuapp.com/employee/' + id 
       ,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            uid: user,
            facilityId: facility,
          },
        }
      )
      .then((response) => {
        dispatch(deleteEmployeeSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteEmployeeError(err));
      });
  };
};
export const deleteEmployeeSuccess = (data) => {
  return { type: 'DELETE_EMPLOYEE_SUCCESS', payload: data };
};
export const deleteEmployeeError = (error) => {
  return { type: 'DELETE_EMPLOYEE_ERROR', error };
};

export const addEmployeeStart = () => {
  return { type: 'ADD_EMPLOYEE_START' };
};

export const addEmployee = (employee, token, facility, user) => {
  return (dispatch) => {
    dispatch(addEmployeeStart());
    axios
      .post('https://helping-hand-node.herokuapp.com/employee' 
       , employee, {
        headers: {
          Authorization: 'Bearer ' + token,
          uid: user,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(addEmployeeSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addEmployeeError(err));
      });
  };
};
export const addEmployeeSuccess = (data) => {
  return { type: 'ADD_EMPLOYEE_SUCCESS', payload: data };
};
export const addEmployeeError = (error) => {
  return { type: 'ADD_EMPLOYEE_ERROR', error };
};
