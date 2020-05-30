import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  BackHandler,
} from 'react-native';
import {IconButton, Card, Paragraph, Button} from 'react-native-paper';
import {useHistory} from 'react-router-native';
import Colors from '../assets/colors';
import syncStorage from 'sync-storage';

export default function UserProfile() {
  const [userData, setUserData] = useState(syncStorage.get('userDetails'));
  const history = useHistory();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageBg}>
        <Image
          style={styles.image}
          source={
            userData.imagesrc == null
              ? require('../assets/placeholder.jpeg')
              : userData.imagesrc
          }
        />
        <IconButton
          style={styles.changeimage}
          icon="auto-fix"
          color={Colors.background}
          size={20}
          onPress={() => alert('TODO change image')}
        />
        <Text style={styles.userName}>{userData.fullname}</Text>
        <Text style={styles.userid}>@{userData.username}</Text>
      </View>
      <View style={styles.userDetails}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              style={styles.detailIcon}
              icon="email"
              color={Colors.primary}
              size={20}
            />
            <Paragraph>{userData.email}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              style={styles.detailIcon}
              icon="phone"
              color={Colors.primary}
              size={20}
            />
            <Paragraph>
              {userData.phone == null ? 'N/A' : userData.phone}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
      <Button
        icon="textbox-password"
        mode="contained"
        style={styles.button}
        onPress={() => {
          history.push({
            pathname: '/passwordReset',
            changePassword: true,
            userid: userData,
          });
        }}>
        Change password
      </Button>
    </View>
  );
}
const dimensions = Dimensions.get('window').width / 2;
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
  },
  image: {
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    width: dimensions,
    height: dimensions,
    justifyContent: 'flex-start',
    top: 20,
  },
  imageBg: {
    position: 'relative',
    backgroundColor: Colors.color,
  },
  userName: {
    paddingTop: dimensions / 4,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  userid: {
    paddingTop: 10,
    paddingBottom: 30,
    fontStyle: 'italic',
    fontSize: 13,
    alignSelf: 'center',
  },
  changeimage: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  card: {
    margin: 10,
  },
  detailIcon: {
    marginRight: 20,
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    height: 45,
    borderRadius: 25,
    width: '60%',
    marginBottom: 15,
  },
});
