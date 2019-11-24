import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, H2 } from 'native-base';
import AppDivider from '../../core/AppDivider';

export interface Props {
  isVisible: boolean,
  acceptJob: Function,
  userTypeId: number
}

export interface State {
  writerInfo: string,
  editorInfo: string
}

class ContentPoolDetailToSDialog extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      writerInfo: 'Bu içeriğin yazarlığını üzerine almak üzeresin. Yazarlığını ' +
          'üstlendiğin bir içeriği bıraktığında ya da teslim tarihini geçirdiğinde ' +
          'hem ücretini alamayacağını, hem de sistemdeki puanının olumsuz ' +
          'etkileneceğini hatırlatmak isteriz. İşi kabul ettiğinde kullanıcı sözleşmesini ' +
          'de kabul etmiş sayılacaksın. Kolay gelsin!',
      editorInfo: 'Bu içeriğin editörlüğünü üzerine almak üzeresin. Editörlüğünü ' +
          'üstlendiğin bir içeriği bıraktığında ya da teslim tarihini geçirdiğinde ' +
          'hem ücretini alamayacağını, hem de sistemdeki puanının olumsuz ' +
          'etkileneceğini hatırlatmak isteriz. İşi kabul ettiğinde kullanıcı sözleşmesini ' +
          'de kabul etmiş sayılacaksın. Kolay gelsin!'
    }
  }

  render() {
    const { isVisible, acceptJob, userTypeId } = this.props;
    const { writerInfo, editorInfo } = this.state;
    return (
        <View style={styles.modalContainer}>
          <Modal isVisible={isVisible}>
            <View style={styles.content}>
              <H2 style={styles.title}>İşi Kabul Et</H2>
              <AppDivider/>
              <Text style={styles.info}>{userTypeId === 3 ? writerInfo : editorInfo}</Text>
              <Text style={styles.tos}
                    onPress={() => Linking.openURL('https://icerik.com/kullanim-kosullari')}>
                Kullanıcı Sözleşmesi
              </Text>
              <Button block primary style={{marginTop: 10, marginBottom: 10}}
                      onPress={() => acceptJob()}>
                <Text>Kabul Et</Text>
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
  info: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    marginBottom: 10,
    marginTop: 10
  },
  tos: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 20,
    marginBottom: 20
  }
});

export default ContentPoolDetailToSDialog;
