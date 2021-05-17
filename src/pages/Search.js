import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import Rating from '@material-ui/lab/Rating';
import { Button, Grid, Image, Icon,  Card, Label,Segment, Header } from 'semantic-ui-react';
import Modal from '../components/Modal'


function Search() {



    const [data, setData] = useState()
    const [response, setResponse] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const parsed = queryString.parse(window.location.search);
        const search = parsed.search;
        const type = parsed.type || '';
        console.log(parsed)
        //  {
            fetch(`http://www.omdbapi.com/?t=${search}&apikey=1a35b852`)

                .then(resp => resp.json())
                // .then(json => console.log(json))
                .then(json => { if(json.Response==="True"){
                    setData(json)
                    setResponse(true)
                }}
                    
                    
                    )
                .catch(err => (console.log(err)));
        // }
        // catch (error) {
        //     console.error(error);
        // }

    }, [])
    // const genreArray =  || '" "," "
    console.log(data)


    return (

        <div>
        {response?   <Grid celled>
                <Grid.Row>
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
                                    {data?.Genre.split(',')?.map((item => <Label as='a'  color='blue' >{item}</Label>))}
                                   

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


                                {data  && <Modal  data = {data}/>}
                               
                                    
                                    
                               
                            </Card.Content>
                        </Card>
                        </Segment>
                        {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' /> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        : <h1>Sorry data not found</h1> }
     
          </div>

    )
}

export default Search
