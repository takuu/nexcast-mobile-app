import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'
import { Provider } from 'react-redux'

import configureStore from './lib/configureStore'

import Search from './containers/Search';
import Discover from './containers/Discover';
import Profile from './containers/Profile';


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
        <View style={styles.nav}>
          <Link
            to="/"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <Text>Home</Text>
          </Link>
          <Link
            to="/search"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
            <Text>Search</Text>
          </Link>
          <Link
            to="/discover"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <Text>Discover</Text>
          </Link>
          <Link
            to="/profile"
            underlayColor='#f0f4f7'
            style={styles.navItem} >
            <Text>Profile</Text>
          </Link>
        </View>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
        <Route path="/search" component={Search}/>
        <Route path="/discover" component={Discover}/>
        <Route path="/profile" component={Profile}/>
      </View>
    </NativeRouter>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
