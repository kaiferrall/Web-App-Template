import {
  ERROR,
  SET_USER_AUTH_STATUS,
  LOADING_TRUE,
  LOADING_FALSE
} from "../types";
import { setAuthHeader } from "../../utils/setAuthHeader";
import axios from "axios";

export const getUser = () => async dispatch => {
  dispatch({ type: LOADING_TRUE, payload: true });

  if (localStorage.User_Authenticator_Token) {
    setAuthHeader(localStorage.User_Authenticator_Token);
  } else {
    setAuthStatus(dispatch, null, null, false);
  }

  try {
    const res = await axios.get("/api/user/get");
    setAuthStatus(
      dispatch,
      res.data.token,
      res.data.user,
      res.data.authenticated
    );
  } catch (e) {
    localStorage.removeItem("User_Authenticator_Token");
    setAuthStatus(dispatch, null, null, false);
  } finally {
    dispatch({ type: LOADING_FALSE, payload: false });
  }
};

export const setAuthStatus = (dispatch, token, user, authenticated) => {
  if (token) {
    setAuthHeader(token);
    localStorage.setItem("User_Authenticator_Token", token);
  }
  dispatch({ type: SET_USER_AUTH_STATUS, payload: { user, authenticated } });
};
