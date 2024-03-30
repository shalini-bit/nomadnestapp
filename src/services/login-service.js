import axios from "axios";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const response = await axios.post(
      "https://vast-blue-dove-wig.cyclic.app/api/auth/login",
      {
        number: number,
        password: password,
      }
    );
    const { accessToken, username } = response.data;

    if (!accessToken || !username) {
      throw new Error("Invalid response data from the server.");
    }

    console.log("Logged IN");
    console.log({ accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    setAlert({
      open: true,
      message: "Login Successful!",
      type: "success",
    });
    return { accessToken, username };
  } catch (err) {
    console.error("Login error:", err);
    setAlert({
      open: true,
      message: "Login failed. Please try again.",
      type: "error",
    });
    return { accessToken: null, username: null };
  }
};
