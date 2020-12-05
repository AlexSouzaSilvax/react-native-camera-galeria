import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={{ uri: 'https://img2.gratispng.com/20181206/gec/kisspng-computer-icons-user-profile-portable-network-graph-go-to-image-page-5c08b9d570aa08.2752372515440757334615.jpg' }}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={{uri: 'data:image/png;base64,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'}}
        style={styles.images}
      />
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text style={{ textAlign: 'center' }}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{ textAlign: 'center' }}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  }
});