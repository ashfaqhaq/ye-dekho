/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
// import { Button,  Input, Grid, Image, Icon } from 'semantic-ui-react';
import {db} from "../firebase/firebase"
import { useAuth } from "../context/AuthContext"
import { Card } from 'semantic-ui-react'
import Rating from '@material-ui/lab/Rating';
import {Input} from 'semantic-ui-react';
import { Button, Form, Grid, Image, Icon, Label,Segment, Header,  } from 'semantic-ui-react';


import { useHistory } from 'react-router';


function Dashboard() {

  
    const { currentUser } = useAuth()
  
    const history = useHistory();
  //   function toggleInProgress(item) {
  //     notesRef.collection("todos").doc(item.id).update({
  //         inProgress: !item.inProgress
  //     })
  // }


    const [todos, setTodos] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [type, setType] = useState("")
  //  if(currentUser.displayName){
  //   console.log(currentUser);
  //   console.log(currentUser.displayName);

  //   var notesRef = db.collection("users").doc(currentUser?.displayName);
  //   }   
    useEffect(() => {
      console.log({currentUser})
      getTodos();
    }, [currentUser])
  
    async function getTodos() {

      try{
        console.log(currentUser," line 40")
        const notesRef = await db.collection("users").doc(currentUser.displayName);
        const noteData = await notesRef.get();
        console.log(noteData)
        notesRef.collection("reviews").onSnapshot(function (querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc) => ({
            id:doc.id,
            Plot: doc.data().Plot|| 'default',
            Title:doc.data().Title|| '',
            Rating:doc.data()?.imdbRating|| '',
            Runtime: doc.data()?.Runtime || '',
            Type: doc.data()?.Type || '',
            Writer: doc.data()?.Writer || '',
            Poster:doc.data()?.Poster || '',
            Year: doc.data()?.Year || '',
            imdbID: doc.data()?.imdbRating || '',
            imdbRating: doc.data()?.imdbRating || '',
            imdbVotes: doc.data()?.imdbVotes || '',           
            genreArray:doc.data()?.genreArray || '',
            isSpoiler: doc.data()?.isSpoiler,
            review:doc.data().review || '',
        }))
        )
      })
      }
      catch(error){
        console.log(error)
      }
    }
  function onChange(e){
    setSearchInput(e.target.value)
  }


//   function deleteTodo(id){  
//     notesRef.collection("reviews").doc(id).delete();
// }
  //  async function onSubmit(e) {
  //     e.preventDefault();
 
     
  //   await  notesRef.collection("todos").add({
  //       inProgress: true,
  //       todo: searchInput,
  //     });
    
    
  //   }
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
      {console.log(todos)}
      <Icon name='star' size='large' />
    </Grid.Column>
  </Grid>
  <br/>
  <Card.Group> 
  <Grid celled>
    {todos.map((data)=>{return(<Grid.Row>
                    <Grid.Column computer={3} mobile={8}>
                        {data?.Poster === "N/A" ? <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> : <Image src={data?.Poster} />}

                    </Grid.Column>
                    <Grid.Column computer={13} mobile={16} style={{boxShadow:'none'}}>
                    <Segment raised floated="right">
                          <Label as='a' color='red' ribbon='right'>
                      {data?.Type.toUpperCase()}
                         </Label>
                        <Card fluid style={{boxShadow:'none'}}>
                            <Card.Content>

                                <Card.Header>{data?.Title}</Card.Header>
                                <Card.Meta>{data?.Year}</Card.Meta>
                               


                                <Label.Group tag >
                                    {/* {data?.genreArray?.map((item => <Label as='a'  color='blue' >{item}</Label>))} */}
                                   

                                </Label.Group>
                                {/* <Label.Group >
                                {data?.Actors.split(',')?.map((item => <Label as='a' image> <img src={`avatars.dicebear.com/v2/avataaars/${item}.svg?options%5bmood%5d%5b%5d=sad`} />{item}</Label>))}
                                </Label.Group> */}
                                <Card.Description>
                                <br />
                                    Plot :  {data?.Plot}       <br />
                                </Card.Description>

                            </Card.Content>
                            <Card.Content extra>
                                Rating:   <Rating name="half-rating-read" defaultValue={0} size="large" value={(0+data?.imdbRating)/2}  precision={0.5} readOnly />
                            <br />
         Number of votes:   {data?.imdbVotes}


                                {/* {data  && <Modal  data = {data}/>} */}
                               
                                    
                                    
                               
                            </Card.Content>
                        </Card>
                        </Segment>
                        {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' /> */}
                    </Grid.Column>
                </Grid.Row>
            )})}</Grid>
  </Card.Group>

        
        </>

    )
}

export default Dashboard
