import express from "express";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import parseUrl from "body-parser";
import session from "express-session";
// const mysql = require('mysql');

import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhxQ8-1EA9OIfsstk1298JCWsjTYmJLh0",
    authDomain: "employee-management-webs-e34da.firebaseapp.com",
    projectId: "employee-management-webs-e34da",
    storageBucket: "employee-management-webs-e34da.appspot.com",
    messagingSenderId: "681904500188",
    appId: "1:681904500188:web:7ad813842aa3868d9af319"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const app = express();

app.use(express.static("public"));
app.use(express.json());

//app.use(express.urlencoded({ extended: false }));

// home route
app.get('/', (req, res) => {
    res.sendFile("index.html", {root : "public"})
})



app.get('/addEmployee', (req,res) => {
    res.sendFile("addEmployee.html", {root : "public"})
})

app.post('/addEmployee', (req, res) => {
    const { name, email, password, number, department, position, gender, address } = req.body;

    if(name.length < 3){
        res.json({'alert' : 'name must be 3 letters long'});
    } else if(!email.length){
        res.json({'alert' : 'enter your email'});
    } else if(password.length < 8){
        res.json({'alert' : 'password must be 8 letters long'});
    } else if(!Number(number) || number.length < 10){
        res.json({'alert' : 'invalid number, please enter valid one'});
    } else{
        const users = collection(db, "users");
        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({'alert' : 'email already exists'});
            }else{
                //encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;

                        //set doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                userType: req.body.userType,
                                number: req.body.number,
                                address: req.body.address,
                                department: req.body.department,
                                position: req.body.position,
                                gender: req.body.gender
                            })
                        })
                    });
                })
            }
        })
    }

}); 

app.post('/login', (req, res) => {
    let {email, password, userType} = req.body;

    if(!email.length || !password.length){
        res.json({'alert' : 'fill all the inputs'})
    }

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert' : 'email does not exists'});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        userType: data.userType
                    })
                } else{
                    return res.json({'alert' : 'password is incorrect'});
                }
            })
        }
    })
})

app.get('/login', (req,res) => {
    res.sendFile("login.html", {root : "public"})
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})