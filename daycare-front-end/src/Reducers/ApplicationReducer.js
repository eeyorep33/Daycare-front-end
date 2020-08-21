export const initialState = {
  loading: false,

  menuItems: null,
  isAuth: false,
  facilityId: null,
  token: null,
  sideDrawerOpen: false,
  authLoading: false,
  user: null,
  announcements: null,
  error: null,
  facility: '',
  success: null
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
      return {
        ...state,
        menuItems: action.payload.menuItems.data,
        loading: false,
      };
      break;


      
      case 'GET_USER_START':
        return { ...state, loading: true };
        break;
      case 'GET_USER_ERROR':
        return { ...state, error: action.error.response.data.message, loading: false };
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
        localStorage.setItem("facility", JSON.stringify(action.payload))
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
          return { ...state, error: action.error.response.data.message, loading: false };
          break;
        case 'EDIT_FACILITY_SUCCESS':                 
        localStorage.setItem("facility", JSON.stringify(action.payload.facility))
          return {...state,   facility: action.payload.facility, success:action.payload.message,
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
          const announce = [...state.announcements]
          const announceIndex = state.announcements.findIndex(announce => {
            return announce.id = action.payload.announcement.id
          })
          announce[announceIndex]= action.payload.announcement
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
          return {...state, announcements: state.announcements.concat(action.payload.announcement),
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
          let copyAnnounce = [...state.announcements]
          const newIndex = state.announcements.findIndex(announce => {
            return announce.id === parseInt(action.payload.id)
          })
          copyAnnounce.splice(newIndex, 1)                
            return {...state, announcements: copyAnnounce,
              loading: false,
            };
            break;
    case 'OPEN_MENU':
      return { ...state, sideDrawerOpen: true };
      break;
    case 'CLOSE_MENU':
      return { ...state, sideDrawerOpen: false };
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
    case 'CHECK_AUTH':
      return {
        ...state,
        token: action.values.token,
        isAuth: true,
        facilityId: action.values.facilityId,
      };
      break;
    case 'UPDATE_MENU':
      const index = action.values.index;
      const menu = [...state.menuItems];
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
      return { ...state, error: action.error.response.data.message, loading: false };
      break;
    case 'GET_AUTH_SUCCESS':
      if (action.payload.token !== null) {
        localStorage.setItem("facilityId", action.payload.facilityId)
        localStorage.setItem("userId", action.payload.user.id)
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        
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
