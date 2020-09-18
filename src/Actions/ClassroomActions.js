import axios from 'axios';
import { getMenu, getMenuSuccess } from './ApplicationActions';

export const getClassroomsStart = () => {
  return { type: 'GET_CLASSROOMS_START' };
};

export const getClassrooms = (token, facilityId) => {
  return (dispatch) => {
    dispatch(getClassroomsStart());
    axios
      .get(process.env.REACT_APP_API_URL +'classrooms' ||
      'http://localhost:8080/classrooms', {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facilityId,
        },
      })
      .then((response) => {
        dispatch(getClassroomsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getClassroomsError(err));
      });
  };
};
export const getClassroomsSuccess = (data) => {
  return { type: 'GET_CLASSROOMS_SUCCESS', payload: data };
};
export const getClassroomsError = (error) => {
  return { type: 'GET_CLASSROOMS_ERROR', error };
};

export const getClassroomStart = () => {
  return { type: 'GET_CLASSROOM_START' };
};

export const getClassroom = (token, id) => {
  return (dispatch) => {
    dispatch(getClassroomStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'classroom/'+ id ||
      'http://localhost:8080/classroom/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(getClassroomSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getClassroomError(err));
      });
  };
};
export const getClassroomSuccess = (data) => {
  return { type: 'GET_CLASSROOM_SUCCESS', payload: data };
};
export const getClassroomError = (error) => {
  return { type: 'GET_CLASSROOM_ERROR', error };
};
export const editClassroomStart = () => {
  return { type: 'EDIT_CLASSROOM_START' };
};

export const editClassroom = (classroom, id, facility, user, token) => {
  return (dispatch) => {
    dispatch(editClassroomStart());
    axios
      .put(process.env.REACT_APP_API_URL + 'classroom/' + id ||
      'http://localhost:8080/classroom/' + id, classroom, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(editClassroomSuccess(response.data));
        dispatch(getMenuSuccess(response.data));
      })
      .catch((err) => {
        dispatch(editClassroomError(err));
      });
  };
};
export const editClassroomSuccess = (data) => {
  return { type: 'EDIT_CLASSROOM_SUCCESS', payload: data };
};
export const editClassroomError = (error) => {
  return { type: 'EDIT_CLASSROOM_ERROR', error };
};

export const deleteClassroomStart = () => {
  return { type: 'DELETE_CLASSROOM_START' };
};

export const deleteClassroom = (id, token, facility, user) => {
  return (dispatch) => {
    dispatch(deleteClassroomStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'classroom/' + id ||
        'http://localhost:8080/classroom/' + id,

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
        dispatch(deleteClassroomSuccess(response.data));
      })
      .then((res) => {
        dispatch(getMenu(facility, token, user));
      })
      .catch((err) => {
        dispatch(deleteClassroomError(err));
      });
  };
};
export const deleteClassroomSuccess = (data) => {
  return { type: 'DELETE_CLASSROOM_SUCCESS', payload: data };
};
export const deleteClassroomError = (error) => {
  return { type: 'DELETE_CLASSROOM_ERROR', error };
};

export const addClassroomStart = () => {
  return { type: 'ADD_CLASSROOM_START' };
};

export const addClassroom = (token, classroom, user, facility) => {
  return (dispatch) => {
    dispatch(addClassroomStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'classroom' ||
      'http://localhost:8080/classroom', classroom, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
        },
      })
      .then((response) => {
        dispatch(addClassroomSuccess(response.data));
      })
      .then((res) => {
        dispatch(getMenu(facility, token, user));
      })
      .catch((err) => {
        dispatch(addClassroomError(err));
      });
  };
};
export const addClassroomSuccess = (data) => {
  return { type: 'ADD_CLASSROOM_SUCCESS', payload: data };
};
export const addClassroomError = (error) => {
  return { type: 'ADD_CLASSROOM_ERROR', error };
};
