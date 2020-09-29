import axios from 'axios';

export const getUserStart = () => {
  return { type: 'GET_USER_START' };
};

export const getUser = (id, token, facility) => {
  return (dispatch) => {
    dispatch(getUserStart());
    axios
      .get('https://helping-hand-node.herokuapp.com/employee/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
          facilityId: facility,
        },
      })
      .then((response) => {
        dispatch(getUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUserError(err));
      });
  };
};
export const getUserSuccess = (data) => {
  return { type: 'GET_USER_SUCCESS', payload: data };
};
export const getUserError = (error) => {
  return { type: 'GET_USER_ERROR', error };
};

export const editUserStart = () => {
  return { type: 'EDIT_USER_START' };
};
export const editUser = (id, token, user) => {
  return (dispatch) => {
    dispatch(editUserStart());
    axios
      .put('https://helping-hand-node.herokuapp.com/userProfile/' + id, user, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      .then((response) => {
        dispatch(editUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(editUserError(err));
      });
  };
};
export const editUserSuccess = (data) => {
  return { type: 'EDIT_USER_SUCCESS', payload: data };
};
export const editUserError = (error) => {
  return { type: 'EDIT_USER_ERROR', error };
};

export const resetPasswordStart = () => {
  return { type: 'RESET_PASSWORD_START' };
};

export const resetPassword = (passwords, token, user) => {
  return (dispatch) => {
    dispatch(resetPasswordStart());
    return axios
      .put('https://helping-hand-node.herokuapp.com/reset/password', passwords, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
        },
      })
      .then((response) => {
        dispatch(resetPasswordSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(resetPasswordError(err));
      });
  };
};
export const resetPasswordSuccess = (data) => {
  return { type: 'RESET_PASSWORD_SUCCESS', payload: data };
};
export const resetPasswordError = (error) => {
  return { type: 'RESET_PASSWORD_ERROR', error };
};

export const getMenuStart = () => {
  return { type: 'GET_MENU_START' };
};
export const getMenu = (facility, token, user) => {
  return (dispatch) => {
    dispatch(getMenuStart());
    axios
      .get('https://helping-hand-node.herokuapp.com/menu/' + facility, {
        headers: {
          uid: user,
        },
      })
      .then((response) => {
        dispatch(getMenuSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getMenuError(err));
      });
  };
};
export const getMenuSuccess = (data) => {
  return { type: 'GET_MENU_SUCCESS', payload: data };
};
export const getMenuError = (error) => {
  return { type: 'GET_MENU_ERROR', error };
};

export const getFacilityStart = () => {
  return { type: 'GET_FACILITY_START' };
};
export const getFacility = (facility, token, user) => {
  return (dispatch) => {
    dispatch(getFacilityStart());
    axios
      .get('https://helping-hand-node.herokuapp.com/facility/' + facility, {
        headers: {
          Authorization: 'Bearer ' + token,
          uid: user,
        },
      })

      .then((response) => {
        dispatch(getFacilitySuccess(response.data));
      })
      .catch((err) => {
        dispatch(getFacilityError(err));
      });
  };
};
export const getFacilitySuccess = (data) => {
  return { type: 'GET_FACILITY_SUCCESS', payload: data };
};
export const getFacilityError = (error) => {
  return { type: 'GET_FACILITY_ERROR', error };
};

export const editFacilityStart = () => {
  return { type: 'EDIT_FACILITY_START' };
};
export const editFacility = (facility, id, token, user) => {
  return (dispatch) => {
    dispatch(editFacilityStart());
    axios
      .put('https://helping-hand-node.herokuapp.com/facility/' + id, facility, {
        headers: {
          Authorization: 'Bearer ' + token,
          uid: user,
        },
      })

      .then((response) => {
        dispatch(editFacilitySuccess(response.data));
      })
      .catch((err) => {
        dispatch(editFacilityError(err));
      });
  };
};
export const editFacilitySuccess = (data) => {
  return { type: 'EDIT_FACILITY_SUCCESS', payload: data };
};
export const editFacilityError = (error) => {
  return { type: 'EDIT_FACILITY_ERROR', error };
};

export const getAnnouncementsStart = () => {
  return { type: 'GET_ANNOUNCE_START' };
};
export const getAnnouncements = (facility, token) => {
  return (dispatch) => {
    dispatch(getAnnouncementsStart());
    axios
      .get('https://helping-hand-node.herokuapp.com/announcement/' + facility 
    , {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      .then((response) => {
        dispatch(getAnnouncementsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getAnnouncementsError(err));
      });
  };
};
export const getAnnouncementsSuccess = (data) => {
  return { type: 'GET_ANNOUNCE_SUCCESS', payload: data };
};
export const getAnnouncementsError = (error) => {
  return { type: 'GET_ANNOUNCE_ERROR', error };
};

export const editAnnouncementsStart = () => {
  return { type: 'EDIT_ANNOUNCE_START' };
};
export const editAnnouncements = (token, announcement, id) => {
  return (dispatch) => {
    dispatch(editAnnouncementsStart());
    axios
      .put('https://helping-hand-node.herokuapp.com/announcement/' + id
      , announcement, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      .then((response) => {
        dispatch(editAnnouncementsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(editAnnouncementsError(err));
      });
  };
};
export const editAnnouncementsSuccess = (data) => {
  return { type: 'EDIT_ANNOUNCE_SUCCESS', payload: data };
};
export const editAnnouncementsError = (error) => {
  return { type: 'EDIT_ANNOUNCE_ERROR', error };
};

export const deleteAnnounceStart = () => {
  return { type: 'DELETE_ANNOUNCE_START' };
};

export const deleteAnnouncements = (token, id, facility, user) => {
  return (dispatch) => {
    dispatch(deleteAnnounceStart());
    axios
      .delete('https://helping-hand-node.herokuapp.com/announcement/' + id 
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
        dispatch(deleteAnnounceSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteAnnounceError(err));
      });
  };
};
export const deleteAnnounceSuccess = (data) => {
  return { type: 'DELETE_ANNOUNCE_SUCCESS', payload: data };
};
export const deleteAnnounceError = (error) => {
  return { type: 'DELETE_ANNOUNCE_ERROR', error };
};

export const addAnnounceStart = () => {
  return { type: 'ADD_ANNOUNCE_START' };
};

export const addAnnouncement = (token, announcement, user) => {
  return (dispatch) => {
    dispatch(addAnnounceStart());
    axios
      .post('https://helping-hand-node.herokuapp.com/announcement'
      ,announcement, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: user,
        },
      })
      .then((response) => {
        dispatch(addAnnounceSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addAnnounceError(err));
      });
  };
};
export const addAnnounceSuccess = (data) => {
  return { type: 'ADD_ANNOUNCE_SUCCESS', payload: data };
};
export const addAnnounceError = (error) => {
  return { type: 'ADD_ANNOUNCE_ERROR', error };
};

export const getAuthStart = () => {
  return { type: 'GET_AUTH_START' };
};
export const getAuth = (auth) => {
  return (dispatch) => {
    dispatch(getAuthStart());
    console.log(process.env.REACT_APP_API_URL)
    axios
      .post('https://helping-hand-node.herokuapp.com/login' 
     , auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          dispatch(getAuthError(response.message));
        } else {
          dispatch(getAuthSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getAuthError(err));
      });
  };
};
export const getAuthSuccess = (data) => {
  return { type: 'GET_AUTH_SUCCESS', payload: data };
};
export const getAuthError = (error) => {
  return { type: 'GET_AUTH_ERROR', error };
};
