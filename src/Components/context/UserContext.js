import { createContext, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";

export const UserContext = createContext();
const id = secureLocalStorage.getItem("_id");
const uName = secureLocalStorage.getItem("uName");
const uType = secureLocalStorage.getItem("uType");
const name = secureLocalStorage.getItem("name");
const resultDate = secureLocalStorage.getItem("date");
const accessToken = localStorage.getItem("access-token");
const forgotToken = localStorage.getItem("forgot-token");

const initialState = {
  id: id ? id : null,
  uType: uType ? uType : null,
  uName: uName ? uName : null,
  name: name ? name : null,
  resultDate: resultDate ? resultDate : null,
  accessToken: accessToken ? JSON.parse(accessToken) : null,
  forgotToken: forgotToken ? JSON.parse(forgotToken) : null,
};

// const getNmae = async () => {
//   const token = localStorage.getItem("access-token").replaceAll('"', "");
//   if (token) {
//     try {
//       const response = await UserService.getProfile();

//       if (response.status === 200) {
//         secureLocalStorage.setItem("Username", response.data.first_name);
//         secureLocalStorage.setItem("UserId", response.data.id);
//       }
//     } catch (err) {
//       if (err?.response?.status === 404) {
//       } else {
//       }
//     }
//   }
// };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("access-token", JSON.stringify(action.accessToken));
      secureLocalStorage.setItem("_id", action.id);
      secureLocalStorage.setItem("uType", action.uType);
      secureLocalStorage.setItem("uName", action.uName);
      secureLocalStorage.setItem("name", action.name);
      return {
        ...state,
        accessToken: action.accessToken,
        id: action.id,
        uType: action.uType,
        uName: action.uName,
        name: action.name,
      };
    case "UPDATE_PROFILE":
      secureLocalStorage.setItem("_id", action.id);
      secureLocalStorage.setItem("uName", action.uName);
      secureLocalStorage.setItem("uType", action.uType);
      secureLocalStorage.setItem("name", action.name);
      return {
        ...state,
        id: action.id,
        uType: action.uType,
        uName: action.uName,
        name: action.name,
      };
    case "UPDATE_RESULT":
      secureLocalStorage.setItem("date", action.resultDate);
      return {
        ...state,
        resultDate: action.resultDate,
      };

    case "UPDATE_NAME":
      secureLocalStorage.setItem("name", action.name);
      return {
        ...state,
        name: action.name,
      };
    case "UPDATE_TOKEN":
      localStorage.setItem("access-token", JSON.stringify(action.accessToken));
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case "FORGOT":
      localStorage.setItem("forgot-token", JSON.stringify(action.forgotToken));
      return {
        ...state,
        forgotToken: action.forgotToken,
      };
    case "REMOVE_FORGOT":
      localStorage.removeItem("forgot-token");
      return {
        ...state,
        forgotToken: null,
      };
    case "LOGOUT":
      localStorage.removeItem("access-token");
      secureLocalStorage.removeItem("uName");
      secureLocalStorage.removeItem("ip");
      secureLocalStorage.removeItem("_id");
      secureLocalStorage.removeItem("name");
      secureLocalStorage.removeItem("uType");
      return { ...state, accessToken: null };
    default:
      return state;
  }
}

export function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
