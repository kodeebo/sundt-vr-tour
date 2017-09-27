
'use strict';

import React from 'react';
import {asset, Model, Pano, PointLight, Text, View, Animated } from 'react-vr';
import {Easing} from 'react-native';

class ChimpAnimation extends React.Component {
  constructor() {
    super();
    this.state = {rotation: new Animated.Value(0)};
    this.lastUpdate  = Date.now();
    this.restart = this.restart.bind(this);
    this.animate = this.animate.bind(this);
  }

  animate() {
    Animated.timing(this.state.rotation, {toValue: 360, duration: 4000, easing: Easing.linear}).start(this.restart);
  }

  restart() {
    this.setState({rotation: new Animated.Value(0)});
    this.animate();
  }


  componentDidMount() {
    this.animate();
  }

  render() {
    const AnimatedModel = Animated.createAnimatedComponent(Model);

    return (
      <View>
        <AnimatedModel
          style={{
            transform: [
              ...this.props.transform,
              {scale: 0.01},
              {rotateY: this.state.rotation},
              {rotateX: -90},
            ],
          }}
          source={{
            obj: asset('creature/creature.obj'),
            mtl: asset('creature/creature.mtl'),
          }}
          lit
        />
        
      </View>
    );
  }
}

export default ChimpAnimation;