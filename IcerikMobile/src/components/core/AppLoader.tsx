import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import {Content, Text} from "native-base";

interface Props {
  title?: string
  color?: string
}

class AppLoader extends React.Component<Props> {

  render() {
    const { title, color } = this.props;
    return (
        <Content padder contentContainerStyle={styles.loaderContainer}>
          <View style={styles.loader}>
            <ActivityIndicator size='large' color={color ? color : '#0000ff'}/>
            {
              title ? <Text style={styles.loaderTitle}>{title ? title : ''}</Text> : null
            }
          </View>
        </Content>
    )
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)'
  },
  loader: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loaderTitle: {
    marginTop: 15
  }
});

export default AppLoader;
