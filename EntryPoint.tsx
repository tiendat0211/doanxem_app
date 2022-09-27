import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, UIManager } from "react-native";
import { sleep } from "./src/utils/Utils";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import App from "./App";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={async () => {
          await sleep(1000);
        }}
        persistor={persistor}
        loading={
          <SplashScreen />
        }>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}>
          <App />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;

