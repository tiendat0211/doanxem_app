import React from 'react';
import {View, ViewProps} from 'react-native';
import { unit8 } from "../../utils/appUnit";

interface ItemSeparatorView extends ViewProps {}

const ItemSeparatorView: React.FC<ItemSeparatorView> = ({style}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          height: 1,
          backgroundColor: 'black',
          marginVertical: unit8,
        },
        style,
      ]}
    />
  );
};

export default ItemSeparatorView;
