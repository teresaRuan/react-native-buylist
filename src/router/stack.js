import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import React from 'react';
import Personal from '../views/personal';
import Home from '../views/home';
import Add from '../views/add';
import Order from '../views/order';
import Select from '../views/select';
import Icon from '../component/Icon';

const Tab = TabNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: {
        title: 'P',
        tabBarIcon: ({ focused, tintColor }) => <Icon name={'home'} />
      }
    },
    Add: {
      screen: Add,
      navigationOptions: {
        title: '添加心愿',
        tabBarIcon: ({ focused, tintColor }) => <Icon name={'add'} />
      }
    },
    Order: {
      screen: Order,
      navigationOptions: {
        title: '心愿单',
        tabBarIcon: ({ focused, tintColor }) => <Icon name={'order'} />
      }
    }
  },
  {
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      },
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight: '300'
      },
      tabBarComponent: TabBarBottom
    }
  }
);
const Navigator = StackNavigator(
  {
    Tab: {
      screen: Tab,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff'
        }
      }
    },
    Person: {
      screen: Personal,
      navigationOptions: {
        title: '',
        headerStyle: {
          backgroundColor: '#48a7bd',
          borderBottomWidth: 0
        },
        headerTintColor: '#fff'
      }
    },
    Select: {
      screen: Select
    }
  },
  {
    mode: 'modal',
    navigationOptions: {
      headerBackTitle: null
    }
  }
);
export default Navigator;
