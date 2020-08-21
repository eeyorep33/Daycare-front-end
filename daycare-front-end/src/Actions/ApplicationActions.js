import axios from 'axios'


export const getUserStart = () => {
  return { type: 'GET_USER_START' }
}

export const getUser = (id) => {
  return dispatch => {
    dispatch(getUserStart())
    axios
    .get('http://localhost:8080/employee/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        facilityId: localStorage.getItem("facilityId")
      },
    })
      .then(response => {
        dispatch(getUserSuccess(response.data))
      }).catch(err => { dispatch(getUserError(err)) })
  }
}
export const getUserSuccess = (data) => {
  return { type: 'GET_USER_SUCCESS', payload: data }
}
export const getUserError = (error) => {
  return { type: 'GET_USER_ERROR', error }
}
export const getMenuStart = () => {
    return { type: 'GET_MENU_START' }
  }
  export const getMenu = () => {
    return dispatch => {
      dispatch(getMenuStart())
      axios.get('http://localhost:8080/menu/' + localStorage.getItem("facilityId"), {
        headers: {
        uid: localStorage.getItem("userId")
        }
      })
        .then(response => {
          dispatch(getMenuSuccess(response.data))
        }).catch(err => { dispatch(getMenuError(err)) })
    }
  }
  export const getMenuSuccess = (data) => {
    return { type: 'GET_MENU_SUCCESS', payload: data }
  }
  export const getMenuError = (error) => {
    return { type: 'GET_MENU_ERROR', error }
  }

  export const getFacilityStart = () => {
    return { type: 'GET_FACILITY_START' }
  }
  export const getFacility = () => {
    return dispatch => {
      dispatch(getFacilityStart())
      axios.get('http://localhost:8080/facility/' + localStorage.getItem("facilityId"), {
        headers: {
          Authorization: 'Bearer ' +  localStorage.getItem("token"),
          uid: localStorage.getItem("userId")
        }
      })
         
        .then(response => {
          dispatch(getFacilitySuccess(response.data))
        }).catch(err => { dispatch(getFacilityError(err)) })
    }
  }
  export const getFacilitySuccess = (data) => {
    return { type: 'GET_FACILITY_SUCCESS', payload: data }
  }
  export const getFacilityError = (error) => {
    return { type: 'GET_FACILITY_ERROR', error }
    
  }


  export const editFacilityStart = () => {
    return { type: 'EDIT_FACILITY_START' }
  }
  export const editFacility = (facility, id) => {
    return dispatch => {
      dispatch(editFacilityStart())
      axios.put('http://localhost:8080/facility/' +id,
      facility, {
        headers: {
          Authorization: 'Bearer ' +  localStorage.getItem("token"),
          uid: localStorage.getItem("userId")
        }
      })
         
        .then(response => {
          dispatch(editFacilitySuccess(response.data))
        }).catch(err => { dispatch(editFacilityError(err)) })
    }
  }
  export const editFacilitySuccess = (data) => {
    return { type: 'EDIT_FACILITY_SUCCESS', payload: data }
  }
  export const editFacilityError = (error) => {
    return { type: 'EDIT_FACILITY_ERROR', error }
  }

  export const getAnnouncementsStart = () => {
    return { type: 'GET_ANNOUNCE_START' }
  }
  export const getAnnouncements = () => {
    return dispatch => {
      dispatch(getAnnouncementsStart())
      axios.get('http://localhost:8080/announcement/' + localStorage.getItem("facilityId"), {
        headers: {
          Authorization: 'Bearer ' +  localStorage.getItem("token")
        }
      })
         
        .then(response => {
          dispatch(getAnnouncementsSuccess(response.data))
        }).catch(err => { dispatch(getAnnouncementsError(err)) })
    }
  }
  export const getAnnouncementsSuccess = (data) => {
    return { type: 'GET_ANNOUNCE_SUCCESS', payload: data }
  }
  export const getAnnouncementsError = (error) => {
    return { type: 'GET_ANNOUNCE_ERROR', error }
  }

  export const editAnnouncementsStart = () => {
    return { type: 'EDIT_ANNOUNCE_START' }
  }
  export const editAnnouncements = (announcement, id) => {
    return dispatch => {
      dispatch(editAnnouncementsStart())
      axios.put('http://localhost:8080/announcement/' +id,
      announcement, {
        headers: {
          Authorization: 'Bearer ' +  localStorage.getItem("token")
        }
      })
         
        .then(response => {
          dispatch(editAnnouncementsSuccess(response.data))
        }).catch(err => { dispatch(editAnnouncementsError(err)) })
    }
  }
  export const editAnnouncementsSuccess = (data) => {
    return { type: 'EDIT_ANNOUNCE_SUCCESS', payload: data }
  }
  export const editAnnouncementsError = (error) => {
    return { type: 'EDIT_ANNOUNCE_ERROR', error }
  }

  export const deleteAnnounceStart = () => {
    return { type: 'DELETE_CLASSROOM_START' }
  }

  export const deleteAnnouncements = (id) => {
    return dispatch => {     
      dispatch(deleteAnnounceStart())
      axios.delete(
        'http://localhost:8080/announcement/' + id,
       
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
          dispatch(deleteAnnounceSuccess(response.data))
        })
        .catch(err => { dispatch(deleteAnnounceError(err)) })
    }
  }
  export const deleteAnnounceSuccess = (data) => {
    return { type: 'DELETE_ANNOUNCE_SUCCESS', payload: data }
  }
  export const deleteAnnounceError = (error) => {
    return { type: 'DELETE_ANNOUNCE_ERROR', error }
  }


  export const addAnnounceStart = () => {
    return { type: 'ADD_ANNOUNCE_START' }
  }
  
  export const addAnnouncement = (token, announcement) => {
    return dispatch => {
      dispatch(addAnnounceStart())
      axios
      .post('http://localhost:8080/announcement', announcement, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          uid: localStorage.getItem('userId'),
        },
      })
        .then(response => {
          dispatch(addAnnounceSuccess(response.data))
        })
        .catch(err => { dispatch(addAnnounceError(err)) })
    }
  }
  export const addAnnounceSuccess = (data) => {
    return { type: 'ADD_ANNOUNCE_SUCCESS', payload: data }
  }
  export const addAnnounceError = (error) => {
    return { type: 'ADD_ANNOUNCE_ERROR', error }
  }

  export const getAuthStart = () => {
    return { type: 'GET_AUTH_START' }
  }
  export const getAuth = (auth) => {
    return dispatch => {
      dispatch(getAuthStart())
      axios.post('http://localhost:8080/login', auth, {
     
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if(response.status !==200) {
            dispatch(getAuthError(response.message))
          } else {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('facilityId', response.data.facilityId)
              dispatch(getAuthSuccess(response.data))
          }
           
        }).catch(err => { dispatch(getAuthError(err)) })
    }
  }
  export const getAuthSuccess = (data) => {
    return { type: 'GET_AUTH_SUCCESS', payload: data }
  }
  export const getAuthError = (error) => {
    return { type: 'GET_AUTH_ERROR', error }
  }

