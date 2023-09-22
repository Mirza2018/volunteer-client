import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null)
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";
import Swal from "sweetalert2";

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

    const logOut = () => {
        return (
            signOut(auth),
            Swal.fire(
                'Successfully Sign Out!',
                'sign out',
                'error'
            ))

    }
    const values = {
        user,
        createUser,
        logIn,
        googleLogIn,
        update,
        logOut

    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;