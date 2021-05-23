import React, {useState, useEffect} from 'react'
import {auth} from '../services/firebase'
import {db} from '../services/firebase'
import {Row, Col, Container, Button, Navbar, Form, ListGroup} from 'react-bootstrap'

const Chat = () => {
  const user = auth().currentUser
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [readError, setReadError] = useState(null)
  const [writeError, setWriteError] = useState(null)

  useEffect(() => {
    const khan = async() => {
      setReadError('')
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats)
      });
    } catch (error) {
      setReadError(error.message)
    }
    }
    khan()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWriteError(null)
    try {
      await db.ref("chats").push({
        content,
        timestamp: Date.now(),
        uid: user.uid
      });
      setContent('')
    } catch (error) {
      setWriteError(error.message)
    }
  }

  return (
    <div
     className='bg-light page'
     style={{ height: '100vh', overflowX: 'hidden' }}
>
  <Row>
    <Col>
    <Container>
    <div>
       {chats.map(chat => {
           return (
              <ListGroup key={chat.timestamp}>
                <ListGroup.Item action variant='warning' className='mb-2'>
                    {chat.content}
                  </ListGroup.Item>
                </ListGroup>
           )
         })}
        {readError && <p>{readError}</p>}
      </div>
    </Container>
    </Col>
  </Row>
<Navbar fixed='bottom'>
<Container>
<Form
           inline
           className='w-100 d-flex justify-content-between align-items-center'
           onSubmit={handleSubmit}
>
<Form.Group style={{ flex: 1 }}>
<Form.Control
               style={{ width: '100%' }}
               required
               type='text'
               placeholder='Say something...'
               value={content}
               onChange={(e) => setContent(e.target.value)}
             />
</Form.Group>
     {writeError ? <p>{writeError}</p> : null}

<Button variant='primary' type='submit'>
             Send
</Button>
</Form>
</Container>
</Navbar>
</div>
  )
}

export default Chat
