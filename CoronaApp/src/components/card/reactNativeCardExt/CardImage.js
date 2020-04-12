import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

export default class CardImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0,
    };
  }
  render() {
    const newStyle = this.props.style || {};
    return (
      <View style={[styles.cardImage, newStyle]} onLayout={(e) => { this.setState({ calc_height: e.nativeEvent.layout.width * 9 / 16 }); }}>
        {
          this.props.source &&
          <ImageBackground source={this.props.source} resizeMode={this.props.resizeMode || 'cover'} resizeMethod={this.props.resizeMethod || 'resize'} style={[styles.imageContainer, { height: this.state.calc_height }]}>
            {this.props.title !== undefined &&
              <Text style={styles.imageTitleText}>{this.props.title}</Text>
            }
          </ImageBackground>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignSelf: 'stretch',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'flex-end',
  },
  imageTitleText: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
});