import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseUrl } from '../env';
import axios from 'axios';

const PartnerProfile = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);
// alert(JSON.stringify(userDetails))
  const fetchData = async () => {
    try {
      // Make a GET request to your Node.js server endpoint
      const response = await axios.get(`${baseUrl}/auth/user/${userId}`);
      setUserDetails(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMsg(error.message); // Set error message to state
    }
  };

  // Display loading indicator or error message while fetching data
  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Display user details once fetched
  return (
    <View style={styles.container}>
<TouchableOpacity style={{height:"50%"}}>

      <Image source={{ uri: userDetails.profileImage }} style={{ width:"100%",height:"100%",alignSelf:"center" ,borderRadius:20}} />
</TouchableOpacity>
        <View style={{height:100}}>
        <Text style={{marginTop:10,fontFamily:"Mulish-Bold",fontSize:18,fontWeight:"700",color:"#5E5E5E"}}>{userDetails.name}</Text>
        <Text style={{marginTop:10,fontFamily:"Mulish-Medium",fontSize:16,fontWeight:"400",color:"#ACACAC"}}>{userDetails.job},{userDetails.company}</Text>

        </View>
    <View style={{flexDirection:"row",justifyContent:"space-between"}} >
        <TouchableOpacity onPress={()=>{navigation.navigate("HomeTabs")}}><Image source={require('../../assets/img/close.png')} style={{width:80,height:80}}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Like")}}><Image source={require('../../assets/img/add.png')} style={{width:80,height:80}}/></TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"80%",
    alignSelf:"center",
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default PartnerProfile;
