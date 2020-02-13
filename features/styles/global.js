import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from 'react-native'

let { width } = Dimensions.get('window');

export default EStyleSheet.build({
    $primaryColor: "#11999e",
    $marginMedium: 30,
    $rem: width > 340 ? 20 : 18
});