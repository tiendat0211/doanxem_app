import { Dimensions, FlatList, View, ViewProps } from "react-native";
import React from "react";

interface VirtualizedBackedListProps extends ViewProps {
  isParentVertical?: boolean,
  width?: number,
}

const windowWidth = Dimensions.get("window").width;

const VirtualizedBackedList: React.FC<VirtualizedBackedListProps> = ({ style, width, children, isParentVertical }) => {
  if (!width) {
    width = windowWidth;
  }

  return (
    <FlatList
      style={style}
      horizontal={isParentVertical}
      data={[""]}
      keyExtractor={() => "key"}
      renderItem={() => {
        return <View style={{ width: width }}>{children}</View>;
      }}
      ListHeaderComponentStyle={{
        flex: 1,
      }}
    />
  );
};

VirtualizedBackedList.defaultProps = {
  isParentVertical: true,
};

export default VirtualizedBackedList;
