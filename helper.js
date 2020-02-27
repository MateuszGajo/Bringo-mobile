import * as SecureStore from "expo-secure-store";

export const verifyLogging = (data, dispatch, token, setToken) => {
  const { emailError, passwordError, connectionError } = data.login;

  if (emailError)
    return dispatch({ type: "LOGIN_EMAIL_ERROR", msg: emailError });
  else if (passwordError)
    return dispatch({
      type: "LOGIN_PASSWORD_ERROR",
      msg: passwordError
    });
  else if (connectionError)
    return dispatch({
      type: "LOGIN_CONNECTION_ERROR",
      msg: connectionError
    });

  dispatch({ type: "LOGIN_SUCCESS" });
  SecureStore.setItemAsync("token", token);
  setToken(true);
};

export const verifyRegistering = (data, dispatch, token, setToken) => {
  const { userError, connectionError } = data.createUser;

  if (userError) return dispatch({ type: "EMAIL_ERROR", msg: userError });
  else if (connectionError)
    return dispatch({
      type: "REGISTER_CONNECTION_ERROR",
      msg: connectionError
    });

  dispatch({ type: "REGISTER_SUCCESS" });
  SecureStore.setItemAsync("token", token);
  setToken(true);
};

export const scoreTable = level => {
  const table = {
    A1: 2,
    A2: 4,
    B1: 8,
    B2: 12,
    C1: 24,
    C2: 30
  };
  return table[level];
};

export const levelScoreTable = (userScore, sessionScore, difficulty) => {
  const levelTable = {
    0: "A1",
    800: "A2",
    2500: "B1",
    10000: "B2",
    50000: "C1",
    250000: "C2"
  };
  const scoreArray = [200, 800, 2500, 10000, 50000, 250000];
  let i = 0;
  const allScore = Number(userScore) + sessionScore;

  while (scoreArray[i] < userScore && i < scoreArray.length - 1) {
    if (scoreArray[i + 1] > userScore) {
      if (allScore >= scoreArray[i + 1]) {
        return {
          level: levelTable[scoreArray[i + 1]]
        };
      }
    }
    i++;
  }
  return {
    level: null
  };
};
