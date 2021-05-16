import React, { useEffect, useState } from 'react'

import { Button, Grid, Image, Icon, Modal, Card, Label,Segment, Header,Form,TextArea } from 'semantic-ui-react';

function ModalComponent({data}) {
   
    const [open, setOpen] = useState(false)
    return (
        <div>
                <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button  floated="right"  color='green'>
            <Icon name="write square"  /> Write a review
             </Button>}
            >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
        <Form fluid>
          <Header>Write a Review</Header>
         
         
          <Form.Field   control='textarea' rows='3' 
         
          label='Review'
          placeholder='Tell us more the movie, describe it how vividly you can .'
        />
        
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
        </div>
    )
}

export default ModalComponent
