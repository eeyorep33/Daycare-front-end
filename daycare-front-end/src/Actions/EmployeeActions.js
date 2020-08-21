import axios from 'axios'


export const getEmployeesStart = () => {
    return { type: 'GET_EMPLOYEES_START' }
  }

  export const getEmployees = () => {
    return dispatch => {
      dispatch(getEmployeesStart())
      axios
      .get('http://localhost:8080/employees', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
          facilityId: localStorage.getItem("facilityId")
        },
      })
        .then(response => {
          dispatch(getEmployeesSuccess(response.data))
        }).catch(err => { dispatch(getEmployeesError(err)) })
    }
  }
  export const getEmployeesSuccess = (data) => {
    return { type: 'GET_EMPLOYEES_SUCCESS', payload: data }
  }
  export const getEmployeesError = (error) => {
    return { type: 'GET_EMPLOYEES_ERROR', error }
  }

 
  export const editEmployeeStart = () => {
    return { type: 'EDIT_EMPLOYEE_START' }
  }
  
  export const editEmployee = (employee, id) => {
    return dispatch => {     
      dispatch(editEmployeeStart())
      axios.put(
        'http://localhost:8080/employee/' + id,
        employee,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("token"),
            uid: localStorage.getItem('userId'),
            facilityId: localStorage.getItem('facilityId')
          },
        }
      )
        .then(response => {        
          dispatch(editEmployeeSuccess(response.data))
        })
        .catch(err => { dispatch(editEmployeeError(err)) })
    }
  }
  export const editEmployeeSuccess = (data) => {
    return { type: 'EDIT_EMPLOYEE_SUCCESS', payload: data }
  }
  export const editEmployeeError = (error) => {
    return { type: 'EDIT_EMPLOYEE_ERROR', error }
  }


  export const deleteEmployeeStart = () => {
    return { type: 'DELETE_EMPLOYEE_START' }
  }
  
  export const deleteEmployee = (id) => {
    return dispatch => {     
      dispatch(deleteEmployeeStart())
      axios.delete(
        'http://localhost:8080/employee/' + id,
       
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("token"),
            uid: localStorage.getItem('userId'),
            facilityId: localStorage.getItem("facilityId")
           
          },
        }
      )
        .then(response => {        
          dispatch(deleteEmployeeSuccess(response.data))
        })
        .catch(err => { dispatch(deleteEmployeeError(err)) })
    }
  }
  export const deleteEmployeeSuccess = (data) => {
    return { type: 'DELETE_EMPLOYEE_SUCCESS', payload: data }
  }
  export const deleteEmployeeError = (error) => {
    return { type: 'DELETE_EMPLOYEE_ERROR', error }
  }


  export const addEmployeeStart = () => {
    return { type: 'ADD_EMPLOYEE_START' }
  }
  
  export const addEmployee = (employee) => {
    return dispatch => {
      dispatch(addEmployeeStart())
      axios
      .post('http://localhost:8080/employee', employee, {
        headers: {
         
          Authorization: 'Bearer ' + localStorage.getItem("token"),
          uid: localStorage.getItem('userId'),
          facilityId: localStorage.getItem("facilityId")
        },
      })
        .then(response => {
          dispatch(addEmployeeSuccess(response.data))
        })
        .catch(err => { dispatch(addEmployeeError(err)) })
    }
  }
  export const addEmployeeSuccess = (data) => {
    return { type: 'ADD_EMPLOYEE_SUCCESS', payload: data }
  }
  export const addEmployeeError = (error) => {
    return { type: 'ADD_EMPLOYEE_ERROR', error }
  }