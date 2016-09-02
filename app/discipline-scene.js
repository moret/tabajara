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

class DisciplineScene extends Component {
  constructor(props) {
    super(props);
    this.disciplinesStyles = StyleSheet.create({
      container: {

      },
      discipline: {

      }
    });
    this.state = {
      discipline: null,
      loading: true
    };
  }

  componentDidMount() {
    client.query(`{
      chimera {
        discipline(slug: "${this.props.slug}") {
          name
          bannerTextColor
          bannerBgColor
          slogan
          studyPlans {
            name
          }
        }
      }
    }`).then(this.loadDiscipline);
  }

  loadDiscipline = (result) => {
    const discipline = result.chimera.discipline;
    this.disciplinesStyles = StyleSheet.create({
      container: {
        backgroundColor: discipline.bannerBgColor
      },
      discipline: {
        color: discipline.bannerTextColor
      }
    });
    this.setState({
      discipline: discipline,
      loading: false
    });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.disciplinesStyles.container
        ]}
      >
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Back</Text>
        </TouchableHighlight>
        {this.renderLoading()}
        {this.renderDiscipline()}
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

  renderDiscipline = () => {
    if (this.state.discipline) {
      return (
        <Text
          style={[
            styles.discipline,
            this.disciplinesStyles.discipline
          ]}
        >
          {this.state.discipline.name}
        </Text>
      );
    }
  };

  onBack = () => {
    this.props.navigator.pop();
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
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 5,
  }
});

export default DisciplineScene;
