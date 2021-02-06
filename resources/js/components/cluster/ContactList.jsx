import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
    Card, ListGroup, Button, Modal,
    Container, Row, Col, Alert
} from 'react-bootstrap';
import ContactAdd from './ContactAdd';
import ContactView from './ContactView';

const ContactList = () => {
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);
    const [contact, setContact] = useState([]);
    const [showNotif, setShowNotif] = useState(false);
    const [notifHeader, setNotifHeader] = useState('');
    const [notifMessage, setNotifMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () => {
        axios.get('api/contact/fetch')
        .then(response => {
            setList(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

    const viewContract = contact_id => {
        axios.get(`api/contact/view/${contact_id}`)
        .then(response => {
            setContact(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const restoreContact = contact_id => {
        axios.patch(`api/contact/restore/${contact_id}`)
        .then(response => {
            setNotifHeader(response.data.header);
            setNotifMessage(response.data.message);
            setShowNotif(true)
            setTimeout(() => {
                setShowNotif(false)
            }, 2500)
        })
        .catch(error => {
            console.error(error);
        });
    }

    const ModalNotif = ({header, message}) => (
        <Modal show={showNotif}>
            <Modal.Body>
                <Alert variant="success">
                    <Alert.Heading>{header}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            </Modal.Body>
        </Modal>
    )

    return (
        <React.Fragment>
            <ModalNotif header={notifHeader} message={notifMessage} />
            <Container style={{padding: '1rem'}} fluid>
                <Row>
                    <Col md={5}>
                    <Card>
                        <Card.Header>
                            Contact List
                            <Button variant="primary" className="float-right btn btn-sm" onClick={handleShow}>New Contact</Button>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {
                                (Object.keys(list).length >= 1)?
                                list.map(data => 
                                <ListGroup.Item key={data.contact_id}>
                                    <Button disabled={(data.isDeleted)?true:false} variant="link" onClick={()=>viewContract(data.contact_id)}>{data.name}</Button>
                                    {
                                        (data.isDeleted)?
                                        <Button variant="link" onClick={()=>restoreContact(data.contact_id)}>(Restore)</Button>:''
                                    }
                                </ListGroup.Item>):
                                <ListGroup.Item>No Contacts. Please Add first.</ListGroup.Item>
                            }
                        </ListGroup>
                    </Card>
                    </Col>
                    <Col md={7}>
                        <ContactView contactDetails={contact} />
                    </Col>
                </Row>
            </Container>
            
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard="false">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactAdd />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ContactList;
