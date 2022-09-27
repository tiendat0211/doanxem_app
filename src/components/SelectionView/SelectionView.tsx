import React from "react";
import { View } from "react-native";
import { isListContain } from "../../utils/Utils";
import SelectItem from "./SelectItem";
import PressView from "../PressView/PressView";

interface SelectionViewProps<T> {
  listData: T[],
  selectedList: T[],
  setSelectedList: React.Dispatch<React.SetStateAction<T[]>>,
  getTitle: (item: T) => string,
  comparator: (itemA: T, itemB: T) => boolean,
  // todo: add custom item view for other type
  itemView?: (title: string, focused: boolean) => React.ReactNode,
  maxSelectedItem?: number,
  // custom layout
  customSelectedView?: (title: string) => React.ReactNode,
  customView?: (title: string) => React.ReactNode,
  disabled?: boolean;
}

function SelectionView<T>(props: SelectionViewProps<T>) {
  let { listData, selectedList, getTitle, comparator, setSelectedList, maxSelectedItem, customSelectedView, customView } = props;


  const toggle = (item: T) => {
    const isContain = isListContain(item, selectedList, comparator);
    if (isContain) {
      setSelectedList(prev => {
        return prev.filter((_item) => {
          return !comparator(_item, item);
        });
      });
    } else {
      setSelectedList(prev => {
        if(maxSelectedItem) {
          return [...prev, item];
        }
        if(prev.length >= maxSelectedItem! ) {
          const newList = [...prev]
          newList.shift()
          return [...newList, item]
        }
        return [...prev, item];
      });
    }
  };

  const isFocused =
    (item:any) => {
      return isListContain(item, selectedList, comparator);
    };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}>
      {
        listData?.map((item, index) => {
          const focused = isFocused(item);

          if(customSelectedView && focused) {
            return <PressView
              key={index}
              onPress={() => toggle(item)}>
              {customSelectedView(getTitle(item))}
            </PressView>
          }

          if(customView && !focused) {
            return <PressView
              key={index}
              onPress={() => toggle(item)}>
              {customView(getTitle(item))}
            </PressView>
          }

          return (
            <SelectItem
              focused={focused}
              key={index}
              title={getTitle(item)}
              onPress={() => toggle(item)} />
          );
        })
      }
    </View>
  );
}

export default SelectionView;
