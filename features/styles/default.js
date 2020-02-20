import EStyleSheet from "react-native-extended-stylesheet";
export const authentication = EStyleSheet.create({
  textTitle: {
    color: "white",
    fontSize: "2rem",
    marginBottom: "$mediumMargin"
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    height: "10%",
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: "$smallMargin",
    fontSize: 25
  },
  button: {
    width: "90%",
    height: "10%",
    marginTop: "$smallMargin",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D89100",
    borderRadius: 5
  },
  textButton: {
    color: "white",
    fontSize: "1rem"
  },
  marginTop: {
    marginTop: "$mediumMargin"
  }
});
