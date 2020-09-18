import axios from 'axios';

//Report
export const getReportStart = () => {
  return { type: 'GET_REPORT_START' };
};

export const getReport = (id, token) => {
  return (dispatch) => {
    dispatch(getReportStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'report/' + id ||
      'http://localhost:8080/report/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(getReportSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getReportError(err));
      });
  };
};
export const getReportSuccess = (data) => {
  return { type: 'GET_REPORT_SUCCESS', payload: data };
};
export const getReportError = (error) => {
  return { type: 'GET_REPORT_ERROR', error };
};

export const getReportArchiveStart = () => {
  return { type: 'GET_REPORT_ARCHIVE_START' };
};

export const getReportArchive = (id, token) => {
  return (dispatch) => {
    dispatch(getReportArchiveStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'report/archive/' + id ||
      'http://localhost:8080/report/archive/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(getReportArchiveSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getReportArchiveError(err));
      });
  };
};
export const getReportArchiveSuccess = (data) => {
  return { type: 'GET_REPORT_ARCHIVE_SUCCESS', payload: data };
};
export const getReportArchiveError = (error) => {
  return { type: 'GET_REPORT_ARCHIVE_ERROR', error };
};

export const getReportListStart = () => {
  return { type: 'GET_REPORT_LIST_START' };
};

export const getReportList = (id, token) => {
  return (dispatch) => {
    dispatch(getReportListStart());
    axios
      .get(process.env.REACT_APP_API_URL + 'report/list/' + id ||
      'http://localhost:8080/report/list/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(getReportListSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getReportListError(err));
      });
  };
};
export const getReportListSuccess = (data) => {
  return { type: 'GET_REPORT_LIST_SUCCESS', payload: data };
};
export const getReportListError = (error) => {
  return { type: 'GET_REPORT_LIST_ERROR', error };
};

//Feeding

export const deleteFeedingStart = () => {
  return { type: 'DELETE_FEEDING_START' };
};

export const deleteFeeding = (id, token) => {
  return (dispatch) => {
    dispatch(deleteFeedingStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'feeding/' + id ||
        'http://localhost:8080/feeding/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteFeedingSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteFeedingError(err));
      });
  };
};
export const deleteFeedingSuccess = (data) => {
  return { type: 'DELETE_FEEDING_SUCCESS', payload: data };
};
export const deleteFeedingError = (error) => {
  return { type: 'DELETE_FEEDING_ERROR', error };
};

export const addFeedingStart = () => {
  return { type: 'ADD_FEEDING_START' };
};

export const addFeeding = (feeding, token) => {
  return (dispatch) => {
    dispatch(addFeedingStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'feeding' ||
      'http://localhost:8080/feeding', feeding, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addFeedingSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addFeedingError(err));
      });
  };
};
export const addFeedingSuccess = (data) => {
  return { type: 'ADD_FEEDING_SUCCESS', payload: data };
};
export const addFeedingError = (error) => {
  return { type: 'ADD_FEEDING_ERROR', error };
};

export const editFeedingStart = () => {
  return { type: 'EDIT_FEEDING_START' };
};

export const editFeeding = (feeding, id, token) => {
  return (dispatch) => {
    dispatch(editFeedingStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'feeding/' + id ||
      'http://localhost:8080/feeding/' + id, feeding, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editFeedingSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editFeedingError(err));
      });
  };
};
export const editFeedingSuccess = (data) => {
  return { type: 'EDIT_FEEDING_SUCCESS', payload: data };
};
export const editFeedingError = (error) => {
  return { type: 'EDIT_FEEDING_ERROR', error };
};

//diapering

export const deleteDiaperingStart = () => {
  return { type: 'DELETE_DIAPERING_START' };
};

export const deleteDiapering = (id, token) => {
  return (dispatch) => {
    dispatch(deleteDiaperingStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'diapering/' + id ||
        'http://localhost:8080/diapering/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteDiaperingSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteDiaperingError(err));
      });
  };
};
export const deleteDiaperingSuccess = (data) => {
  return { type: 'DELETE_DIAPERING_SUCCESS', payload: data };
};
export const deleteDiaperingError = (error) => {
  return { type: 'DELETE_DIAPERING_ERROR', error };
};

export const addDiaperingStart = () => {
  return { type: 'ADD_DIAPERING_START' };
};

export const addDiapering = (diapering, token) => {
  return (dispatch) => {
    dispatch(addFeedingStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'diapering' ||
      'http://localhost:8080/diapering', diapering, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addDiaperingSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addDiaperingError(err));
      });
  };
};
export const addDiaperingSuccess = (data) => {
  return { type: 'ADD_DIAPERING_SUCCESS', payload: data };
};
export const addDiaperingError = (error) => {
  return { type: 'ADD_DIAPERING_ERROR', error };
};

export const editDiaperingStart = () => {
  return { type: 'EDIT_DIAPERING_START' };
};

export const editDiapering = (diapering, id, token) => {
  return (dispatch) => {
    dispatch(editDiaperingStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'diapering/' + id ||
      'http://localhost:8080/diapering/' + id, diapering, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editDiaperingSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editDiaperingError(err));
      });
  };
};
export const editDiaperingSuccess = (data) => {
  return { type: 'EDIT_DIAPERING_SUCCESS', payload: data };
};
export const editDiaperingError = (error) => {
  return { type: 'EDIT_DIAPERING_ERROR', error };
};

//Nap

export const deleteNapStart = () => {
  return { type: 'DELETE_NAP_START' };
};

export const deleteNap = (id, token) => {
  return (dispatch) => {
    dispatch(deleteNapStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'naptime/' + id ||
        'http://localhost:8080/naptime/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteNapSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteNapError(err));
      });
  };
};
export const deleteNapSuccess = (data) => {
  return { type: 'DELETE_NAP_SUCCESS', payload: data };
};
export const deleteNapError = (error) => {
  return { type: 'DELETE_NAP_ERROR', error };
};

export const addNapStart = () => {
  return { type: 'ADD_NAP_START' };
};

export const addNaptime = (nap, token) => {
  return (dispatch) => {
    dispatch(addNapStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'naptime' ||
      'http://localhost:8080/naptime', nap, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addNapSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addNapError(err));
      });
  };
};
export const addNapSuccess = (data) => {
  return { type: 'ADD_NAP_SUCCESS', payload: data };
};
export const addNapError = (error) => {
  return { type: 'ADD_NAP_ERROR', error };
};

export const editNapStart = () => {
  return { type: 'EDIT_NAP_START' };
};

export const editNap = (nap, id, token) => {
  return (dispatch) => {
    dispatch(editNapStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'naptime/' + id  ||
      'http://localhost:8080/naptime/' + id, nap, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editNapSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editNapError(err));
      });
  };
};
export const editNapSuccess = (data) => {
  return { type: 'EDIT_NAP_SUCCESS', payload: data };
};
export const editNapError = (error) => {
  return { type: 'EDIT_NAP_ERROR', error };
};

//Meds

export const deleteMedsStart = () => {
  return { type: 'DELETE_MEDS_START' };
};

export const deleteMeds = (id, token) => {
  return (dispatch) => {
    dispatch(deleteMedsStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'medicine/' + id ||
        'http://localhost:8080/medicine/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteMedsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteMedsError(err));
      });
  };
};
export const deleteMedsSuccess = (data) => {
  return { type: 'DELETE_MEDS_SUCCESS', payload: data };
};
export const deleteMedsError = (error) => {
  return { type: 'DELETE_MEDS_ERROR', error };
};

export const addMedsStart = () => {
  return { type: 'ADD_MEDS_START' };
};

export const addMeds = (med, token) => {
  return (dispatch) => {
    dispatch(addMedsStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'medicine' ||
      'http://localhost:8080/medicine', med, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addMedsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addMedsError(err));
      });
  };
};
export const addMedsSuccess = (data) => {
  return { type: 'ADD_MEDS_SUCCESS', payload: data };
};
export const addMedsError = (error) => {
  return { type: 'ADD_MEDS_ERROR', error };
};

export const editMedsStart = () => {
  return { type: 'EDIT_MEDS_START' };
};

export const editMeds = (med, id, token) => {
  return (dispatch) => {
    dispatch(editMedsStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'medicine/' + id ||
      'http://localhost:8080/medicine/' + id, med, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editMedsSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editMedsError(err));
      });
  };
};
export const editMedsSuccess = (data) => {
  return { type: 'EDIT_MEDS_SUCCESS', payload: data };
};
export const editMedsError = (error) => {
  return { type: 'EDIT_MEDS_ERROR', error };
};

//playtime

export const deletePlaytimeStart = () => {
  return { type: 'DELETE_PLAY_START' };
};

export const deletePlaytime = (id, token) => {
  return (dispatch) => {
    dispatch(deletePlaytimeStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'playtime/' + id ||
        'http://localhost:8080/playtime/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deletePlaytimeSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deletePlaytimeError(err));
      });
  };
};
export const deletePlaytimeSuccess = (data) => {
  return { type: 'DELETE_PLAY_SUCCESS', payload: data };
};
export const deletePlaytimeError = (error) => {
  return { type: 'DELETE_PLAY_ERROR', error };
};

export const addPlaytimeStart = () => {
  return { type: 'ADD_PLAY_START' };
};

export const addPlaytime = (play, token) => {
  return (dispatch) => {
    dispatch(addPlaytimeStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'playtime' ||
      'http://localhost:8080/playtime', play, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addPlaytimeSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addPlaytimeError(err));
      });
  };
};
export const addPlaytimeSuccess = (data) => {
  return { type: 'ADD_PLAY_SUCCESS', payload: data };
};
export const addPlaytimeError = (error) => {
  return { type: 'ADD_PLAY_ERROR', error };
};

export const editPlaytimeStart = () => {
  return { type: 'EDIT_PLAY_START' };
};

export const editPlaytime = (play, id, token) => {
  return (dispatch) => {
    dispatch(editPlaytimeStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'playtime/' + id ||
      'http://localhost:8080/playtime/' + id, play, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editPlaytimeSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editPlaytimeError(err));
      });
  };
};
export const editPlaytimeSuccess = (data) => {
  return { type: 'EDIT_PLAY_SUCCESS', payload: data };
};
export const editPlaytimeError = (error) => {
  return { type: 'EDIT_PLAY_ERROR', error };
};

//comments

export const deleteCommentStart = () => {
  return { type: 'DELETE_COMMENT_START' };
};

export const deleteComment = (id, token) => {
  return (dispatch) => {
    dispatch(deleteCommentStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'comment/' + id ||
        'http://localhost:8080/comment/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteCommentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteCommentError(err));
      });
  };
};
export const deleteCommentSuccess = (data) => {
  return { type: 'DELETE_COMMENT_SUCCESS', payload: data };
};
export const deleteCommentError = (error) => {
  return { type: 'DELETE_COMMENT_ERROR', error };
};

export const addCommentStart = () => {
  return { type: 'ADD_COMMENT_START' };
};

export const addComment = (comment, token) => {
  return (dispatch) => {
    dispatch(addCommentStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'comment' ||
      'http://localhost:8080/comment', comment, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addCommentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addCommentError(err));
      });
  };
};
export const addCommentSuccess = (data) => {
  return { type: 'ADD_COMMENT_SUCCESS', payload: data };
};
export const addCommentError = (error) => {
  return { type: 'ADD_COMMENT_ERROR', error };
};

export const editCommentStart = () => {
  return { type: 'EDIT_COMMENT_START' };
};

export const editComment = (comment, id, token) => {
  return (dispatch) => {
    dispatch(editCommentStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'comment/' + id ||
      'http://localhost:8080/comment/' + id, comment, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editCommentSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editCommentError(err));
      });
  };
};
export const editCommentSuccess = (data) => {
  return { type: 'EDIT_COMMENT_SUCCESS', payload: data };
};
export const editCommentError = (error) => {
  return { type: 'EDIT_COMMENT_ERROR', error };
};

//supplies

export const deleteSuppliesStart = () => {
  return { type: 'DELETE_SUPPLY_START' };
};

export const deleteSupplies = (id, token) => {
  return (dispatch) => {
    dispatch(deleteCommentStart());
    axios
      .delete(process.env.REACT_APP_API_URL + 'supplies/' + id ||
        'http://localhost:8080/supplies/' + id,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        dispatch(deleteSuppliesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(deleteSuppliesError(err));
      });
  };
};
export const deleteSuppliesSuccess = (data) => {
  return { type: 'DELETE_SUPPLY_SUCCESS', payload: data };
};
export const deleteSuppliesError = (error) => {
  return { type: 'DELETE_SUPPLY_ERROR', error };
};

export const addSuppliesStart = () => {
  return { type: 'ADD_SUPPLY_START' };
};

export const addSupplies = (supply, token) => {
  return (dispatch) => {
    dispatch(addSuppliesStart());
    axios
      .post(process.env.REACT_APP_API_URL + 'supplies' ||
      'http://localhost:8080/supplies', supply, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(addSuppliesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addSuppliesError(err));
      });
  };
};
export const addSuppliesSuccess = (data) => {
  return { type: 'ADD_SUPPLY_SUCCESS', payload: data };
};
export const addSuppliesError = (error) => {
  return { type: 'ADD_SUPPLY_ERROR', error };
};

export const editSuppliesStart = () => {
  return { type: 'EDIT_SUPPLY_START' };
};

export const editSupplies = (supply, id, token) => {
  return (dispatch) => {
    dispatch(editSuppliesStart());
    return axios
      .put(process.env.REACT_APP_API_URL + 'supplies/' + id ||
      'http://localhost:8080/supplies/' + id, supply, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        dispatch(editSuppliesSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(editSuppliesError(err));
      });
  };
};
export const editSuppliesSuccess = (data) => {
  return { type: 'EDIT_SUPPLY_SUCCESS', payload: data };
};
export const editSuppliesError = (error) => {
  return { type: 'EDIT_SUPPLY_ERROR', error };
};
