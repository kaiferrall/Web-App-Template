import axios from "axios";
import store from "../../store";
import { setAuthStatus } from "../../actions/user/auth";
import history from "../../utils/history";

const { dispatch } = store;

export const login = async cmp => {
  cmp.setState({ loading: true });
  const { email, password } = cmp.state;
  try {
    let input = { email, password };
    let res = await axios.post("/api/user/authenticate", input);
    setAuthStatus(
      dispatch,
      res.data.token,
      res.data.user,
      res.data.authenticated
    );
    history.push("/home");
  } catch (e) {
    cmp.setState({ errors: e.response.data.data, loading: false });
  }
};

export const register = async cmp => {
  cmp.setState({ loading: true });
  const { email, name, password, confirm } = cmp.state;
  try {
    let input = { email, name, password, confirm };
    let res = await axios.post("/api/user/create", input);
    cmp.setState({ loading: false });
    setAuthStatus(
      dispatch,
      res.data.token,
      res.data.user,
      res.data.authenticated
    );
    history.push("/home");
  } catch (e) {
    cmp.setState({ errors: e.response.data.data, loading: false });
  }
};

export const forgotPassword = async cmp => {
  cmp.setState({ loading: true });
  const { email } = cmp.state;
  try {
    let input = { email };
    await axios.post("/api/user/recover-password", input);
    cmp.setState({
      messages: "Your password reset link has been sent to your email.",
      errors: null,
      loading: false
    });
  } catch (e) {
    cmp.setState({ errors: e.response.data.data, loading: false });
  }
};

export const resetPassword = async cmp => {
  cmp.setState({ loading: true });
  const { token, password, confirm } = cmp.state;
  try {
    let input = { token, password, confirm };
    await axios.put("/api/user/reset-password", input);
    window.location.href = "/user/login";
  } catch (e) {
    cmp.setState({ errors: e.response.data.data, loading: false });
  }
};

export const confirmEmail = async cmp => {
  cmp.setState({ loading: true });
  const { token } = cmp.state;
  try {
    let input = { token };
    await axios.put("/api/user/confirm-email", input);
    cmp.setState({ messages: "Email confirmed", loading: false });
  } catch (e) {
    cmp.setState({ errors: e.response.data.data, loading: false });
  }
};
