import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { Platform, StatusBar } from "react-native";
import AppColors from "./src/styles/AppColors";
import useAuth from "./src/hooks/useAuth";
import { addOnUnAuthorizeListener, setAccessToken } from "./src/network/client";
import OnboardingSceen from "./src/screens/OnboardingSceen/OnboardingSceen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import VerifyOTPScreen from "./src/screens/VerifyOTPScreen/VerifyOTPScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen/ResetPasswordScreen";
import MyDrawer from "./src/screens/HomeScreen/MyDrawer";
import RuleWithLoginScreen from "./src/screens/RuleWithLoginScreen/RuleWithLoginScreen";
import SettingScreen from "./src/screens/SettingScreen/SettingScreen";
import FilterScreen from "./src/screens/FilterScreen/FilterScreen";
import LanguageScreen from "./src/screens/LanguageScreen/LanguageScreen";
import ViewModeScreen from "./src/screens/ViewModeScreen/ViewModeScreen";
import NotiSettingScreen from "./src/screens/NotiSettingScreen/NotiSettingScreen";
import BlockUserScreen from "./src/screens/BlockUserScreen/BlockUserScreen";
import DetailProfileScreen from "./src/screens/DetailProfileScreen/DetailProfileScreen";
import ChangPasswordScreen from "./src/screens/ChangePasswordScreen/ChangePasswordScreen";
import { useTheme } from "./src/hooks/useTheme";
import CreatePostScreen from "./src/screens/CreatePostScreen/CreatePostScreen";
import DetailStatusScreen from "./src/screens/DetailPostScreen/DetailPostScreen";
import DetailImage from "./src/screens/DetailImage/DetailImage";
import AnotherUserScreen from "./src/screens/AnotherUserScreen/AnotherUserScreen";
import AppTracking from "./src/tracking/AppTracking";
import { PostModel } from "./src/model/ApiModel/PostModel";
import analytics from "@react-native-firebase/analytics";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileSceen";
import AppStateTrackingWrapper from "./src/tracking/AppStateTrackingWrapper";

export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  HomeScreen: undefined,
  OnboardingSceen: undefined,
  ForgotPasswordScreen: undefined,
  VerifyOTPScreen: undefined,
  RestPassWordScreen: undefined,
  RuleWithLoginScreen: undefined,
  MyDrawer: undefined,
  SettingScreen: undefined,
  FilterScreen: undefined,
  LanguageScreen: undefined,
  ViewModeScreen: undefined,
  NotiSettingScreen: undefined,
  BlockUserScreen: undefined,
  DetailProfileScreen: undefined,
  ChangPasswordScreen: undefined,
  CreatePostScreen: undefined,
  DetailPostScreen: {
    postID: string,
    onUpdatePost: (post?: PostModel) => void,
  },
  ProfileScreen: {
    goback: boolean,
  },
  DetailImage: {
    img_url?: string,
    thumbnail?: string,
  },
  AnotherUserScreen: {
    user_uuid?: string,
  }
};

export const RootStack = createStackNavigator<RootStackParamList>();
export const NavigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

const App = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const { colorPallet, theme } = useTheme();

  useEffect(() => {
    addOnUnAuthorizeListener(() => {
      signOut();
    });
  }, []);

  useEffect(() => {
    async function initFirebaseProperties() {
      if (authData?.user && authData?.token) {
        const user = authData?.user;
        await analytics().setUserId(user?.id.toString());
      }
    }

    const appStartTime = new Date();

    initFirebaseProperties().finally(() => {
      console.log("[Firebase] init Firebase Properties");
    });

    return () => {
      const appEndTime = new Date();
      const totalOnAppTime = appEndTime.getTime() - appStartTime.getTime();

      AppTracking.logCustomEvent("use_app_time", {
        duration_millisecond: totalOnAppTime,
      });
    };
  }, []);

  setAccessToken(authData.token);
  const routeNameRef = React.useRef<string>();

  return <AppStateTrackingWrapper>
  <SafeAreaProvider
    initialMetrics={initialWindowMetrics}>
    <StatusBar
      translucent
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={AppColors.color_transparent}
    />
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colorPallet.color_background_3,
        },
      }}
      onReady={() => {
        routeNameRef.current = NavigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        let currentRouteName = NavigationRef?.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          AppTracking.logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
      ref={NavigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: Platform.OS === "ios",
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {
          user
            ?
            <>
              <RootStack.Screen
                name={"MyDrawer"}
                component={MyDrawer}
              />

              <RootStack.Screen
                name={"HomeScreen"}
                component={HomeScreen} />

              <RootStack.Screen
                name={"SettingScreen"}
                component={SettingScreen} />

              <RootStack.Screen
                name={"FilterScreen"}
                component={FilterScreen} />

              <RootStack.Screen
                name={"LanguageScreen"}
                component={LanguageScreen} />
              <RootStack.Screen
                name={"ViewModeScreen"}
                component={ViewModeScreen} />
              <RootStack.Screen
                name={"NotiSettingScreen"}
                component={NotiSettingScreen} />
              <RootStack.Screen
                name={"BlockUserScreen"}
                component={BlockUserScreen} />
              <RootStack.Screen
                name={"DetailProfileScreen"}
                component={DetailProfileScreen} />
              <RootStack.Screen
                name={"ChangPasswordScreen"}
                component={ChangPasswordScreen} />
              <RootStack.Screen
                name={"CreatePostScreen"}
                component={CreatePostScreen}/>
                <RootStack.Screen
                name={"ProfileScreen"}
                component={ProfileScreen}/>
              <RootStack.Screen
                name={"DetailPostScreen"}
                component={DetailStatusScreen}
                // options={{
                //   gestureEnabled :false
                // }}
                />
              <RootStack.Screen
                name={"DetailImage"}
                component={DetailImage} />
              <RootStack.Screen
                name={"AnotherUserScreen"}
                component={AnotherUserScreen} />

            </>
            :
            <>
              <RootStack.Screen
                name={"OnboardingSceen"}
                component={OnboardingSceen} />

              <RootStack.Screen
                name={"LoginScreen"}
                component={LoginScreen} />

              <RootStack.Screen
                name={"RegisterScreen"}
                component={RegisterScreen} />

              <RootStack.Screen
                name={"ForgotPasswordScreen"}
                component={ForgotPasswordScreen} />
              <RootStack.Screen
                name={"VerifyOTPScreen"}
                component={VerifyOTPScreen} />
              <RootStack.Screen
                name={"RestPassWordScreen"}
                component={ResetPasswordScreen} />
              <RootStack.Screen
                name={"RuleWithLoginScreen"}
                component={RuleWithLoginScreen} />
            </>
        }
      </RootStack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  </AppStateTrackingWrapper>;
};


export default App;
