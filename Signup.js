import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import {
  Octicons,
  MaterialIcons,
  FontAwesome6,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { baseUrl } from "../env";
const Signup = ({ navigation, route }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [dob, setDob] = useState();
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState();
  const [company, setCompany] = useState();
  const [college, setCollege] = useState();
  const [aboutMe, setAboutMe] = useState("");
  const [showerror, setShowError] = useState();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setShowError("Permission to access location was denied");
        return;
      }
      setLocationLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const latitude = currentLocation.coords.latitude.toFixed(6); // Limiting to 6 decimal places
      const longitude = currentLocation.coords.longitude.toFixed(6); // Limiting to 6 decimal places
      // setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const address = await Location.reverseGeocodeAsync(
        currentLocation.coords
      );
      setLocationLoading(false);
      setAddress(address[0].formattedAddress);
      setShowError("");
    } catch (error) {
      setShowError("Error fetching location");
      console.error(error);
    }
  };

  // alert(JSON.stringify(location))

  // alert(JSON.stringify(location.latitude&&location.longitude))

  const registerUser = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !number ||
      !selectedOption ||
      !dob ||
      !location ||
      !job ||
      !company ||
      !college ||
      !aboutMe
    ) {
      setShowError("Please fill in all fields.");
      return;
    } else if (!validateEmail(email)) {
      setShowError("Please enter a valid email address.");
      return;
    }
  
    setLoading(true);
    setShowError(""); // Clear any previous errors
  
    // Format DOB properly before sending
    const formattedDOB = dob.toISOString().split('T')[0];
  
    const userData = {
      profileImage: image,
      name: name,
      email: email,
      password: password,
      number: number,
      location: location,
      address: address,
      DOB: formattedDOB, // Use the formatted DOB
      gender: selectedOption,
      job: job,
      company: company,
      college: college,
      about_me: aboutMe,
    };
    alert(JSON.stringify(userData));
    // return
    try {
      // Make the first API call to register the user's data
      const response = await axios.post(`${baseUrl}/auth/register`, userData);
      console.log(response.data);
      // alert(response.data.user._id)
      // Extract user ID from the response
      const userId = response.data.user._id;
      // alert(userId)
      // Make the second API call to add the user's location
      const locationData = {
        userId: userId,
        location: location,
      };
      const addLocation = await axios.post(
        `${baseUrl}/api/usersLocation`,
        locationData
      );
  
      setLoading(false);
      navigation.navigate("FirstDisplay");
      setShowError("Registered successfully.");
    } catch (error) {
      console.error("Error during registration:", error.response);
      setLoading(false);
      setShowError("An error occurred during registration");
    }
  };
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(date)
    hideDatePicker();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image
              source={require("../../assets/img/dami_image.png")}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your Name"
            style={styles.input}
            value={name}
            onChangeText={(name) => {
              setName(name);
            }}
          />
          <Octicons
            name="person"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your Email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <Entypo name="email" size={22} color="#ACACAC" style={styles.icon} />
        </View>
        <Text style={styles.label}>Birthday</Text>
<TouchableOpacity onPress={showDatePicker}>
  <View style={styles.inputContainer}>
    <Text style={styles.input}>{dob ? formatDate(dob) : "YYYY/MM/DD"}</Text>
    <Octicons name="calendar" size={22} color="#ACACAC" style={styles.icon} />
  </View>
</TouchableOpacity>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
        <Text style={styles.label}>Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={number}
            onChangeText={(number) => {
              setNumber(number);
            }}
          />
          <Octicons
            name="device-mobile"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Location</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input} onPress={getLocation}>
            Location:{" "}
            {locationLoading ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              address
            )}
          </Text>
          <Octicons
            name="location"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Job</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Job"
            style={styles.input}
            value={job}
            onChangeText={(job) => {
              setJob(job);
            }}
          />
          <FontAwesome6
            name="bag-shopping"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Company</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Company"
            style={styles.input}
            value={company}
            onChangeText={(company) => {
              setCompany(company);
            }}
          />
          <FontAwesome
            name="bank"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>College</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="College"
            style={styles.input}
            value={college}
            onChangeText={(college) => {
              setCollege(college);
            }}
          />
          <FontAwesome6
            name="graduation-cap"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>About Me</Text>
        <View style={[styles.inputContainer, { height: 120 }]}>
          <TextInput
            placeholder="Tell us about you ...."
            style={styles.Textinput}
            multiline={true} // Allow multiple lines
            numberOfLines={4} // Initial number of lines
            onChangeText={(text) => setAboutMe(text)}
            value={aboutMe}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your Password"
            style={styles.input}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Octicons
              name={showPassword ? "eye-closed" : "eye"}
              size={22}
              color="#ACACAC"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.label, { color: "red" }]}> {showerror}</Text>

        {loading ? (
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#EA3C60",
              alignSelf: "center",
              marginTop: 15,
              borderRadius: 4,
              justifyContent: "center",
              flexDirection: "row",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#EA3C60",
              alignSelf: "center",
              marginTop: 15,
              borderRadius: 4,
              justifyContent: "center",
              flexDirection: "row",
              textAlign: "center",
              marginBottom: 20,
            }}
            onPress={registerUser}
          >
            <Text
              style={{
                textAlignVertical: "center",
                color: "white",
                fontFamily: "Mulish-Bold",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: 200,
  },
  formContainer: {
    width: "94%",
    alignSelf: "center",
    paddingTop: 15,
    marginTop: 10,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#ACACAC",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Mulish-Bold",
    color: "#5E5E5E",
  },
  icon: {
    marginLeft: 10,
  },
  Textinput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Mulish-Bold",
    color: "#5E5E5E",
    textAlignVertical: "top", // Align text to the top
  },
  genderinputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
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
      marginLeft: 8,
      fontSize: 16,
      color: "#5E5E5E",
      marginTop: 10,
    },
});

export default Signup;
