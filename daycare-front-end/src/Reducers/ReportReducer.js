export const initialState = {
  report: null,
  student: null,
  reportError: null,
  reportList: null,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    //Report
    case 'GET_REPORT_START':
      return { ...state, loading: true };
      break;
    case 'GET_REPORT_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_REPORT_SUCCESS':
      return {
        ...state,
        report: action.payload.report,
        student: action.payload.student,
        loading: false,
      };
      break;

    case 'GET_REPORT_ARCHIVE_START':
      return { ...state, loading: true };
      break;
    case 'GET_REPORT_ARCHIVE_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_REPORT_ARCHIVE_SUCCESS':
      return {
        ...state,
        report: action.payload.report,
        student: action.payload.student,
        loading: false,
      };
      break;

    case 'GET_REPORT_LIST_START':
      return { ...state, loading: true };
      break;
    case 'GET_REPORT_LIST_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_REPORT_LIST_SUCCESS':
      return {
        ...state,
        reportList: action.payload.reportList,
        loading: false,
      };
      break;

    case 'CLEAR_EREPORT_ERROR':
      return { ...state, reportError: null };
      break;

    //Feeding

    case 'ADD_FEEDING_START':
      return { ...state, loading: true };
      break;
    case 'ADD_FEEDING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_FEEDING_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          feedings: state.report.feedings.concat(action.payload.feeding),
        },
        loading: false,
      };
      break;

    case 'EDIT_FEEDING_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_FEEDING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_FEEDING_SUCCESS':
      const index = state.report.feedings.findIndex((feeding) => {
        return feeding.id === action.payload.feeding.id;
      });
      const editedFeeding = [...state.report.feedings];
      editedFeeding[index] = action.payload.feeding;

      return { ...state, report: { ...state.report, feedings: editedFeeding } };
      break;

    case 'DELETE_FEEDING_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_FEEDING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_FEEDING_SUCCESS':
      let report = { ...state.report };
      const feedingIndex = state.report.feedings.findIndex((feeding) => {
        return feeding.id === parseInt(action.payload.feeding.id);
      });
      report.feedings.splice(feedingIndex, 1);
      return { ...state, report: report, loading: false };
      break;

    // Nap

    case 'ADD_NAP_START':
      return { ...state, loading: true };
      break;
    case 'ADD_NAP_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_NAP_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          naptimes: state.report.naptimes.concat(action.payload.naptime),
        },
        loading: false,
      };
      break;

    case 'EDIT_NAP_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_NAP_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_NAP_SUCCESS':
      const napIndex = state.report.naptimes.findIndex((nap) => {
        return nap.id === action.payload.naptime.id;
      });
      const editedNap = [...state.report.naptimes];
      editedNap[napIndex] = action.payload.naptime;

      return { ...state, report: { ...state.report, naptimes: editedNap } };
      break;

    case 'DELETE_NAP_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_NAP_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_NAP_SUCCESS':
      let napReport = { ...state.report };
      const napIdx = state.report.naptimes.findIndex((nap) => {
        return nap.id === parseInt(action.payload.naptime.id);
      });
      napReport.naptimes.splice(napIdx, 1);
      return { ...state, report: napReport, loading: false };
      break;

    //Diapering

    case 'DELETE_DIAPERING_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_DIAPERING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_DIAPERING_SUCCESS':
      let diaperingReport = { ...state.report };
      const diaperIndex = state.report.diaperings.findIndex((diaper) => {
        return diaper.id === parseInt(action.payload.diapering.id);
      });
      diaperingReport.diaperings.splice(diaperIndex, 1);
      return { ...state, report: diaperingReport, loading: false };
      break;

    case 'ADD_DIAPERING_START':
      return { ...state, loading: true };
      break;
    case 'ADD_DIAPERING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_DIAPERING_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          diaperings: state.report.diaperings.concat(action.payload.diapering),
        },
        loading: false,
      };
      break;

    case 'EDIT_DIAPERING_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_DIAPERING_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_DIAPERING_SUCCESS':
      const diaperIdx = state.report.diaperings.findIndex((diaper) => {
        return diaper.id === action.payload.diapering.id;
      });
      const editedDiapering = [...state.report.diaperings];
      editedDiapering[diaperIdx] = action.payload.diapering;

      return {
        ...state,
        report: { ...state.report, diaperings: editedDiapering },
      };
      break;

    //Meds

    case 'ADD_MEDS_START':
      return { ...state, loading: true };
      break;
    case 'ADD_MEDS_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_MEDS_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          medicines: state.report.medicines.concat(action.payload.medicine),
        },
        loading: false,
      };
      break;

    case 'EDIT_MEDS_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_MEDS_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_MEDS_SUCCESS':
      const medIndex = state.report.medicines.findIndex((med) => {
        return med.id === action.payload.medicine.id;
      });
      const editedMed = [...state.report.medicines];
      editedMed[medIndex] = action.payload.medicine;

      return { ...state, report: { ...state.report, medicines: editedMed } };
      break;

    case 'DELETE_MEDS_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_MEDS_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_MEDS_SUCCESS':
      let medReport = { ...state.report };
      const medIdx = state.report.medicines.findIndex((med) => {
        return med.id === parseInt(action.payload.medicine.id);
      });
      medReport.medicines.splice(medIdx, 1);
      return { ...state, report: medReport, loading: false };
      break;

    //playtime

    case 'ADD_PLAY_START':
      return { ...state, loading: true };
      break;
    case 'ADD_PLAY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_PLAY_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          playtimes: state.report.playtimes.concat(action.payload.playtime),
        },
        loading: false,
      };
      break;

    case 'EDIT_PLAY_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_PLAY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_PLAY_SUCCESS':
      const playIndex = state.report.playtimes.findIndex((play) => {
        return play.id === action.payload.playtime.id;
      });
      const editedPlay = [...state.report.playtimes];
      editedPlay[playIndex] = action.payload.playtime;

      return { ...state, report: { ...state.report, playtimes: editedPlay } };
      break;

    case 'DELETE_PLAY_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_PLAY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_PLAY_SUCCESS':
      let playReport = { ...state.report };
      const playIdx = state.report.playtimes.findIndex((play) => {
        return play.id === parseInt(action.payload.playtime.id);
      });
      playReport.playtimes.splice(playIdx, 1);
      return { ...state, report: playReport, loading: false };
      break;

    //comments

    case 'ADD_COMMENT_START':
      return { ...state, loading: true };
      break;
    case 'ADD_COMMENT_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_COMMENT_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          comments: state.report.comments.concat(action.payload.comment),
        },
        loading: false,
      };
      break;

    case 'EDIT_COMMENT_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_COMMENT_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_COMMENT_SUCCESS':
      const commentIndex = state.report.comments.findIndex((com) => {
        return com.id === action.payload.comment.id;
      });
      const editedComment = [...state.report.comments];
      editedComment[commentIndex] = action.payload.comment;

      return { ...state, report: { ...state.report, comments: editedComment } };
      break;

    case 'DELETE_COMMENT_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_COMMENT_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_COMMENT_SUCCESS':
      let commentReport = { ...state.report };
      const commentIdx = state.report.comments.findIndex((com) => {
        return com.id === parseInt(action.payload.comment.id);
      });
      commentReport.comments.splice(commentIdx, 1);
      return { ...state, report: commentReport, loading: false };
      break;
    //supplies

    case 'ADD_SUPPLY_START':
      return { ...state, loading: true };
      break;
    case 'ADD_SUPPLY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_SUPPLY_SUCCESS':
      return {
        ...state,
        report: {
          ...state.report,
          supplies: state.report.supplies.concat(action.payload.supply),
        },
        loading: false,
      };
      break;

    case 'EDIT_SUPPLY_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_SUPPLY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_SUPPLY_SUCCESS':
      const supplyIndex = state.report.supplies.findIndex((sup) => {
        return sup.id === action.payload.supply.id;
      });
      const editedSupply = [...state.report.supplies];
      editedSupply[supplyIndex] = action.payload.supply;

      return { ...state, report: { ...state.report, supplies: editedSupply } };
      break;

    case 'DELETE_SUPPLY_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_SUPPLY_ERROR':
      return {
        ...state,
        reportError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_SUPPLY_SUCCESS':
      let supplyReport = { ...state.report };
      const supplyIdx = state.report.supplies.findIndex((sup) => {
        return sup.id === parseInt(action.payload.supply.id);
      });
      supplyReport.supplies.splice(supplyIdx, 1);
      return { ...state, report: supplyReport, loading: false };
      break;

    default:
      return state;
  }
};
export default reportReducer;
