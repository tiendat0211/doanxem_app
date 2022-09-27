import { StyleSheet } from "react-native";
import { unit24 } from "../utils/appUnit";

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon24:{
    width:unit24,
    height:unit24
  }
})

export default AppStyles
