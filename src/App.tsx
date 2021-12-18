import React from 'react';
import './App.css';
import {useState,useEffect} from 'react';
import UserCard from './components/UserCard';

interface UserData{
  name:string;
  login:string;
  email:string;
  bio:string;
  avatar_url:string;
}

type Service={
  status:'initial'|'loaded'|'error'
  payload:UserData;
}

const App:React.FC=()=> {
  const [searchTerm, setSearchTerm]=useState<string>('');
  const [noMatch,setNoMatch] = useState<string>('');
  const [userData,setUserData] = useState<Service>({
    status:'initial',
    payload:{
    name:'',
    email:'',
    bio:'',
    login:'',
    avatar_url:'',
  }});
  const fetchUserData= (username:String):void=>{
    setNoMatch('');
    fetch(`https://api.github.com/users/${username}`)
    .then((data:any)=>data.json())
    .then((json:any)=>{
      if(json.message==='Not Found'){
        window.alert("No match found!")
        setUserData({
          status:'initial',
          payload:{
          name:'',
          email:'',
          bio:'',
          login:'',
          avatar_url:'',
        }})
        setNoMatch('No matches found');
        return
      }
      setUserData({status:'loaded',payload:json,})
    })
    .catch((err)=>
      setUserData({
        status:'initial',
        payload:{
        name:'',
        email:'',
        bio:'',
        login:'',
        avatar_url:'',
      }})
    )
  }
  return (
    <div className="App">
      Hello World!
      <input 
      value = {searchTerm} 
      onChange={(e):any=>setSearchTerm(e.target.value)}/>
      <button onClick={()=>fetchUserData(searchTerm)}>Search</button>
      <button onClick={(e):void=>{
      setUserData({status:'initial',payload:{
        name:'',
        login:'',
        email:'',
        bio:'',
        avatar_url:'',
      }})
      setNoMatch('');
    }
    }
      >clear Search</button>
      {userData.status==='loaded'?<>
        <UserCard 
        name={userData.payload.name} 
        bio={userData.payload.bio} 
        email={userData.payload.email} 
        login={userData.payload.login} 
        avatar_url={userData.payload.avatar_url}/>
      </>:<></>}
      {noMatch?<>
        No Matches Found
      </>:<></>}

    </div>
  );
}

export default App;
