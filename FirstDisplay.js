import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Octicons,Entypo} from '@expo/vector-icons';

const FirstDisplay = ({ navigation, route }) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ width: "100%" }}>
        <View style={{ width: "95%", flex: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/img/Icon_App.png")}
            resizeMode="center"
            style={{ width: "50%", height: 70 }}
          />
          <Image
            source={require("../../assets/img/img1.png")}
            resizeMode="center"
            style={{ width: "100%", height: 330, alignSelf: "center" }}
          />
          <Text
            style={{
              fontFamily: "Mulish-Light",
              fontWeight: "400",
              alignSelf: "center",
            }}
          >
            Welcome To
          </Text>
          <Text
            style={{
              fontFamily: "Mulish-SemiBold",
              fontWeight: "700",
              alignSelf: "center",
              fontSize: 23,
              color: "#ACACAC",
            }}
          >
            DATE
          </Text>
          <Text   style={{
              fontFamily: "Mulish-SemiBold",
              fontWeight: "500",
              alignSelf: "center",
              fontSize: 18,
              color:"#FF9BAD",
            }}>Match. Chat. Meet.</Text>
            <TouchableOpacity 
            style={{width:"95%",height:50,backgroundColor:"#EA3C60",alignSelf:"center",marginTop:15,
            borderRadius:4,justifyContent:"center",flexDirection:"row",textAlign:"center"
        }}
        onPress={() =>{ navigation.navigate("Login")}}
        >
            <Entypo name="email" size={23} color="white" style={{textAlignVertical:"center",right:7}}/>
                <Text style={{textAlignVertical:"center",color:"white",fontFamily:"Mulish-Bold",fontSize:16,fontWeight:"600"}}>Continue With Email</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             style={{
                width: "95%",
                height: 50,
                backgroundColor: "white",
                alignSelf: "center",
                marginTop: 15,
                borderRadius: 4,
                justifyContent: "center",
                flexDirection: "row",
                textAlign: "center",
                elevation: 5, // Add shadow
            }}> 
            <Entypo name="facebook" size={25} color="#EA3C60" style={{textAlignVertical:"center",right:7}}/>
                <Text style={{textAlignVertical:"center",color:"#EA3C60",fontFamily:"Mulish-Bold",fontSize:16,fontWeight:"600"}}>Continue With Facebook</Text>
            </TouchableOpacity>
            <Text style={{marginTop:15,alignSelf:"center" , fontFamily: "Mulish-Light",
              fontWeight: "400",}} >Don't have account ? <Text onPress={()=>{navigation.navigate("Signup")}} style={{ fontFamily: "Mulish-Bold",fontSize:20,
              fontWeight: "900",color:"#EA3C60"}}>Sign Up</Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FirstDisplay;

const styles = StyleSheet.create({});
