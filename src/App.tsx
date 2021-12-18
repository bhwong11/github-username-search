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

interface Initial{
  status:'initial'
}

type Service={
  status:|'loaded'|'error'
  payload:UserData;
}

const App:React.FC=()=> {
  const [searchTerm, setSearchTerm]=useState<string>('');
  const [noMatch,setNoMatch] = useState<string>('');
  const [userData,setUserData] = useState<Service | Initial>({
    status:'initial'});
  const fetchUserData= (username:String):void=>{
    setNoMatch('');
    fetch(`https://api.github.com/users/${username}`)
    .then((data:any)=>data.json())
    .then((json:any)=>{
      if(json.message==='Not Found'){
        window.alert("No match found!")
        setUserData({
          status:'initial'
        })
        setNoMatch('No matches found');
        return
      }
      setUserData({status:'loaded',payload:json,})
    })
    .catch((err)=>
      setUserData({
        status:'initial'
      })
    )
  }
  return (
    <div className="App">
      <div className="search-header">
      <div>
        Enter github user to search
      </div>
      <input 
      value = {searchTerm} 
      placeholder={'username'}
      onChange={(e):any=>setSearchTerm(e.target.value)}
      />
      <button onClick={()=>fetchUserData(searchTerm)}>Search</button>
      <button onClick={(e):void=>{
      setUserData({status:'initial'})
      setNoMatch('');
        }
      }
      >clear Search</button>
      </div>


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
