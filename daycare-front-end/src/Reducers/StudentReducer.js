export const initialState = {
  loading: false,
  studentError: null,
  students: null,
  classStudents: null,
  classroom: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STUDENTS_START':
      return { ...state, loading: true };
      break;
    case 'GET_STUDENTS_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_STUDENTS_SUCCESS':
      return { ...state, students: action.payload.students, loading: false };
      break;

    case 'GET_SEARCH_START':
      return { ...state, loading: true };
      break;
    case 'GET_SEARCH_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_SEARCH_SUCCESS':
      return { ...state, students: action.payload.students, loading: false };
      break;

    case 'GET_STUDENTS_BY_CLASS_START':
      return { ...state, loading: true };
      break;
    case 'GET_STUDENTS_BY_CLASS_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_STUDENTS_BY_CLASS_SUCCESS':
      return {
        ...state,
        classStudents: action.payload.students,
        loading: false,
        classroom: action.payload.classroom,
      };
      break;

    case 'EDIT_STUDENT_IMAGE_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_STUDENT_IMAGE_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_STUDENT_IMAGE_SUCCESS':
      const studentIdx = state.classStudents.findIndex((student) => {
        return student.id === action.payload.student.id;
      });
      const updatedStudent = [...state.classStudents];
      updatedStudent[studentIdx] = action.payload.student;
      return { ...state, classStudents: updatedStudent };
      break;

    case 'CHECK_IN_START':
      return { ...state, loading: true };
      break;
    case 'CHECK_IN_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'CHECK_IN_SUCCESS':
      const checkIndex = state.classStudents.findIndex((student) => {
        return student.id === action.payload.student.id;
      });
      const checkedStudent = [...state.classStudents];
      checkedStudent[checkIndex] = action.payload.student;
      return { ...state, classStudents: checkedStudent };
      break;

    case 'CHECK_OUT_START':
      return { ...state, loading: true };
      break;
    case 'CHECK_OUT_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'CHECK_OUT_SUCCESS':
      const checkOutIndex = state.classStudents.findIndex((student) => {
        return student.id === action.payload.student.id;
      });
      const checkedOutStudent = [...state.classStudents];
      checkedOutStudent[checkOutIndex] = action.payload.student;
      return { ...state, classStudents: checkedOutStudent };
      break;
    case 'EDIT_STUDENT_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_STUDENT_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_STUDENT_SUCCESS':
      const index = state.students.findIndex((student) => {
        return student.id === action.payload.student.id;
      });
      const newStudent = [...state.students];
      newStudent[index] = action.payload.student;
      return { ...state, students: newStudent };
      break;
    case 'CLEAR_STUDENT_ERROR':
      return { ...state, studentError: null };
      break;
    case 'ADD_STUDENT_START':
      return { ...state, loading: true };
      break;
    case 'ADD_STUDENT_ERROR':
      return {
        ...state,
        studentError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'ADD_STUDENT_SUCCESS':
      return {
        ...state,
        students: state.students.concat(action.payload.student),
        loading: false,
      };
      break;

    case 'DELETE_STUDENT_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_STUDENT_ERROR':
      return {
        ...state,
        employeeError: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'DELETE_STUDENT_SUCCESS':
      let copy = [...state.students];
      const studentIndex = state.students.findIndex((student) => {
        return student.id === parseInt(action.payload.student.id);
      });
      copy.splice(studentIndex, 1);
      return { ...state, students: copy, loading: false };
      break;
    default:
      return state;
  }
};

export default studentReducer;
