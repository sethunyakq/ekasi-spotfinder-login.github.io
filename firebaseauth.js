// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAj2ARqei7P9ubA1XwjXtww6cIW9y6w5A",
    authDomain: "ekasi-login-signup.firebaseapp.com",
    projectId: "ekasi-login-signup",
    storageBucket: "ekasi-login-signup.appspot.com",
    messagingSenderId: "1065522064623",
    appId: "1:1065522064623:web:cc134942fa537f5252bf1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            window.location.href = 'https://pay.ozow.com/f45a2df7-88cb-4a67-a741-1e8dfbd67beb/bank-selection/';
        })
        .catch((error) => {
            console.error("Error writing document", error);
            showMessage('You have account with this email', 'signUpMessage');
        });
});

// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'https://pay.ozow.com/f45a2df7-88cb-4a67-a741-1e8dfbd67beb/bank-selection/';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('Account does not exist', 'signInMessage');
            } else {
                showMessage('This account exists', 'signInMessage');
            }
        });
});
