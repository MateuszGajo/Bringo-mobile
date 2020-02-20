import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";

const DrawerUnAuth = createDrawerNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "SignIn",
      drawerLockMode: "locked-closed"
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "SignUp",
      drawerLockMode: "locked-closed"
    }
  }
});

export default createAppContainer(DrawerUnAuth);
