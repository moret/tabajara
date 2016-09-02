/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

fakeDisciplinesApi = [
  {
    name: 'Biologia',
    slug: 'biologia',
    textColor: '#34474c',
    backgroundColor: '#fce74f'
  },
  {
    name: 'Química',
    slug: 'quimica',
    textColor: '#ffffff',
    backgroundColor: '#175782'
  }
];

class tabajara extends Component {
  constructor(props) {
    super(props);
    this.disciplinesStyles = null;
    this.state = {
      disciplines: [],
      loading: true
    };
    setTimeout(this.loadDisciplines, 600);
  }

  loadDisciplines = () => {
    const disciplinesStyles = {};
    fakeDisciplinesApi.forEach(discipline => {
      disciplinesStyles[discipline.slug] = {
        color: discipline.textColor,
        backgroundColor: discipline.backgroundColor
      };
    });
    this.disciplinesStyles = StyleSheet.create(disciplinesStyles);
    this.setState({
      disciplines: fakeDisciplinesApi,
      loading: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLoading()}
        {this.renderDisciplines()}
      </View>
    );
  }

  renderLoading = () => {
    if (this.state.loading) {
      return (
        <Text style={styles.loading}>
          A carregar...
        </Text>
      );
    }
  };

  renderDisciplines = () => {
    if (this.state.disciplines.length) {
      return this.state.disciplines.map(discipline => (
        <Text
          key={discipline.slug}
          style={[
            styles.discipline,
            this.disciplinesStyles[discipline.slug]
          ]}
        >
          {discipline.name}
        </Text>
      ));
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  discipline: {
    textAlign: 'center',
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('tabajara', () => tabajara);
