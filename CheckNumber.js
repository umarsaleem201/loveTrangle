import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native';

const CheckNumber = ({ navigation, route }) => {
  return (
    <View style={{backgroundColor:"white",flex:1}}>
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
      <View style={{marginTop:"30%"}}>
      <Text style={styles.text}>Please enter the 6 digit OTP</Text>
      <Text  style={styles.text}> sent to +62812 0101 0101</Text>
      <TextInput
      placeholder='Plz Enter the 6 digit OTP Code'
      keyboardType="numeric"
                style={{width:"93%",height:40,borderRadius:4,
                borderWidth:1,fontSize:18,paddingLeft:5,marginTop:"10%",marginBottom:"10%",fontFamily:"Mulish-Bold",alignSelf:"center"}}
                />

                <Text style={styles.text}>Don't tell anyone the code</Text>
            <Text style={[styles.text,{color:"red",fontFamily:"Mulish-ExtraBold"}]} onPress={()=>{alert("again sent otp code")}}>RESEND OTP</Text>
            <TouchableOpacity 
            style={{width:"95%",height:50,backgroundColor:"#EA3C60",alignSelf:"center",marginTop:15,
            borderRadius:4,justifyContent:"center",flexDirection:"row",textAlign:"center"
        }}
        onPress={() =>{ navigation.navigate("Signup")}}
        >
                <Text style={{textAlignVertical:"center",color:"white",fontFamily:"Mulish-Bold",fontSize:16,fontWeight:"600"}}>Accept</Text>
            </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>Terms Of Use Privacy Policy</Text>
    </View>
  )
}

export default CheckNumber

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "white",
       paddingTop:15,
        justifyContent: "space-between",
        alignItems: "center",
        // marginBottom: 20,
      },
      text: {
        fontFamily: "Mulish-Light",
        fontWeight: "400",
        alignSelf: "center",
        marginBottom: 10,
        color:"#5E5E5E"
      },
      button: {
        width: "94%",
        height: 50,
        marginTop:10,
        backgroundColor: "#EA3C60",
        borderRadius: 4,
        // justifyContent: "center",
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
})