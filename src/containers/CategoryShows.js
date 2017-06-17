import React, {PropTypes, Component} from 'react';
import {
  ListView,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import ShowItem from '../components/ShowItem';
import Loader from '../components/Loader';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as taggedShowActions from '../reducers/taggedShow/taggedShowActions';
import { NativeRouter, Route, Link } from 'react-router-native';
import CategoryList from './CategoryList';
import Show from '../containers/Show';




class CategoryShows extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false};
    // this._onRefresh = this._onRefresh.bind(this);
  }

  render() {

    return (
      <ScrollView tabLabel='Categories' navigation={this.props.navigation}>
        <CategoryList navigation={this.props.navigation} />
      </ScrollView>
    )
  }

}

export default CategoryShows