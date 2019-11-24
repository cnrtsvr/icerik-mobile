import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../views/HomeScreen';
import HomeActiveJobList from '../home/HomeActiveJobsList';
import HomeFinishedJobList from '../home/HomeFinishedJobsList';
import LoginScreen from '../views/LoginScreen';
import SplashScreen from "../views/SplashScreen";
import ProfileScreen from "../views/ProfileScreen";
import BalanceScreen from '../views/BalanceScreen';
import ContentPoolListWriter from "../content/content-pool-list/ContentPoolListWriter";
import ContentPoolListEditor from "../content/content-pool-list/ContentPoolListEditor";
import {Icon} from "native-base";
import ContentPoolDetailEditor from "../content/content-pool-detail/ContentPoolDetailEditor";
import ContentPoolDetailWriter from "../content/content-pool-detail/ContentPoolDetailWriter";
import ContentDetailWriter from '../content/content-detail/ContentDetailWriter';
import ContentDetailEditor from '../content/content-detail/ContentDetailEditor';
import {Image} from "react-native";


const editorPoolDetail = createStackNavigator(
    {
      EditorPoolList: ContentPoolListEditor,
      EditorPoolDetail: ContentPoolDetailEditor
    },
    {
      initialRouteName: 'EditorPoolList',
      headerMode: 'none',
      navigationOptions: {
        tabBarLabel: 'Editör',
        tabBarIcon: () => {
          return (
              <Image style={{width: 24, height: 24}} source={require('../../assets/img/editor-icon.png')}/>
          )
        },
      }
    }
);

const writerPoolDetail = createStackNavigator(
    {
      WriterPoolList: ContentPoolListWriter,
      WriterPoolDetail: ContentPoolDetailWriter
    },
    {
      initialRouteName: 'WriterPoolList',
      headerMode: 'none',
      navigationOptions: {
        tabBarLabel: 'Yazar',
        tabBarIcon: () => {
          return (
              <Image style={{width: 24, height: 24}} source={require('../../assets/img/yazar-icon.png')}/>
          )
        },
      }
    }
);

const ContentPoolTabs = createBottomTabNavigator(
    {
      WriterPool: writerPoolDetail,
      EditorPool: editorPoolDetail,
    },
    {
      initialRouteName: 'WriterPool',
    },
);

const HomeStack = createStackNavigator(
    {
      HomeScreen: HomeScreen,
      ActiveJobList: HomeActiveJobList,
      FinishedJobList: HomeFinishedJobList,
      WriterContentDetail: ContentDetailWriter,
      EditorContentDetail: ContentDetailEditor
    },
    {
      initialRouteName: 'HomeScreen',
      headerMode: 'none'
    }
);

const BalanceStack = createStackNavigator(
    {
      BalanceScreen: BalanceScreen
    },
    {
      initialRouteName: 'BalanceScreen',
      headerMode: 'none'
    }
);

const AppStack = createDrawerNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          drawerLabel: 'Ana Sayfa',
          drawerIcon: (
              <Icon name='home'/>
          ),
        }
      },
      ContentPool: {
        screen: ContentPoolTabs,
        navigationOptions: {
          drawerLabel: 'İçerik Havuzu',
          drawerIcon: (
              <Icon name='albums'/>
          ),
        }
      },
      Balance: {
        screen: BalanceStack,
        navigationOptions: {
          drawerLabel: 'Bakiyem',
          drawerIcon: (
              <Icon name='cash'/>
          )
        }
      },
      Profile: ProfileScreen,
    },
);

const AuthStack = createStackNavigator(
    {
      Login: LoginScreen,
    },
);

const switchNavigator = createSwitchNavigator(
    {
      Splash: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Splash',
    },
);

export default createAppContainer(switchNavigator);
