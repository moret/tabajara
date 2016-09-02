import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text
} from 'react-native';

import DisciplinesScene from './app/disciplines-scene';
import DisciplineScene from './app/discipline-scene';

class tabajara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disciplineSlug: null
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Disciplines'}}
        renderScene={(route, navigator) => {
          if (route.name == 'Disciplines') {
            return (
              <DisciplinesScene
                onSelected={disciplineSlug => {
                  navigator.push({
                    name: 'Discipline',
                    slug: disciplineSlug
                  })
                }}
              />
            );
          }
          if (route.name == 'Discipline') {
            return (
              <DisciplineScene
                slug={route.slug}
                onBack={() => {
                  navigator.pop();
                }}
              />
            );
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('tabajara', () => tabajara);
