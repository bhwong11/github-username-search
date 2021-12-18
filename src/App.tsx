import React from 'react';
import './App.css';
import {useState,useEffect} from 'react';



interface UserData{
  name:string;
  email:string;
  bio:string;
  avatar_url:string;
}

type Service={
  status:'initial'|'loading'|'loaded'|'error',
  payload:UserData;
}


const App:React.FC=()=> {
  const [searchTerm, setSearchTerm]=useState('');
  const [userData,setUserData] = useState<Service>({
    status:'initial',
    payload:{
    name:'',
    email:'',
    bio:'',
    avatar_url:'',
  }});
  const fetchUserData= (username:String):void=>{
    fetch(`https://api.github.com/users/${username}`)
    .then((data:any)=>data.json())
    .then((json:any)=>{
      setUserData({status:'loaded',payload:json,})
    })
    .catch((err)=>
      console.log(err)
    )
  }
  return (
    <div className="App">
      Hello World!
      <input 
      value = {searchTerm} 
      onChange={(e):any=>setSearchTerm(e.target.value)}/>
      <button onClick={()=>fetchUserData(searchTerm)}>Search</button>
      <button onClick={(e):any=>setUserData({status:'initial',payload:{
        name:'',
        email:'',
        bio:'',
        avatar_url:'',
      }})}
      >clear Search</button>
      {userData.payload?<>
        {userData.payload.name}
        {userData.payload.bio}
        {userData.payload.email}
        {searchTerm}
        <img src={userData.payload.avatar_url} alt={searchTerm}/>
      </>:<></>}

    </div>
  );
}

export default App;
