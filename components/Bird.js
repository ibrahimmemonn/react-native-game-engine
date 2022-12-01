import Matter from 'matter-js';
import React from 'react';
import {View, Image} from 'react-native';
import flappy from '../assets/Flappy.png';

const Bird = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 1.8;
  const yBody = props.body.position.y - heightBody / 2.5;

  const color = props.color;

  return (
    <View>
      <Image
        source={require('../assets/Flappy.png')}
        style={{
          // borderWidth: 2,
          resizeMode: 'contain',
          position: 'absolute',
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
        }}
      />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Bird'},
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
