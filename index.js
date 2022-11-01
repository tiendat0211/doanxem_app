import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import EntryPoint from "./EntryPoint";
import Promise from "bluebird";

global.Promise = Promise;
global.onunhandledrejection = function onunhandledrejection(error) {
  if (error instanceof Error) {
    console.error("onunhandledrejection", error);
  } else {
    console.log("onunhandledrejection", error);
  }
};

AppRegistry.registerComponent(appName, () => EntryPoint);
