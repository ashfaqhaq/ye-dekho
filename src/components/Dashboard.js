/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { Button, Form, Input, Grid, Image, Icon } from 'semantic-ui-react';
import {db} from "../firebase/firebase"
import { useAuth } from "../context/AuthContext"

import { useHistory } from 'react-router';


function Dashboard() {

  
    const { currentUser } = useAuth()
  
    const history = useHistory();
    function toggleInProgress(item) {
      notesRef.collection("todos").doc(item.id).update({
          inProgress: !item.inProgress
      })
  }


    const [todos, setTodos] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [type, setType] = useState("")
    const notesRef= db.collection("users").doc(currentUser.uid);
    useEffect(() => {
      getTodos();
    }, [])
  
    async function getTodos() {
        const notesRef =db.collection("users").doc(currentUser.uid);
        // console.log(await notesRef.get())
        notesRef.collection("todos").onSnapshot(function (querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          todo: doc.data().todo,
          inProgress: doc.data().inProgress
        }))
        )
      })
      
    }
  function onChange(e){
    setSearchInput(e.target.value)
  }


//   function deleteTodo(id){  
//     notesRef.collection("todos").doc(id).delete();
// }
   async function onSubmit(e) {
      e.preventDefault();
 
     
    await  notesRef.collection("todos").add({
        inProgress: true,
        todo: searchInput,
      });
    
    
    }
    async function searchMovie(e) {
      e.preventDefault();
 
      history.push({
        pathname: '/search',
        search: `?search=${searchInput}&type=${type}`
       
    })
    
      setSearchInput('');
    
    }
    
        return (
        <>
  <Form onSubmit={searchMovie}>
        
        <Form.Field>
        <Grid.Row>
        <Grid.Column column={8}>
            <Input icon='search' placeholder='Search...' 
            onChange={onChange}
            value={searchInput} 
            style={{marginTop:'1rem'}}
            // error={error ? true : false}
            />
            
          
          <Button type="submit" color="teal">
            Submit
          </Button>
        
            </Grid.Column>
         
            </Grid.Row>
        
        </Form.Field>
       
         
      </Form>
      <Grid>
    <Grid.Column width={4}>
      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
    </Grid.Column>
    <Grid.Column width={9}>
   
    </Grid.Column>
    <Grid.Column width={3}>
      {/* <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' /> */}
      <Icon name='star' size='large' />
    </Grid.Column>
  </Grid>

        
        </>

    )
}

export default Dashboard
