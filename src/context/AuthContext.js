import React, { useContext, useState, useEffect } from "react"
import { useHistory } from 'react-router'

import { auth } from "../firebase/firebase"
import { db } from "../firebase/firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {


   

    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    function signup(email, password, displayName) {

       
        return    auth.createUserWithEmailAndPassword(email, password).then(userAuth => {
           
            userAuth.user.updateProfile({
                displayName:displayName

            }).then(async () => {
                var userDocRef =  db.collection("users").doc(userAuth.user.displayName);
                userDocRef.set({
                  'info': {
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName
                  }
                });
              
              })
          
             




        });

    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoading(false);
         

        })
        return subscribe;
    }, [])


    const values = {
        currentUser,
        login,
        logout,
        resetPassword,
        signup
    }



    return (
        <AuthContext.Provider value={values} >

            {!isLoading && children}
        </AuthContext.Provider>
    )

}