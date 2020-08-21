import axios from 'axios'
import { getMenu } from './ApplicationActions'


export const getClassroomsStart = () => {
    return { type: 'GET_CLASSROOMS_START' }
  }

  export const getClassrooms = (token, facilityId) => {
    return dispatch => {
      dispatch(getClassroomsStart())
      axios
      .get('http://localhost:8080/classrooms', {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: localStorage.getItem("facilityId")
        },
      })
        .then(response => {
          dispatch(getClassroomsSuccess(response.data))
        }).catch(err => { dispatch(getClassroomsError(err)) })
    }
  }
  export const getClassroomsSuccess = (data) => {
    return { type: 'GET_CLASSROOMS_SUCCESS', payload: data }
  }
  export const getClassroomsError = (error) => {
    return { type: 'GET_CLASSROOMS_ERROR', error }
  }


  export const editClassroomStart = () => {
    return { type: 'EDIT_CLASSROOM_START' }
  }
  
  export const editClassroom = (classroom, id) => {
    return dispatch => {     
      dispatch(editClassroomStart())
      axios.put(
        'http://localhost:8080/classroom/' + id,
        classroom,
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
          dispatch(editClassroomSuccess(response.data))
        }).then(res => {
          dispatch(getMenu())

        })
        .catch(err => { dispatch(editClassroomError(err)) })
    }
  }
  export const editClassroomSuccess = (data) => {
    return { type: 'EDIT_CLASSROOM_SUCCESS', payload: data }
  }
  export const editClassroomError = (error) => {
    return { type: 'EDIT_CLASSROOM_ERROR', error }
  }


  export const deleteClassroomStart = () => {
    return { type: 'DELETE_CLASSROOM_START' }
  }
  
  export const deleteClassroom = (id) => {
    return dispatch => {     
      dispatch(deleteClassroomStart())
      axios.delete(
        'http://localhost:8080/classroom/' + id,
       
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
          dispatch(deleteClassroomSuccess(response.data))
        }).then(res => {
          dispatch(getMenu())

        })
        .catch(err => { dispatch(deleteClassroomError(err)) })
    }
  }
  export const deleteClassroomSuccess = (data) => {
    return { type: 'DELETE_CLASSROOM_SUCCESS', payload: data }
  }
  export const deleteClassroomError = (error) => {
    return { type: 'DELETE_CLASSROOM_ERROR', error }
  }


  export const addClassroomStart = () => {
    return { type: 'ADD_CLASSROOM_START' }
  }
  
  export const addClassroom = (token, classroom) => {
    return dispatch => {
      dispatch(addClassroomStart())
      axios
      .post('http://localhost:8080/classroom', classroom, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: localStorage.getItem('userId'),
        },
      })
        .then(response => {
          dispatch(addClassroomSuccess(response.data))
        }).then(
          res => {
            dispatch(getMenu())}
        )
        .catch(err => { dispatch(addClassroomError(err)) })
    }
  }
  export const addClassroomSuccess = (data) => {
    return { type: 'ADD_CLASSROOM_SUCCESS', payload: data }
  }
  export const addClassroomError = (error) => {
    return { type: 'ADD_CLASSROOM_ERROR', error }
  }