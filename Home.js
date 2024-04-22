import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import { Foundation, Ionicons,MaterialIcons, } from "@expo/vector-icons";
import { baseUrl } from "../env";
import Slider from "@react-native-community/slider";

const Home = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showData, setShowData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const[distance,setDistance]=useState()
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);
  

  const fetchData = async () => {
    try {
      // Make a GET request to your Node.js server endpoint
      const response = await axios.get(`${baseUrl}/auth/user`);
      setShowData(response.data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const today = new Date();
    // console.log("Today:", today);
    const birthDate = new Date(dob);
    // console.log("DOB:", birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    // console.log("Initial age:", age);
    const monthDiff = today.getMonth() - birthDate.getMonth();
    // console.log("Month diff:", monthDiff);

    // If the birth month is ahead of the current month or
    // birth month is the same but birth date is ahead of the current date
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    // console.log("Final age:", age);
    return age;
  };

  // alert(distance)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <Foundation name="align-left" size={30} color={"#ACACAC"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={30} color={"#ACACAC"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={showData}
        keyExtractor={(item) => item.name}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { width: Dimensions.get("window").width },
            ]}
          >
            <TouchableOpacity
              style={styles.image1}
              onPress={() => {
                navigation.navigate("DetailUser", { userData: item });
              }}
            >
              <Image
                source={{ uri: item.profileImage }}
                resizeMode="cover"
                style={styles.image}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Mulish-SemiBold",
                fontSize: 20,
                fontWeight: "700",
                color: "#5E5E5E",
                marginLeft: "7%",
              }}
            >
              {item.name}, {calculateAge(item.DOB)}
            </Text>
            <Text style={styles.itemSecondtext}>
              {item.job}, {item.company}
            </Text>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                flexDirection: "row",
                marginTop: "10%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("DetailUser");
                // }}
              >
                <Image
                  source={require("../../assets/img/close.png")}
                  style={{ width: 60, height: 67 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Like");
                }}
              >
                <Image
                  source={require("../../assets/img/add.png")}
                  style={{ width: 60, height: 67 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        animationInTiming={1000}
        animationOutTiming={1000}
        style={{
          width: "100%",
          marginLeft: 0,
          marginBottom: 0,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 10,
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={{width:"90%",alignSelf:"center",marginTop:"5%"}}>
          <View style={{justifyContent:"space-between",flexDirection:"row"}} > 
        <Foundation name="align-left" size={30} color={"#ACACAC"} />
          <Text style={{color:"#ACACAC",fontFamily:"Mulish-Bold",fontWeight:"800",fontSize:18}}>Filters</Text>
          </View>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderinputContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "male" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("male")}
          >
            <MaterialIcons
              name={selectedOption === "male" ? "male" : "male"}
              size={24}
              color={selectedOption === "male" ? "#EA3C60" : "#ACACAC"}
            />
            <Text
              style={[
                styles.label,
                selectedOption === "male" && { color: "#EA3C60" },
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "female" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("female")}
          >
            <MaterialIcons
              name={selectedOption === "female" ? "female" : "female"}
              size={24}
              color={selectedOption === "female" ? "#EA3C60" : "#ACACAC"}
            />
            <Text
              style={[
                styles.label,
                selectedOption === "female" && { color: "#EA3C60" },
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>


          <Text style={styles.label}>Distance</Text>
          <Slider
              style={{ width: "90%", height: 50 }}
              minimumValue={1}
              thumbTintColor="red"
              maximumValue={10}
              
              minimumTrackTintColor="red"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => setDistance(value)} // Set distance state on slider change
            />
          </View>
          <Text>{distance}</Text>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerTitle: {
    marginTop: 10,
    fontFamily: "Mulish-Bold",
    fontSize: 16,
    fontWeight: "400",
    color: "#5E5E5E",
  },
  itemContainer: {
    width: "95%",
    bottom: 20,
    alignSelf: "center",
  },
  image1: {
    width: "100%",
    height: "60%",
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  image: {
    width: "88%",
    height: "100%",
    borderRadius: 20,
    alignSelf: "center",
  },
  itemText: {
    marginLeft: "7%",
    fontFamily: "Mulish-BoldItalic",
    fontSize: 18,
    fontWeight: "700",
    color: "#5E5E5E",
  },
  itemSecondtext: {
    marginTop: 8,
    fontFamily: "Mulish-Medium",
    fontSize: 16,
    fontWeight: "400",
    color: "#ACACAC",
    marginLeft: "7%",
  },
  modalContainer: {
    width: "80%",
    height: "92%", // Set height to 50% of the screen
    position: "absolute",
    bottom: 0,
    // right:0,
    left: 0,
    backgroundColor: "white",
    // borderTopLeftRadius:20,
    borderTopRightRadius: 20,
  },
  genderinputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginTop:"5%",
    marginBottom:"5%",
    paddingHorizontal: 0,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  selectedButton: {
    borderColor: "#EA3C60",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  label: {
    fontSize: 16,
    fontFamily:"Mulish-Bold",
    fontWeight:"600",
    color: "#5E5E5E",
  },
});

export default Home;
