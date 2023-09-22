import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null)
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currrentUser => {
            setUser(currrentUser);
        })
        return () => {
            unsubscribe;
        }
    }, [])


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = () => {
        return signInWithPopup(auth, provider)
    }
    const update = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const values = {
        user,
        createUser,
        logIn,
        googleLogIn,
        update

    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;