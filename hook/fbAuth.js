import { StyleSheet, Text, View, Platform } from 'react-native'
import  React, { createContext, useContext, useEffect, useMemo, useState} from 'react';


import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { FacebookAuthProvider, onAuthStateChanged, signInWithCredential} from 'firebase/auth';
import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();



const useProxy = Platform.select({ web: false, default: true });

const FBAuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    
    const [accessToken, setAccessToken] = useState();

    const [message, setMessage] = useState();

   const [loadingInitial, setLoadingInitial] = useState(true);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [fbUser, setFbUser] = useState(null);
  
   const [request, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
    clientId:'810585593435493',
    responseType: ResponseType.Token,
    
  });
  useProxy,

    useEffect(() => {

    const fetchData = async () => {

     setLoading(true);

      if (responseFacebook?.type === "success") {

        setMessage(JSON.stringify(responseFacebook));

      //console.log(response);

       const {id_token} = responseFacebook.params;

       const {access_token} = responseFacebook.params;
         
         setAccessToken(responseFacebook.authentication.accessToken)

         //const provider = new FacebookAuthProvider();
         console.log(`your id_token is ${id_token}`);
         console.log(`your access_token is ${access_token}`);
         
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

      console.log(fbUser);

    }else{

  setFbUser(null);

    }
    setLoadingInitial(false);
  }),

   [])


   


    const memoedValue = useMemo(() => ({
       
        fbUser, 
        promptAsyncFacebook,
       
      }), 
      []);
    
 
return (

  <FBAuthContext.Provider value={{

    fbUser,
    promptAsyncFacebook,
    
        
        }}>
        
            {children}
        
 </FBAuthContext.Provider>

)
   


   
}

export default function fbAuth(){

    return useContext(FBAuthContext);

}


