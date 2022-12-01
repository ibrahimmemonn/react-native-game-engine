import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StatusBar, Image} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './entities';
import Physics from './Physics';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('./assets/background.jpg')}
        style={{
          // borderWidth: 2,
          resizeMode: 'cover',
          height: 850,
          width: 420,
          position: 'absolute',
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
        }}>
        {currentPoints}
      </Text>
      <GameEngine
        ref={ref => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {!running ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#C24A4A',
              paddingHorizontal: 30,
              borderRadius: 25,
              paddingVertical: 10,
            }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 30,
              }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
