import React, { useState,useContext } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { useUserContext } from './UserContext';

var temp;
const select = [
    "Web development",
    "IOT",
    "Machine Learning",
    "Block Chain",
    "Network Security",
    "Computer network",
    "Bigdata",
    "Tailwind",
    "Flutter",
    "Solidity",
    "Rust",
    "C++",
    "Java",
    "Data-Stuctures",
    "Algorithms",
    "JavaScript",
    "Python",
    "React",
    "Angular",
    "Vue",
    "Swift", 
    "Kotlin", 
    "Ruby", 
    "PHP", 
    "ASP.NET", 
    "MongoDB", 
    "SQL", 
    "HTML5", 
    "CSS3", 
    "WordPress", 
  ];


function SignupForm(){
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [user,setUser] = useState([{tags:[]}]);
    let name, value;

    const hadleInputs = (e)=>{
        console.log(e.target.name,e.target.value);
        // e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})
        console.log(user);
    }
    const mutant = async (e)=>{

        console.log("e: ",e.target);
        e.preventDefault();
        const name = user.name;
        const mail = user.mail;
        const password = user.password;
        
        // console.log(name, mail,password);
        const tags = user[0].tags;
        const values = {name, mail, password, tags}
        // window.location.replace('http://localhost:3000/signup')
        const data = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
        }
        await fetch("/signup",data)
        .then(res => res.json())
        .then(data =>{
            temp = JSON.stringify(data.message);
            alert(temp);
            if(temp.includes('teacher')){
                console.log("matches")
                setIsLoggedIn(true);
            }
        })
        .then(window.location.replace('/feed'))
    }

    return(
        <div>
            <form method="POST">
                <label>
                    <p>Username :</p>
                    <input type="text" name="name" onChange={hadleInputs} value={user.name}/>
                </label>
                <label>
                    <p>Email :</p>
                    <input type="email" name="mail" onChange={hadleInputs} value={user.mail}/>
                </label>
                <label>
                    <p>Password :</p>
                    <input type="password" name="password" onChange={hadleInputs} value={user.password}/>
                </label>
                <label>
                    <p>What is your interested Subject :</p>
                    <Multiselect className="iklota"
                        isObject={false}
                        onSelect={(e,sel)=>{
                            user[0].tags.push(sel);
                        }} 
                        
                        onRemove={(e,sel)=>{
                            user[0].tags.pop(sel);;
                        }} 
                        options={select}
                        />
                </label>
                <ScrollToTop />
                <button onClick={mutant} className="submit_in_hole">Submit</button>
            </form>
            <div className="already">Already a member?</div>
            <button className="already_butt"><Link to="/login">Sign In</Link></button>
        </div>
    );
}

export default SignupForm;