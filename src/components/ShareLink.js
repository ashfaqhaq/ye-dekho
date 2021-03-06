import React,{useState} from 'react'
import {  Icon,Input} from 'semantic-ui-react'
import { useAuth } from "../context/AuthContext";

 

      


function ShareLink() {

     const [showURL, setShowURL] = useState(false)

    const { currentUser } = useAuth();

      
    const generateURL=()=>{

        setShowURL(true);
    }

    return (
        <div onClick={generateURL}>
     
    <Icon name='share alternate' size="big"  color='red'  style={{margin:'0.5rem'}} />
    Click to Generate Link
    {' '} and 
        Send the link to your friends
    
    
    {showURL &&   <Input fluid disabled
    action={{
      color: 'teal',
      labelPosition: 'right',
      icon: 'copy',
      content: 'Copy',
      onClick:() => {navigator.clipboard.writeText(`ye-dekho.netlify.app/share/users/${currentUser.displayName}`)},
    }}
    
    defaultValue={`ye-dekho.netlify.app/share/users/${currentUser.displayName}`}
  /> }
  

  </div>
    )
}

export default ShareLink
