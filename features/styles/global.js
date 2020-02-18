import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

let { width } = Dimensions.get("window");

export default EStyleSheet.build({
  $primaryColor: "#11999e",
  $subColor: "#4a4a4a",
  $smallMargin: 15,
  $mediumMargin: 30,
  $largeMargin: 50,
  $rem: width > 340 ? 20 : 18
});
