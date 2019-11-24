import React from 'react';
import {View} from "react-native";

class AppDivider extends React.Component {
  render() {
    return (
        <View style={{
          width: '100%',
          marginTop: 5,
          marginBottom: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}/>
    )
  }
}

export default AppDivider;
