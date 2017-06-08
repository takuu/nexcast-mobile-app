import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'
import PropTypes from 'prop-types';

import { NativeRouter, Route, Link } from 'react-router-native'
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import store from './store'

import TabBar from './navigation/TabBar';

const App = () => (
  <Provider store={store}>
    <TabBar />
  </Provider>
);

/*const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.subContainer}>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}

{/!*
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>

          <Route path="/queue" component={Queue}/>
          <Route path="/userpodcasts" component={UserPodcasts}/>
          <Route path="/search" component={Search}/>
          <Route path="/discover" component={Discover}/>
          <Route path="/profile" component={Profile}/>
          *!/}

        </View>

        <View style={styles.nav}>
          <Link
            to="/queue"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="logo-buffer" size={32} color="#888" />
              <Text style={{color: "#888888", fontSize: 10}}>Queue</Text>
            </View>

          </Link>
          <Link
            to="/userpodcasts"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-mic" size={32} color="#888" />
              <Text style={{color: "#888888", fontSize: 10}}>Podcasts</Text>
            </View>
          </Link>
          <Link
            to="/search"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-search" size={32} color="#888" />
              <Text style={{color: "#888888", fontSize: 10}}>Search</Text>
            </View>
          </Link>
          <Link
            to="/discover"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-star" size={32} color="#888" />
              <Text style={{color: "#888888", fontSize: 10}}>Discover</Text>
            </View>
          </Link>
          <Link
            to="/profile"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-person" size={32} color="#888" />
              <Text style={{color: "#888888", fontSize: 10}}>Profile</Text>
            </View>
          </Link>

        </View>
      </View>
    </NativeRouter>
  </Provider>
)*/

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  subContainer: {
    height: '86.5%'
  },
  header: {
    height: '5%',
    backgroundColor: '#387ef5',
    zIndex: 1000
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    height: 51,
    borderTopColor: '#B2B2B2',
    borderTopWidth: 1,
    backgroundColor: '#F8F8F8',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  }
})
export default App;

// AppRegistry.registerComponent('MyApp', () => App);
