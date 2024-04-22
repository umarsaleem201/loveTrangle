import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { UserCredentials } from '../Component/UserCredentials';

const Start = ({ navigation, route }) => {
  const userinfo = useContext(UserCredentials)?.UserData;
  const username=userinfo.user.name
  // alert(JSON.stringify(userinfo.user.profileImage))
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/img/Backround.jpg')} 
        style={styles.imageBackground}
      >
        <View style={{width:"90%",flex:1,alignSelf:"center",paddingTop:5}}>
        <Text style={{fontFamily:"Mulish-Regular",color:"#5E5E5E",padding:15}}>Hi</Text>
        <Text style={{fontFamily:"Mulish-ExtraBold",fontSize:25,color:"#5E5E5E",padding:18}}>{username}</Text>
        <Image source={{uri:userinfo.user.profileImage}} resizeMode="cover" style={{width:100,height:100,borderRadius:50,borderColor:"white",borderWidth:5,left:10}}/>
        </View>
        <View style={{width:"90%",flex:1,alignSelf:"center",paddingTop:15}}>
            <Text style={{fontFamily:"Mulish-ExtraBold",fontSize:25,color:"#fff",padding:15}}>Let's find your </Text>
            <Text style={{fontFamily:"Mulish-ExtraBold",fontSize:25,color:"#fff",paddingLeft:18}}>DATE now ! </Text>
            <TouchableOpacity 
            style={{width:"100%",height:50,backgroundColor:"#fff",alignSelf:"center",marginTop:15,
            borderRadius:4,justifyContent:"center",flexDirection:"row",textAlign:"center",marginBottom:20,position:"absolute",bottom:0
        }}
        onPress={() =>{ navigation.navigate("SearchPartner")}}
        >
                <Text style={{textAlignVertical:"center",color:"#EA3C60",fontFamily:"Mulish-Bold",fontSize:18,fontWeight:"600"}}>Start</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire container
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5E5E5E',
    fontFamily:"Mulish-Regular"
  },
})
