import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Logout: undefined;
};

export type AppDrawerNavigationProp = DrawerNavigationProp<RootStackParamList>;
