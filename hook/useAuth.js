import { StyleSheet, Text, View, Platform } from 'react-native'
import  React, { createContext, useContext, useEffect, useMemo, useState} from 'react';

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

import * as WebBrowser from 'expo-web-browser';

import envs from '../config/env'

import { GoogleAuthProvider,  FacebookAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';


import { ResponseType } from 'expo-auth-session';
import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {


  const [fbUser, setFbUser] = useState(null);

  const [selected, setSelected] = useState(null);

const [accessToken, setAccessToken] = useState();
const [userInfo, setUserInfo] = useState();
const [message, setMessage] = useState();
const [user, setUser] = useState(null);
const [loadingInitial, setLoadingInitial] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const useProxy = Platform.select({ web: false, default: true });

//facebook auth provider

const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({

  clientId: process.env.FB_CLIENT_ID,

//responseType:ResponseType.Token,

//responseType:"code",


responseType:Response.Token,

  //redirectUri: `fb810585593435493://authorize`,

 redirectUri:'https://auth.expo.io/@okpoka92/uber',

  
});

useProxy,



  useEffect(() => {

  const fetchData = async () => {

   setLoading(true);

    if (responseFacebook?.type === "success") {

      setMessage(JSON.stringify(responseFacebook));

    //console.log(responseFacebook);

  
    const {id_token} = responseFacebook.params;
     const {access_token} = responseFacebook.params;
       
       setAccessToken(responseFacebook.authentication.accessToken)

       //const provider = new FacebookAuthProvider();
       
       //console.log(`your access_token is ${access_token}`);
       
       const credential = FacebookAuthProvider.credential(access_token);

       await signInWithCredential(auth, credential);

      
          }      

  }

  fetchData()

  .catch((error) => setError(error))
  .finally(() => setLoading(false));


}, [responseFacebook]);

useEffect(() => onAuthStateChanged(auth, (fbUser) => {

  if(fbUser){
    
    setFbUser(fbUser);

    //console.log(fbUser);

  }else{

setFbUser(null);

  }
  setLoadingInitial(false);
}),

 [])







//google auth provider

  const [request, response, promptAsyncGoogle] = Google.useAuthRequest({

    androidClientId: process.env.ANDROID_CLIENT_ID,
    
    isoClientId: process.env.IOS_CLIENT_ID,
    
    expoClientId: process.env.WEB_CLIENT_ID,

     permission:['public_profile', 'email', 'gender', 'location'],
    
    scopes:['profile', 'email'],

    responseType:ResponseType.Token,
    
  // response_type:ResponseType.Token

  });

  useProxy,

  useEffect(() => {

    const fetchData = async () => {

     setLoading(true);

      if (response?.type === "success") {

        setMessage(JSON.stringify(response));

       const {id_token} = response.params;

       const {access_token} = response.params;
         
         setAccessToken(response.authentication.accessToken);
          const credential = new GoogleAuthProvider.credential(
          id_token, // Pass the access_token as the second property
          access_token
        );
        
        
        await signInWithCredential(auth, credential);
        
            }


    }

    fetchData()

    .catch((error) => setError(error))
    .finally(() => setLoading(false));


  }, [response]);
   

  useEffect(() => onAuthStateChanged(auth, (user) => {

      if(user){
        
        setUser(user);

      }else{

    setUser(null);

      }
      setLoadingInitial(false);
    }),

     [])






const logout = () => {

      setLoading(true);


signOut(auth).catch((error) => setError(error)).then(() => setLoading(false));

     }




  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}

    });

  
    userInfoResponse.json().then(data => {
      setUserInfo(data);
     // console.log(userInfo);
    });
  }

  const memoedValue = useMemo(() => ({

    user,
    fbUser,

    promptAsyncFacebook,
   
    promptAsyncGoogle,

     loading,
     error,
     logout
     

  }), 
  [user, loading, error]);



  return (

<AuthContext.Provider value={{

user,
fbUser,
selected,
setSelected,

promptAsyncGoogle,
promptAsyncFacebook,

loading,
error,
logout
  

}}>

    {children}

</AuthContext.Provider>
     
  )
}

export default function useAuth(){

    return useContext(AuthContext);

}
