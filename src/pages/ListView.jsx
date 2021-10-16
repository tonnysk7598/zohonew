import React, { Component } from 'react'
import { Table, Button, Row, Col, Card, CardBody } from 'reactstrap'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

export default class ListView extends Component {
  deleteContact = (contactInfo) => {
    const { contact_id } = contactInfo;
    const { getAllContacts } = this.props;
    swal({
      title: 'Delete contact? Are you sure?',
      text: 'Once deleted, you will not be able to recover this data',
      icon: 'warning',
      buttons: ['No', 'Yes, delete'],
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          this.setState({ loading: true });
          const postData = await fetch(`/deleteContact/${contact_id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'delete',
          })
          await postData.json();
          swal({
            title: 'Poof...!',
            text: 'This contact has been deleted!',
            icon: 'success',
            button: true,
          })
            .then(() => {
              getAllContacts();
            });
        } else {
          return null;
        }
      })
  }

  render() {
    const { contacts } = this.props;
    return (
      <div style={{ marginTop: '2%' }}>
        {contacts.length ? (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Contact Name</th>
                <th>Phone</th>
                <th>Company</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{capitalize(contact.contact_name)}</td>
                  <td>{contact.mobile || '---'}</td>
                  <td>{capitalize(contact.company_name) || '---'}</td>
                  <td>
                    <Link to={`/view/${contact.contact_id}`}><Button color="secondary">View</Button></Link>&ensp;&ensp;
                    <Link to={`/edit/${contact.contact_id}`}><Button color="primary">Edit</Button></Link>&ensp;&ensp;
                    <Link to={`/clone/${contact.contact_id}`}><Button color="success">Clone</Button></Link>&ensp;&ensp;
                    <Button color="danger" onClick={() => this.deleteContact(contact)}>Delete </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Row>
            <Col md="2" />
            <Col md="8">
              <Card className="card-user">
                <CardBody>
                  <Row><Col><h2 style={{color:'blue'}}>No Record Found....!</h2></Col></Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="2" />
          </Row>
        )}
      </div>
    )
  }
}
