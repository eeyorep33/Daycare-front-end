export const initialState = {
  loading: false,

  menuItems: null,
  isAuth: false,
  facilityId: null,
  token: null,
  authLoading: false,
  user: null,
  announcements: null,
  error: null,
  facility: '',
  success: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MENU_START':
      return { ...state, loading: true };
      break;
    case 'GET_MENU_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'GET_MENU_SUCCESS':
      if (action.payload.menuItem) {
        let newItem = state.menuItems[1].children;
        console.log(state.menuItems[1]);
        for (let i in newItem) {
          if (newItem[i].id === action.payload.menuItem.id) {
            newItem[i] = action.payload.menuItem;
          }
        }
        let newMenuItems = state.menuItems;
        newMenuItems[1].children = newItem;
        console.log(newMenuItems);
        return {
          ...state,
          menuItems: newMenuItems,
          loading: false,
        };
      } else {
        return {
          ...state,
          menuItems: action.payload.menuItems.data,
          loading: false,
        };
      }

      break;

    case 'GET_USER_START':
      return { ...state, loading: true };
      break;
    case 'GET_USER_ERROR':
      return {
        ...state,
        error: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_USER_SUCCESS':
      return { ...state, user: action.payload.user, loading: false };
      break;

    case 'GET_FACILITY_START':
      return { ...state, loading: true };
      break;
    case 'GET_FACILITY_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'GET_FACILITY_SUCCESS':
      return {
        ...state,
        facility: action.payload,
        loading: false,
      };
      break;

    case 'EDIT_FACILITY_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_FACILITY_ERROR':
      return {
        ...state,
        error: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'EDIT_FACILITY_SUCCESS':
      return {
        ...state,
        facility: action.payload.facility,
        success: action.payload.message,
        loading: false,
      };
      break;

    case 'GET_ANNOUNCE_START':
      return { ...state, loading: true };
      break;
    case 'GET_ANNOUNCE_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'GET_ANNOUNCE_SUCCESS':
      return {
        ...state,
        announcements: action.payload.announcements,
        loading: false,
      };
      break;

    case 'EDIT_ANNOUNCE_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_ANNOUNCE_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'EDIT_ANNOUNCE_SUCCESS':
      const announce = [...state.announcements];
      const announceIndex = state.announcements.findIndex(announce => {
        return (announce.id === parseInt(action.payload.announcement.id));
      });
      announce[announceIndex] = action.payload.announcement;
      return {
        ...state,
        announcements: announce,
        loading: false,
      };
      break;

    case 'ADD_ANNOUNCE_START':
      return { ...state, loading: true };
      break;
    case 'ADD_ANNOUNCE_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'ADD_ANNOUNCE_SUCCESS':
      return {
        ...state,
        announcements: state.announcements.concat(action.payload.announcement),
        loading: false,
      };
      break;

    case 'DELETE_ANNOUNCE_START':
      return { ...state, loading: true };
      break;
    case 'DELETE_ANNOUNCE_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'DELETE_ANNOUNCE_SUCCESS':
      let copyAnnounce = [...state.announcements];
      const newIndex = state.announcements.findIndex((announce) => {
        return announce.id === parseInt(action.payload.id);
      });
      copyAnnounce.splice(newIndex, 1);
      return { ...state, announcements: copyAnnounce, loading: false };
      break;

    case 'RESET_PASSWORD_START':
      return { ...state, loading: true };
      break;
    case 'RESET_PASSWORD_ERROR':
      return {
        ...state,
        error: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'RESET_PASSWORD_SUCCESS':
      return { ...state, user: action.payload.user };
      break;
    case 'CLEAR_ERROR':
      return { ...state, error: null };
      break;
    case 'CLEAR_SUCCESS':
      return { ...state, success: null };
      break;

    case 'SET_ERROR':
      return { ...state, error: action.error };
      break;
    case 'LOG_OUT':
      return initialState;
      break;
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
      break;
    case 'EDIT_USER_START':
      return { ...state, loading: true };
      break;
    case 'EDIT_USER_ERROR':
      return { ...state, error: action.payload, loading: false };
      break;
    case 'UPDATE_MENU':
      const index = action.values.index;
      let menu = [...state.menuItems];
      menu[1].children[index] = {
        ...menu[1].children[index],
        name: action.values.name,
      };
      return { ...state, menuItems: menu };
      break;
    case 'GET_AUTH_START':
      return { ...state, loading: true };
      break;
    case 'GET_AUTH_ERROR':
      return {
        ...state,
        error: action.error.response.data.message,
        loading: false,
      };
      break;
    case 'GET_AUTH_SUCCESS':
      if (action.payload.token !== null) {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isAuth: true,
          token: action.payload.token,
          user: action.payload.user,
          facilityId: action.payload.facilityId,
          loading: false,
        };
      }
      return { ...state, menuItems: action.payload, loading: false };
      break;
    default:
      return state;
  }
};

export default authReducer;
