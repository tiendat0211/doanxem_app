import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import dayjs from "dayjs";
import AppTracking from "./AppTracking";

const AppStateTrackingWrapper: React.FC = (props) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let startSession = new Date();
    const subscription = AppState.addEventListener("change", nextAppState => {
      const now = new Date();

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        console.log("Start using", dayjs(now).format());
        startSession = now;
      } else {
        if (appState.current !== "active") {
          console.log("App still background");
        } else {
          console.log(`End ${dayjs(now).format()} using from start`, dayjs(startSession).format());
          const amount = now.getTime() - startSession.getTime();
          AppTracking.logCustomEvent("use_app_time", {
            duration_millisecond: amount,
          });
        }
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>
    {
      props.children
    }
  </>;
};

export default AppStateTrackingWrapper;
