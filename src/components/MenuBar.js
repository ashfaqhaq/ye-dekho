import React, {  useState } from 'react';
import { Menu,Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ClipperBoard from '../images/ClipperBoard.jpg'

       


import { useAuth } from "../context/AuthContext"

function MenuBar() {
  const {currentUser,logout} = useAuth()
  const pathname = window.location.pathname;
 
  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  console.log(activeItem)
  console.log(currentUser)
  const menuBar = currentUser ? (
    <Menu pointing secondary size="massive" color="teal">
   <Menu.Item name='Home' active as={Link} to="/"> 
   
   <Image src={ClipperBoard} size="mini"/>
  {" "} Home 
   </Menu.Item>    

      <Menu.Menu position="right">
      <Menu.Item name='about' active as={Link} to="/about" />   
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
     <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >

<Image src={ClipperBoard} size="mini"/>
  {" "} Home 
</Menu.Item>
       <Menu.Item
        name="about"
        active={activeItem === 'about'}
        onClick={handleItemClick}
        as={Link}
        to="/About"
      />
  
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/signup"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;