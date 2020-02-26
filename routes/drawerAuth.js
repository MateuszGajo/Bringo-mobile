import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";
import CustomDrawerNavigation from "./CustomDrawerNavigation";
import Home from "../screens/home";
import Learning from "../screens/learning";
import Ranking from "../screens/ranking";
import Resume from "../screens/resume";

let { width } = Dimensions.get("window");

const DrawerAuth = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home"
      }
    },
    Learning: {
      screen: Learning,
      navigationOptions: {
        title: "Learning"
      }
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        title: "Ranking"
      }
    },
    Resume: {
      screen: Resume,
      navigationOptions: {
        title: "Resume"
      }
    }
  },
  {
    initialRouteName: "Home",
    drawerPosition: "right",
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerWidth: (width / 3) * 2
  }
);

export default createAppContainer(DrawerAuth);
