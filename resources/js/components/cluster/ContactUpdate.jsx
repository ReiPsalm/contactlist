import React, { useState } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export const ContactUpdate = (props) => {
    //forms
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNote] = useState('');
    const dataForm ={};
    //for the messages
    const [show, setShow] = useState(false);
    const [msgType, setType] = useState('') //danger - success- warning -info
    const [msgHeader, setMsgHeader] = useState(''); //header for the alert
    const [msgContent, setMsgContent] = useState('');
    
    function onFinish () {
        dataForm.name = name;
        dataForm.mobile = mobile;
        dataForm.address = address;
        dataForm.email = email;
        dataForm.notes = notes;

        axios.patch(`api/contact/patch`, dataForm)
        .then(response => {
            if(response.status === 200) {
                setShow(true);
                setType(response.data.status);
                setMsgHeader(response.data.header);
                setMsgContent(response.data.message);
            }
        })
        .catch(error =>{
            console.error(error);
        })
    }

    return (
        <React.Fragment>
            <Alert variant={(msgType === 200)?'success':'danger'} onClose={() => setShow(false)} show={show}>
                <Alert.Heading>{msgHeader}</Alert.Heading>
                <p>{msgContent}</p>
            </Alert>
            {
                props.contactDetails.map(data => 
                    <Form key={data.contact_id}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Contact Name" 
                                value={(name.length <= 0)?setName(data.name):name} 
                                onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Contact Mobile" 
                                value={(mobile.length <= 0)?setMobile(data.mobile):mobile} 
                                onChange={e => setMobile(e.target.value)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" 
                            value={(email.length <= 0)?setEmail(data.email):email} 
                            onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGridAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="1234 Main St" 
                            value={(address.length <= 0)?setAddress(data.address):address} 
                            onChange={e => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGridNotes">
                            <Form.Label>Contact Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                            value={(notes.length <= 0)?setNote(data.notes):notes} 
                            onChange={e => setNote(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={() => onFinish()} className="btn btn-block">Update</Button>
                    </Form>
                )
            }
        </React.Fragment>
    )
}

export default ContactUpdate;