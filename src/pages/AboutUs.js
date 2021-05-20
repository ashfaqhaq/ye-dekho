import React from "react";
import { Header, Icon,Image } from "semantic-ui-react";

import PopcornSVG from '../images/Popcorn.svg'

function AboutUs() {
  return (
    <div>
        <Image src={PopcornSVG} size="small" centered/>
      <Header as="h1" textAlign="center" color="blue" content="Ye Dekho" />
      <Header as="h3" textAlign="center" color="green">
        A personalised iMDB page where you can list all of your watched titles.
        You can also share the link with your friends!{" "}
      </Header>

      <Header as="h3" icon textAlign="center">
      <Icon name="add user outline" circular />
        <Header.Content>Signup/Login</Header.Content>
      </Header>
      <Header as="h3" icon textAlign="center">
      <Icon name="arrow down"  />
        
      </Header>
     
      <Header as="h3" icon textAlign="center">
      <Icon name="searchengin" circular />
        <Header.Content>Search for a Title</Header.Content>
      </Header>
      <Header as="h3" icon textAlign="center">
      <Icon name="arrow down"  />
        
      </Header>
      <Header as="h3" icon textAlign="center">
      <Icon name="add" circular />
        <Header.Content>Add a review</Header.Content>
      </Header>
      <Header as="h3" icon textAlign="center">
      <Icon name="arrow down"  />
        
      </Header>
      <Header as="h2" icon textAlign="center">
      <Icon name="share" circular />
       
        <Header.Content>Share with Friends</Header.Content>
      </Header>
    
     
    </div>
  );
}

export default AboutUs;
