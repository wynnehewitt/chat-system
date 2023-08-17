import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { AuthContext } from "./AuthContext";
  
  export const UserContext = createContext();
  
  export const UserContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
      chatID: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatID:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
          
          case "CLEAR_USER":
            return INITIAL_STATE;
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <UserContext.Provider value={{ data:state, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  };