import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import EntryPoint from "./EntryPoint";

AppRegistry.registerComponent(appName, () => EntryPoint);
