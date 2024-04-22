import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Octicons, FontAwesome6, FontAwesome,FontAwesome5 } from "@expo/vector-icons";

const DetailUser = ({ navigation, route }) => {
  const { userData } = route.params;

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <ScrollView style={{backgroundColor:"white"}}>
      <View>
        <Image source={{ uri: userData.profileImage }} style={{ width: "100%", height: 370 }} />
      </View>
      <View style={{ width: "100%", backgroundColor: "white",flex:1 ,bottom: 25, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => {
            navigation.goBack();
          }}>
            <Image source={require("../../assets/img/close.png")} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Like")}>
            <Image source={require("../../assets/img/add.png")} style={[styles.headerIcon,{width:68,height:75,bottom:"20%"}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Like")}>
            <Image source={require("../../assets/img/add.png")} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{userData.name}, {calculateAge(userData.DOB)}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><FontAwesome6 name="bag-shopping" size={22} color="#ACACAC" /> {userData.job}</Text>
            <Text style={styles.infoText}><FontAwesome name="bank" size={22} color="#ACACAC" /> {userData.company}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><Octicons name="location" size={22} color="#ACACAC" /> {userData.address}</Text>
            <Text style={styles.infoText}><FontAwesome6 name="graduation-cap" size={22} color="#ACACAC" /> {userData.college}</Text>
          </View>
          <Text style={styles.nameText}>About Me</Text>
        <Text  style={styles.infoText}>{userData.about_me}</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
          <Text style={styles.nameText}>Gallery</Text>
          <Text style={{fontFamily:"Mulish-Regular",color:"red",fontSize:15,fontWeight:"700",marginTop:"3%"}}>See All </Text>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: "5%",
  },
  headerIcon: {
    width: 50,
    height: 55,
  },
  detailsContainer: {
    width: "90%",
    alignSelf: "center",
  },
  nameText: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 20,
    fontWeight: "700",
    color: "#5E5E5E",
  },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  infoText: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: "Mulish-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "#ACACAC",
    marginTop: 8,
  },
});

export default DetailUser;
