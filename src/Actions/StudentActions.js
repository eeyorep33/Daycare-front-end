import axios from 'axios';

export const getStudentsStart = () => {
  return { type: 'GET_STUDENTS_START' };
};

export const getStudents = (token, facility) => {
  return (dispatch) => {
    dispatch(getStudentsStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'students' 
      , {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(getStudentsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getStudentsError(err));
      });
  };
};
export const getStudentsSuccess = (data) => {
  return { type: 'GET_STUDENTS_SUCCESS', payload: data };
};
export const getStudentsError = (error) => {
  return { type: 'GET_STUDENTS_ERROR', error };
};

export const getSearchStart = () => {
  return { type: 'GET_SEARCH_START' };
};

export const getSearch = (token, facility, name) => {
  return (dispatch) => {
    dispatch(getSearchStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'students/search/' + name
     , {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(getSearchSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getSearchError(err));
      });
  };
};
export const getSearchSuccess = (data) => {
  return { type: 'GET_SEARCH_SUCCESS', payload: data };
};
export const getSearchError = (error) => {
  return { type: 'GET_SEARCH_ERROR', error };
};

export const getStudentsByClassStart = () => {
  return { type: 'GET_STUDENTS_BY_CLASS_START' };
};

export const getStudentsByClass = (token, facility, id) => {
  return (dispatch) => {
    dispatch(getStudentsByClassStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'students/classroom/' + id
      , {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(getStudentsByClassSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getStudentsByClassError(err));
      });
  };
};
export const getStudentsByClassSuccess = (data) => {
  return { type: 'GET_STUDENTS_BY_CLASS_SUCCESS', payload: data };
};
export const getStudentsByClassError = (error) => {
  return { type: 'GET_STUDENTS_BY_CLASS_ERROR', error };
};

export const editStudentStart = () => {
  return { type: 'EDIT_STUDENT_START' };
};

export const editStudent = (student, id, token, user, facility) => {
  return (dispatch) => {
    dispatch(editStudentStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'student/' + id
     , student, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(editStudentSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editStudentError(err));
      });
  };
};
export const editStudentSuccess = (data) => {
  return { type: 'EDIT_STUDENT_SUCCESS', payload: data };
};
export const editStudentError = (error) => {
  return { type: 'EDIT_STUDENT_ERROR', error };
};

export const updateImageStart = () => {
  return { type: 'EDIT_STUDENT_IMAGE_START' };
};

export const updateImage = (id, token, image) => {
  return (dispatch) => {
    dispatch(updateImageStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'student/' + id
     , image, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(updateImageSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(updateImageError(err));
      });
  };
};
export const updateImageSuccess = (data) => {
  return { type: 'EDIT_STUDENT_IMAGE_SUCCESS', payload: data };
};
export const updateImageError = (error) => {
  return { type: 'EDIT_STUDENT_IMAGE_ERROR', error };
};

export const checkInStart = () => {
  return { type: 'CHECK_IN_START' };
};

export const checkIn = (id, token) => {
  return (dispatch) => {
    dispatch(checkInStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'student/checkIn/' + id  
   , null, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(checkInSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(checkInError(err));
      });
  };
};
export const checkInSuccess = (data) => {
  return { type: 'CHECK_IN_SUCCESS', payload: data };
};
export const checkInError = (error) => {
  return { type: 'CHECK_IN_ERROR', error };
};

export const checkOutStart = () => {
  return { type: 'CHECK_OUT_START' };
};

export const checkOut = (id, token) => {
  return (dispatch) => {
    dispatch(checkOutStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'student/checkOut/' + id  
     , null, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(checkOutSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(checkOutError(err));
      });
  };
};
export const checkOutSuccess = (data) => {
  return { type: 'CHECK_OUT_SUCCESS', payload: data };
};
export const checkOutError = (error) => {
  return { type: 'CHECK_OUT_ERROR', error };
};

export const deleteStudentStart = () => {
  return { type: 'DELETE_STUDENT_START' };
};

export const deleteStudent = (id, token, user, facility) => {
  return (dispatch) => {
    dispatch(deleteStudentStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'student/' + id 
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
        dispatch(deleteStudentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteStudentError(err));
      });
  };
};
export const deleteStudentSuccess = (data) => {
  return { type: 'DELETE_STUDENT_SUCCESS', payload: data };
};
export const deleteStudentError = (error) => {
  return { type: 'DELETE_STUDENT_ERROR', error };
};

export const addStudentStart = () => {
  return { type: 'ADD_STUDENT_START' };
};

export const addStudent = (student, token, facility, user) => {
  return (dispatch) => {
    dispatch(addStudentStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'student'
  , student, {
        headers: {
          Authorization: 'Bearer ' + token,
          uid: user,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(addStudentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addStudentError(err));
      });
  };
};
export const addStudentSuccess = (data) => {
  return { type: 'ADD_STUDENT_SUCCESS', payload: data };
};
export const addStudentError = (error) => {
  return { type: 'ADD_STUDENT_ERROR', error };
};
