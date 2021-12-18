import React, { FC } from "react";

interface Props{
    name:string;
    login:string;
    email:string;
    bio:string;
    avatar_url:string;
}

const UserCard:React.FC<Props> = ({name,login,email,bio,avatar_url})=>{
    return(
        <div>
            {name}
            {bio}
            {email}
            {login}
            <img src={avatar_url} alt={`${name} image`}/>
        </div>
    )
}

export default UserCard;