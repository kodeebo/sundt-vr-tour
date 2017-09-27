import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Mesh,
  VrButton,
  Animated,
  Video,
  Model,
  PointLight
} from 'react-vr';

import ChimpAnimation from './components/ChimpAnimation';
import {Easing} from 'react-native';

export default class sundtTour extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {
    current_scene : {},
    fadeInOp: new Animated.Value(0),
  };
}


componentWillMount() {
  this.setState({
      current_scene: this.scenes[0],
  });
}

scenes = [{
  scene_image: 'initial.JPG',
  step: 1,
  rotateScene: [0,0,3],
  navigations: [{
      step: 2,
      rotation: -130,
      scale: new Animated.Value(1),
    },
    {
      step: 3,
      rotation: -85,
      scale: new Animated.Value(1),
  }]
}, {
  scene_image: 'step2.JPG',
  step: 2,
  rotateScene: [0,90,0],
  navigations: [{
      step: 3,
      rotation: 90,
      scale: new Animated.Value(1),
    },
    {
      step: 1,
      rotation: -45,
      scale: new Animated.Value(1),
  }]
}, {
  scene_image: 'step3.JPG',
  step: 3,
  rotateScene: [0,180,0],
  navigations: [{
      step: 4,
      rotation: -180,
      scale: new Animated.Value(1),
      },
      {
        step: 3,
        rotation: 10,
        scale: new Animated.Value(1),
    },
    {
      step: 1,
      rotation: 120,
      scale: new Animated.Value(1),
    }]
}, {
  scene_image: 'step4.JPG',
  step: 4,
  rotateScene: [0,180,0],
  navigations: [{
      step: 5,
      rotation: 0,
      scale: new Animated.Value(1),
    },
    {
      step: 3,
      rotation: -180,
      scale: new Animated.Value(1),
  }]
}, {
  scene_image: 'step5.JPG',
  step: 5,
  rotateScene: [0,0,0],
  navigations: [{
      step: 4,
      rotation: 180,
      scale: new Animated.Value(1),
  }]
}];

onNavigationClick = (item, e) => {
  console.log(item);
  Animated.timing(
    this.state.fadeInOp,
    {
      toValue: 0,
      duration: 1000,
      easing: Easing.in,
    }
  ).start(() => Animated.timing(
    this.state.fadeInOp,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.in,
    }
  ).start());
  console.log(e.nativeEvent.inputEvent.button);
  if (e.nativeEvent.inputEvent.eventType === "mouseup" && e.nativeEvent.inputEvent.button === 0) {
      var new_scene = this.scenes.find(i => i['step'] === item.step);
      this.setState({
          current_scene: new_scene
      });
  }
}

onNavigationEnter = i => {
  Animated.timing(i.scale, {toValue: 2}).start();
}

onNavigationExit = i => {
  Animated.timing(i.scale, {toValue: 1}).start();
}

  render() {
    const AnimatedButton = Animated.createAnimatedComponent(VrButton);
    return (<View><Animated.View
    style={{
      opacity: this.state.fadeInOp,
    }}>
        <Pano
          source = {
              asset(this.state.current_scene.scene_image)
          }
          style = {{
                  transform: [{
                      translate: [0, 0, 0],
                  },
                  {
                    rotateX: this.state.current_scene.rotateScene[0],},
                    {
                    rotateZ: this.state.current_scene.rotateScene[2],},
                    {
                    rotateY: this.state.current_scene.rotateScene[1],
                  }]
              }}
          /></Animated.View>
          {this.state.current_scene.step === 1 && <View>
            <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
            <Video loop style={{
              width: 3.0, 
              height:2.0,
              transform: [{
                translate: [-2.7,-2,-5]
              }, {
                rotateY: -4,
              }]
              }} source={ asset('fire.mp4') } />
            <Text
          style={{
            transform: [{translate: [3.5, 1.8, -3]}]
          }}>We love react VR</Text>
          <ChimpAnimation transform={[{translate: [5, -4, -5]}]} />
          </View>}

          {this.state.current_scene['navigations'].map((item, i) => (
              <View
              key={i}
              style={{
                transform: [{
                  rotateY: item.rotation,
                }]
              }}>
                <AnimatedButton
              onClick={e => this.onNavigationClick(item, e)}
              onEnter={() => this.onNavigationEnter(item)}
              onExit={() => this.onNavigationExit(item)}
              style={{
                      width: 0.15,
                      height: 0.15,
                      borderRadius: 50,
                      backgroundColor: 'blue',
                      transform: [{
                        translate: [0,2,-4]
                    },{scale: item.scale}]
                  }}
                >
              </AnimatedButton> 
              </View>
              ))}
            </View>);
  };
};

AppRegistry.registerComponent('sundtTour', () => sundtTour);
