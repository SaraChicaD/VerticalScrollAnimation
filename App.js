import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Easing,
  Alert,
  Dimensions,
  Image,
} from 'react-native';

const blue = require('./images/dark_blue.png');
const green = require('./images/green.png');
const purple = require('./images/purple.png');
const images = [blue, green, purple];
const screenWidth = Dimensions.get('window').width;

const HeaderComponent = ({ onPress, imageSrc }) => (
  <View style={styles.headerContainer}>
    <Image source={imageSrc} style={styles.imageStyle} />
  </View>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yValue: new Animated.Value(0),
    };

    this.moveAnimation = this.moveAnimation.bind(this);
  }

  // NOTE WHERE TO CONTROL SPEED AND TIME
  // NOTE THE toValue CORRELATES TO ITEM & ITEM CONTAINER HEIGHT
  // CONTAINER HEIGHT IS 120, ITEM IS 100
  moveAnimation() {
    Animated.timing(this.state.yValue, {
      toValue: 120, // speed
      duration: 1000, // time
      easing: Easing.linear,
    }).start(() => {
      // Animated.timing(this.state.yValue, {
      //   toValue: 0, // speed
      //   duration: 500, // time
      // })
      Alert.alert('Animation ended');
    })
  }

  render() {
    return (
      <View style={styles.container}>

        {/* CONTAINER HAS TO HAVE A HEIGHT & OVERFLOW: 'HIDDEN' */}
        {/* CONTAINER HEIGHT IS RELATED TO ITEM HEIGHT */}
        <View style={styles.animationContainer}>
          {images.map((item, index) => (
            <Animated.View
              style={[
                styles.headerHeight,
                { bottom: this.state.yValue }
              ]}
              key={`image-${index}`}
            >
            <Image
              source={item}
              style={styles.imageStyle}
            />
            </Animated.View>
          ))}
        </View>

        {/* THIS BUTTON TRIGGERS ANIMATION */}
        {/* IN LABL THE TRIGGER IS AN EVENT */}
        {/* SO FEEL FREE TO IGNORE THIS CODE */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.moveAnimation();
          }}
        >
          <Text style={styles.buttonText}>animate</Text>
        </TouchableOpacity>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  // PERTINENT STYLE
  animationContainer: {
    height: 120,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerHeight: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
  button: {
    height: 45,
    backgroundColor: 'steelblue',
    marginTop: 30,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
});


