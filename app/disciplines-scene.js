import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const client = new Lokka({
  transport: new Transport(
    'http://dev.descomplica.com.br:3000/graphql'
  )
});

class DisciplinesScene extends Component {
  constructor(props) {
    super(props);
    this.disciplinesStyles = null;
    this.state = {
      disciplines: [],
      loading: true
    };
  }

  componentDidMount() {
    client.query(`{
      chimera {
        navigation(slug: "mobile") {
          slug
          disciplines {
            name
            slug
            bannerTextColor
            bannerBgColor
          }
        }
      }
    }`).then(this.loadDisciplines);
  }

  loadDisciplines = (result) => {
    const disciplines = result.chimera.navigation.disciplines;
    const disciplinesStyles = {};
    disciplines.forEach(discipline => {
      disciplinesStyles[discipline.slug] = {
        color: discipline.bannerTextColor,
        backgroundColor: discipline.bannerBgColor
      };
    });
    this.disciplinesStyles = StyleSheet.create(disciplinesStyles);
    this.setState({
      disciplines: disciplines,
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
        <TouchableHighlight
          key={discipline.slug}
          onPress={() => {
            this.props.onSelected(discipline.slug)
          }}
        >
          <Text
            style={[
              styles.discipline,
              this.disciplinesStyles[discipline.slug]
            ]}
          >
            {discipline.name}
          </Text>
        </TouchableHighlight>
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

export default DisciplinesScene;
