import React, { useCallback } from "react";
import { GestureResponderEvent, Pressable, PressableProps } from "react-native";
// @ts-ignore
import { debounce } from "lodash";

export interface PressViewProps extends PressableProps {
  singleClick?: boolean;
}

const WAIT_SINGLE_CLICK_TIME = 300;

const PressView: React.FC<PressViewProps> = (props) => {
  const { singleClick } = props;

  const onSingleClick = useCallback(debounce((event: GestureResponderEvent) => {
    if (props.onPress) {
      props.onPress(event);
    }
  }, WAIT_SINGLE_CLICK_TIME), []);

  return <Pressable
    {...props}
    onPress={(event) => {
      if (!singleClick) {
        if(props.onPress) {
          props.onPress(event);
        }
      } else {
        onSingleClick(event);
      }
    }}
    style={
      ({ pressed }) => [
        props.style as {},
        { opacity: pressed ? 0.7 : 1 },
      ]}>
    {props.children}
  </Pressable>;
};

export default PressView;
