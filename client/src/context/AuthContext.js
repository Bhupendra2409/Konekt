import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
//   user: {
//     success: true,
//     user: {
//         _id: "61e8126fdcca302c77ec3ca2",
//         username: "tachyon",
//         email: "bmalakar441@gmail.com",
//         profilePicture: "person/1.jpeg",
//         coverPicture: "",
//         followers: [
//             "61e81288dcca302c77ec3ca5"
//         ],
//         followings: [
//             "61e81288dcca302c77ec3ca5"
//         ],
//         isAdmin: false,
//         createdAt: "2022-01-19T13:30:23.477Z",
//         __v: 0,
//         relationship: 1
//     }
// },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvier = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children }
    </AuthContext.Provider>
  );
};
