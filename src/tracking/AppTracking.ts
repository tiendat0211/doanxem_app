
// @ts-ignore
import analytics, { ScreenViewParameters } from "@react-native-firebase/analytics";
import TrackingConstants, {TrackingObject} from "./TrackingConst";

export default class AppTracking {
  static logCustomEvent<EventKey extends keyof TrackingConstants>(event: EventKey, object?: Partial<TrackingObject>) {
    analytics()
      .logEvent(event, object)
      .then(() => {
        console.log("[Tracking]", event, JSON.stringify(object, null, 2));
      })
      .catch((error) => {
        console.error("[Tracking Error]", event, error);
      });
  }

  static logScreenView(params: ScreenViewParameters) {
    analytics()
      .logScreenView(params)
      .then(() => {
        console.log("[Tracking] navigate screen", JSON.stringify(params, null, 2));
      })
      .catch((error) => {
        console.error("[Tracking Error] navigate screen", error);
      });
  }
}
