import React, { useState } from 'react';
import { Card, ListGroup, Button, Alert, Modal, Form } from 'react-bootstrap';
import { FiUpload, FiCheck, FiTrash } from "react-icons/fi";
import axios from 'axios';
import ContactUpdate from './ContactUpdate';

const ContactView = (props) => {
    const [showNotif, setShowNotif] = useState(false);
    const [notifHeader, setNotifHeader] = useState('');
    const [notifMessage, setNotifMessage] = useState('');
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //file input
    const defaultProfile = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const [profile, setProfile] = useState('');
    const dataForm = {};

    const deleteContact = contact_id => {
        axios.patch(`api/contact/delete/${contact_id}`)
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

    const fileOpen = () => { $('#file-upload').trigger('click'); }

    const setImage = (fileData) => {
        let imageReader = new FileReader();
        imageReader.onload = (e) => {
            setProfile(e.target.result);
        };
        imageReader.readAsDataURL(fileData[0]);
    }

    const setImageContact = (contact_id) => {
        dataForm.contact_id = contact_id
        dataForm.image = profile

        axios.patch(`api/contact/upload/${contact_id}`, dataForm)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <React.Fragment>
            <ModalNotif header={notifHeader} message={notifMessage} />
            {
                (Object.keys(props.contactDetails).length >= 1)?
                props.contactDetails.map(data => 
                <Card style={{ width: '20rem' }} key={data.contact_id}>
                    <Card>
                        <Card.Img width={100} src={
                            (profile.length <= 0)?
                            (data.image === null)?defaultProfile:data.image:profile
                        } />
                        <Card.ImgOverlay>
                            <Card.Title>
                                {data.name} 
                                <Button variant="link" onClick={fileOpen} hidden={(profile.length <= 0)?false:true}><FiUpload /></Button>
                                <Button variant="link" className="text-success" onClick={() => setImageContact(data.contact_id)} hidden={(profile.length <= 0)?true:false}><FiCheck /></Button>
                                <Button variant="link" className="text-danger" onClick={() => { setProfile('')} } hidden={(profile.length <= 0)?true:false}><FiTrash /></Button>
                                <Form.File.Input accept="image/*" id="file-upload" style={{visibility: 'hidden'}} onChange={e => setImage(e.target.files)} />
                            </Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><strong className="text-info">Phone:</strong> {data.mobile}</ListGroup.Item>
                        <ListGroup.Item><strong className="text-info">Email:</strong> {data.email}</ListGroup.Item>
                        <ListGroup.Item><strong className="text-info">Home:</strong> {data.address}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="link" onClick={handleShow}>Update</Button>
                        <Button variant="link" onClick={()=> deleteContact(data.contact_id)}>Delete</Button>
                    </Card.Body>
                </Card>
                ): 
                <Alert variant="info" show>
                    <Alert.Heading>Howdy, My Friend!</Alert.Heading>
                    <p>You can check your contact list on the left. Try Clicking their name to view contact full details.</p>
                </Alert>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard="false">
                <Modal.Header closeButton>
                    <Modal.Title>Update Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactUpdate contactDetails={props.contactDetails} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}
export default ContactView;