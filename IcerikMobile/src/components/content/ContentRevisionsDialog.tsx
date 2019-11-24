import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from "react-native";
import {H2, Text, Button} from "native-base";
import AppDivider from "../core/AppDivider";

export interface Props {
  isVisible: boolean,
  revisions: Array<any>
  closeDialog: Function
}

class ContentRevisionsDialog extends React.Component<Props> {
  render() {
    const {isVisible, revisions, closeDialog} = this.props;

    return(
        <View style={styles.modalContainer}>
          <Modal isVisible={isVisible}>
            <View style={styles.content}>
              <H2 style={styles.title}>Revizyonlar</H2>
              <AppDivider/>
              {
                revisions.map((item, index) => {
                  return (
                      <Text key={'revision_message_' + index} style={styles.messages}>{item.message}</Text>
                  )
                })
              }
              <Button block danger onPress={() => closeDialog()}>
                <Text>Kapat</Text>
              </Button>
            </View>
          </Modal>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'white',
    margin: 22,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: 10,
    marginTop: 10
  },
  messages: {
    marginBottom: 10,
    marginTop: 10
  }
});

export default ContentRevisionsDialog;
