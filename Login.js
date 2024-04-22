import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Octicons, MaterialIcons, FontAwesome6, FontAwesome,Entypo } from "@expo/vector-icons";
import { UserCredentials } from "../Component/UserCredentials";
import { baseUrl } from "../env";


const Login = ({ navigation, route }) => {
  const{storeValues}=useContext(UserCredentials)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showError, setShowError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const checkLogin = async () => {
    if (!email || !password) {
      setShowError("Please fill in all fields.");
      return;
    } else if (!validateEmail(email)) {
      setShowError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setShowError(""); // Clear any previous errors

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post( `${baseUrl}/auth/login`, userData);
      var userInfo=response.data
      // console.log(response.data);
      storeValues(userInfo)
      setLoading(false);
      // alert(JSON.stringify(response.data));
      setShowError("You are logged in successfully.");
      navigation.navigate("Start") // Clear any previous errors
      // Navigate to the next screen or perform any other action upon successful login
    } catch (error) {
      // console.error('Error during login:', error);
      setLoading(false);
      setShowError("Plz Check Your Email and Password!");
    }
  };

  return (
    <>
    <View style={{width:'95%',flex:1,alignSelf:"center"}}>
    <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-sharp" size={35} color="#ACACAC" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/img/Icon_App.png")}
          resizeMode="center"
          style={{ width: "45%", height: 38, right: 10 }}
        />
      </View>
    </View>
    <View style={{width:'95%',flex:10 ,alignSelf:"center",justifyContent:"center"}}>
    <View style={styles.content}>
        <Text style={styles.text}>
          We need your Email Verification
        </Text>
        <Text style={styles.text}>
          to get you signed in
        </Text>
        <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your Email" style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(email)=>{setEmail(email)}}
          />
          <Entypo
            name="email"
            size={22}
            color="#ACACAC"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your Password" style={styles.input} 
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(password)=>{setPassword(password)}}
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
        </View>
       
        {showError ? <Text style={[styles.label,{color:"red"}]}>{showError}</Text> : null}
        
        
        {/* Loading indicator */}
        {loading ? (
  <TouchableOpacity style={styles.button}>
    <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
) : (
  <TouchableOpacity style={styles.button} onPress={checkLogin}>
    <Text style={styles.buttonText}>Continue</Text>
  </TouchableOpacity>
)}
      </View>
    </View>
    <View style={{width:'95%',flex:1,alignSelf:"center"}}>
    <Text style={styles.bottomText}>Terms Of Use Privacy Policy</Text>
    </View>

   
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",

    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
   
    paddingTop:15,
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 20,
  },
  content: {
    // alignItems: "center",
    // marginBottom: 25,
  },
  text: {
    fontFamily: "Mulish-Light",
    fontWeight: "400",
    alignSelf: "center",
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 50,
    marginTop:10,
    backgroundColor: "#EA3C60",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Mulish-Bold",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomText: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontFamily: "Mulish-Light",
    fontWeight: "400",
    color: "#ACACAC",
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
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#5E5E5E",
    marginTop:10

  },
  formContainer: {
    width: "100%",
    alignSelf: "center",
    paddingTop: 15,
    marginTop: 10,
  },
});
