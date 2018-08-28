import React from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
  Text
} from "react-native";
import PhotoShow from "./PhotoShow";

export default class Master extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    this._fetchPhotos();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="🕵️‍" onPress={this._reloadList} />
        {this._renderList()}
      </View>
    );
  }

  _loadPhoto = photo => () => {
    const { navigator } = this.props;

    navigator.push({
      title: photo.title,
      component: PhotoShow,
      passProps: { photo }
    });
  };

  _reloadList = () => {
    this.setState({ photos: [] });

    setTimeout(() => {
      this._fetchPhotos();
    }, 1000);
  };

  _fetchPhotos = () => {
    const url = "https://jsonplaceholder.typicode.com/photos";

    fetch(url)
      .then(results => results.json())
      .then(photos => {
        this.setState({ photos });
      })
      .catch(err => console.error(err));
  };

  _renderList = () => {
    if (this.state.photos.length !== 0) {
      return (
        <FlatList
          data={this.state.photos}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      );
    } else {
      return <Text>No Results</Text>;
    }
  };

  _renderItem = ({ item }) => (
    <TouchableHighlight onPress={this._loadPhoto(item)}>
      <View style={styles.cell}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.cellImage} />
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    alignItems: "center",
    margin: 10
  },
  cellImage: {
    width: 150,
    height: 150,
    margin: 10
  }
});
