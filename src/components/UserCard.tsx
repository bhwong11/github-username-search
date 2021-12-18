import React, { FC } from "react";
import './UserCard.css'

interface Props{
    name:string;
    login:string;
    email:string;
    bio:string;
    avatar_url:string;
}

const UserCard:React.FC<Props> = ({name,login,email,bio,avatar_url})=>{
    return(
        <div className="user-card">
            <div>
            <span className="title">Name:</span> {name?name:'no name found'}
            </div>
            <div>
            <span className="title">Bio:</span> {bio?bio:'no bio found'}
            </div>
            <div>
            <span className="title">Email:</span> {email?email:'no email found'}
            </div>
            <div>
            <span className="title">Login:</span> {login?login:'no username found'}
            </div>
            <div>
            <div className="title">Avatar:</div>
                <img className="avatar-img" src={avatar_url} alt={`${name} image`}/>
            </div>
        </div>
    )
}

export default UserCard;