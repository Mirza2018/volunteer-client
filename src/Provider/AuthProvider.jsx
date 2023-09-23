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
            if (currrentUser && currrentUser.email) {
                const loggedUser = { email: currrentUser.email }
                fetch('http://localhost:5000/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data);
                        localStorage.setItem('volunteer-access-token', data.token)
                    })
            }
            else{
                localStorage.removeItem('volunteer-access-token')
            }

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
        logOut,
        loadding

    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;