export const initialState = {
  loading: false,
  classError: null,
  classrooms: null,
};

const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLASSROOMS_START':
      return { ...state, loading: true };
      break;
    case 'GET_CLASSROOMS_ERROR':
      return { ...state, error: action.error.message, loading: false };
      break;
    case 'GET_CLASSROOMS_SUCCESS':
      return {
        ...state,
        classrooms: action.payload.classrooms,
        loading: false,
      };
      break;

    case 'EDIT_CLASSROOM_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_CLASSROOM_ERROR':
      return {
        ...state,
        classError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_CLASSROOM_SUCCESS':
      const index = state.classrooms.findIndex((classroom) => {
        return classroom.id === action.payload.classroom.id;
      });
      const editClassroom = [...state.classrooms];
      editClassroom[index] = {
        ...editClassroom[index],
        name: action.payload.classroom.name,
      };
      return { ...state, classrooms: editClassroom };
      break;

    case 'CLEAR_CLASS_ERROR':
      return { ...state, classError: null };
      break;

    case 'ADD_CLASSROOM_START':
      return { ...state, loading: true };
      break;
    case 'ADD_CLASSROOM_ERROR':
      return {
        ...state,
        classError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_CLASSROOM_SUCCESS':
      return {
        ...state,
        classrooms: state.classrooms.concat(action.payload.classroom),
        loading: false,
      };
      break;

    case 'DELETE_CLASSROOM_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_CLASSROOM_ERROR':
      return { ...state, error: action.error.message, loading: false };
      break;
    case 'DELETE_CLASSROOM_SUCCESS':
      let newClassrooms = [...state.classrooms];
      const classIndex = state.classrooms.findIndex((classroom) => {
        return classroom.id === parseInt(action.payload.id);
      });
      newClassrooms.splice(classIndex, 1);
      return { ...state, classrooms: newClassrooms, loading: false };
      break;
    default:
      return state;
  }
};

export default classroomReducer;
