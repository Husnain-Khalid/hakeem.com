import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';
import IP from '../Ip';
class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }
  componentDidMount() {
    fetch(IP + 'hakeem/allmedicines')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.artist}</Text>
        <Text style={styles.text}>{this.props.song}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    height: 90,
    margin: 10,
    width: '90%',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  stretch: {
    marginTop: 20,
    width: 350,
    height: 200,
    left: 10,
    //resizeMode: 'stretch',
  },
  header: {
    width: '100%',
    height: '80%',
    marginTop: 2,
  },

  wrapperCollapsibleList: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 40,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#90ee90',
  },
  searchBar: {
    fontSize: 24,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
  },
});

export default Item;
