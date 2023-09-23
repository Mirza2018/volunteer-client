import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null)
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loadding, setLodding] = useState(true);
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currrentUser => {
            setUser(currrentUser);
            setLodding(false)
        })
        return () => {
            unsubscribe;
        }
    }, [auth])


    const createUser = (email, password) => {
        setLodding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLodding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = () => {
        setLodding(true)
        return signInWithPopup(auth, provider)
    }
    const update = (name) => {
        setLodding(true)
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const logOut = () => {
        setLodding(true)
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