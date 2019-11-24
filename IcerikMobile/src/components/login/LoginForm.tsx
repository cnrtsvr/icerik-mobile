import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axios from '../../axios';
import { connect } from 'react-redux';
import { saveUserLoginData, saveToken, saveUserId } from '../../redux/UserActions';
import {IUserLoginData} from "../../redux/types/user";

export interface Props {
  dispatch: {
    saveUserLoginData: typeof saveUserLoginData,
    saveToken: typeof saveToken,
    saveUserId: typeof saveUserId,
  },
  parentNavigate: any
}

export interface State {
  email: string | null,
  password: string | null,
  loginAsId: number | null,
}

class LoginForm extends React.Component<Props, State> {
  private passwordInput: TextInput | null;
  constructor(props: Props) {
    super(props);
    this.state = {
      email   : null,
      password: null,
      loginAsId: null
    };
    this.passwordInput = null;
  }

  onButtonPress = () => {
    const { email, password } = this.state;

    axios.post('v1/auth/login', {
      email,
      password,
    },{
      auth: {
        username: process.env.REACT_APP_LOGIN_AUTH_USERNAME || '',
        password: process.env.REACT_APP_LOGIN_AUTH_PASSWORD || ''
      }
    }).then((response) => {
      this.saveAndRedirect(response.data);
    }).catch((e) => {
      console.log(e.response.data.message);
    });
  };

  onButtonPressLoginAs = () => {
    const { loginAsId } = this.state;

    axios.post('v1/auth/login', {
      email: process.env.REACT_APP_LOGIN_ADMIN_USERNAME || '',
      password: process.env.REACT_APP_LOGIN_ADMIN_PASSWORD || '',
    },{
      auth: {
        username: process.env.REACT_APP_LOGIN_AUTH_USERNAME || '',
        password: process.env.REACT_APP_LOGIN_AUTH_PASSWORD || ''
      }
    }).then((resp) => {
      this.saveAndRedirect(resp.data, true);
      axios.post('edmin/user/loginwith', {
        id: loginAsId
      }).then((response) => {
        this.saveAndRedirect(response.data);
      }).catch((e) => {
        console.log(e.response.data.message);
      });
    }).catch((e) => {
      console.log(e.response.data.message);
    });
  };

  saveAndRedirect(data: IUserLoginData, noRedirect = false) {
    const { dispatch, parentNavigate } = this.props;

    dispatch.saveUserLoginData(data);
    dispatch.saveToken(data.api_key);
    dispatch.saveUserId(data.user_id);
    if (!noRedirect) {
      parentNavigate.navigate('Home');
    }
  }

  render() {
    return(
        <View style={styles.container}>
          <TextInput style = {styles.input}
                     onChangeText={(email) => this.setState({email})}
                     autoCapitalize="none"
                     onSubmitEditing={() => this.passwordInput && this.passwordInput.focus()}
                     autoCorrect={false}
                     keyboardType='email-address'
                     returnKeyType="next"
                     placeholder='Email'
                     placeholderTextColor='#868686'/>

          <TextInput style = {styles.input}
                     onChangeText={(password) => this.setState({password})}
                     returnKeyType="go"
                     ref={(input)=> this.passwordInput = input}
                     placeholder='Şifre'
                     placeholderTextColor='#868686'
                     secureTextEntry/>

          <TouchableOpacity style={styles.button}
                            onPress={this.onButtonPress}>
            <Text  style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TextInput style = {styles.input}
                     onChangeText={(loginAsId) =>
                       this.setState({
                         loginAsId: Number(loginAsId)
                       })
                     }
                     autoCapitalize="none"
                     autoCorrect={false}
                     keyboardType='number-pad'
                     returnKeyType="next"
                     placeholder='ID'
                     placeholderTextColor='#868686'/>

          <TouchableOpacity style={styles.button}
                            onPress={this.onButtonPressLoginAs}>
            <Text  style={styles.buttonText}>Login As</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#4f83cc',
    marginVertical: 10,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});

const mapDispatchToProps = {
  dispatch: {
    saveUserLoginData,
    saveToken,
    saveUserId
  }
};

export default connect(null, mapDispatchToProps)(LoginForm);
