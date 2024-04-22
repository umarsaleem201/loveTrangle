import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { UserCredentials } from '../Component/UserCredentials';
import { baseUrl } from '../env';

const SearchPartner = ({ navigation, route }) => {
  const userinfo = useContext(UserCredentials)?.UserData;
  const [showData, setShowData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Make a GET request to your Node.js server endpoint
      const response = await axios.get(`${baseUrl}/api/usersLocation`)
      setShowData(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMsg(error.message); // Set error message to state
    }
  };

  useEffect(() => {
    // Set markers using locationdata
    setMarkers(showData.map(data => ({
      userId: data.userId,
      latitude: data.location[0]?.coords?.latitude,
      longitude: data.location[0]?.coords?.longitude,
      image: data.image // Assuming the image property exists in your data
    })));
  }, [showData]);

  const handleMarkerPress = (marker) => {
    // Do something when a marker is pressed
    navigation.navigate("PartnerProfile", marker);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userinfo?.user?.location[0]?.coords?.latitude,
          longitude: userinfo?.user?.location[0]?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.userId}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
        <Marker
          coordinate={{
            latitude: userinfo?.user?.location[0]?.coords?.latitude,
            longitude: userinfo?.user?.location[0]?.coords?.longitude,
          }}
          title="You are here"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SearchPartner;
