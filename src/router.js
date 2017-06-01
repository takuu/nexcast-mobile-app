import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import configureStore from './lib/configureStore'

import Search from './containers/Search';
import Discover from './containers/Discover';
import Profile from './containers/Profile';
import Queue from './containers/Queue';
import UserPodcasts from './containers/UserPodcasts';


function getInitialState () {
  const _initState = {
    auth: {},
    device: {},
    global: {},
    profile: {}
  }
  return _initState
}


const Home = () => (
  <Text style={styles.header}>
    Home
  </Text>
)

const About = () => (
  <Text style={styles.header}>
    About
  </Text>
)

const Topic = ({ match }) => (
  <Text style={styles.topic}>
    {match.params.topicId}
  </Text>
)

const Topics = ({ match }) => (
  <View>
    <Text style={styles.header}>Topics</Text>
    <View>
      <Link
        to={`${match.url}/rendering`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
        <Text>Rendering with React</Text>
      </Link>
      <Link
        to={`${match.url}/components`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
        <Text>Components</Text>
      </Link>
      <Link
        to={`${match.url}/props-v-state`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
        <Text>Props v. State</Text>
      </Link>
    </View>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <Text style={styles.topic}>Please select a topic.</Text>
    )} />
  </View>
)

const store = configureStore(getInitialState())

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.subContainer}>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>

          <Route path="/queue" component={Queue}/>
          <Route path="/userpodcasts" component={UserPodcasts}/>
          <Route path="/search" component={Search}/>
          <Route path="/discover" component={Discover}/>
          <Route path="/profile" component={Profile}/>
        </View>

        <View style={styles.nav}>
          <Link
            to="/queue"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="logo-buffer" size={32} color="#eee" />
              <Text style={{color: "#888888", fontSize: 10}}>Queue</Text>
            </View>

          </Link>
          <Link
            to="/userpodcasts"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-mic" size={32} color="#eee" />
              <Text style={{color: "#888888", fontSize: 10}}>Podcasts</Text>
            </View>
          </Link>
          <Link
            to="/search"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-search" size={32} color="#eee" />
              <Text style={{color: "#888888", fontSize: 10}}>Search</Text>
            </View>
          </Link>
          <Link
            to="/discover"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-star" size={32} color="#eee" />
              <Text style={{color: "#888888", fontSize: 10}}>Discover</Text>
            </View>
          </Link>
          <Link
            to="/profile"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
              <Ionicons name="ios-person" size={32} color="#eee" />
              <Text style={{color: "#888888", fontSize: 10}}>Profile</Text>
            </View>
          </Link>

        </View>
      </View>
    </NativeRouter>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  subContainer: {
    height: '87%'
  },
  header: {
    fontSize: 20,
    height: '5%',
    backgroundColor: '#387ef5',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    height: 51,
    backgroundColor: '#ffffff',
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
