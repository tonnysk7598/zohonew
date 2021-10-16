import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup,
  Form, Input, Row, Col, Container, CardFooter
} from "reactstrap";
import swal from 'sweetalert';
import { salutation } from '../helper';

export default class EditContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    heading: '',
    mobile: '',
    status: 'active',
    invalidId: false,
    loading: true,
    firstName: '',
    lastName: '',
    salutationType: 'Mr.',
    website: '',
  }

  componentWillMount(props) {
    const contact_id = this.props.match.params.id
    this.getContactInfoByContactId(contact_id);
  }

  getContactInfoByContactId = async (contactId) => {
    fetch(`/getContact/${contactId}`)
      .then(res => res.json())
      .then(response => {
        const { statusCode, body } = response;
        if (statusCode !== 200) {
          this.setState({ invalidId: true, loading: false });
        } else {
          const contactDetails = JSON.parse(body);
          const { contact } = contactDetails;
          const { contact_persons } = contact;
          this.setState({
            contactName: contact.contact_name,
            companyName: contact.company_name,
            mobile: contact.mobile, contactId,
            invalidId: false, loading: false,
            status: contact.status,
            firstName: contact_persons[0].first_name,
            lastName: contact_persons[0].last_name,
            salutationType: contact_persons[0].salutation,
            website: contact.website,
          })
        }
      })
  }

  submit = async () => {
    const {
      contactName, companyName, mobile, firstName,
      lastName, salutationType, website, contactId
    } = this.state;
    const editData = {
      contactName, companyName, mobile, firstName,
      lastName, salutationType, website,
    }
    const putData = await fetch(`/updateContact/${contactId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify(editData)
    })
    const res = await putData.json();
    const localthis = this.props;
    if (res.statusCode === 200) {
      swal({
        title: 'Success',
        text: 'Record Updated Successfully',
        icon: 'success',
        button: true,
      })
        .then(() => {
          localthis.history.goBack();
        })
    } else {
      const errorMesage = JSON.parse(res.body);
      swal('Error', `${errorMesage.message}`, 'error')
    }
  }

  changeStatus = async () => {
    const { contactId, status } = this.state;
    swal({
      title: 'Are you sure?',
      text: 'You are trying to change the status of the contact..!',
      icon: 'info',
      buttons: ['No', 'Yes Proceed'],
    })
      .then(async (proceed) => {
        if (proceed) {
          const updateData = {
            status: status === 'active' ? 'inactive' : 'active',
          }
          const postData = await fetch(`/updateStatus/${contactId}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(updateData)
          })
          const res = await postData.json();
          if (res.statusCode === 200) {
            const successMesage = JSON.parse(res.body);
            const localthis = this.props;
            swal({
              title: 'Success',
              text: `${successMesage.message}`,
              icon: 'success',
              button: true,
            })
              .then(() => {
                if (status === 'active') {
                  localthis.history.goBack();
                } else {
                  this.setState({ status: 'active' })
                }
              })
          } else {
            const errorMesage = JSON.parse(res.body);
            swal('Error', `${errorMesage.message}`, 'error')
          }
        }
      })
  }

  render() {
    const {
      contactName, companyName, mobile, loading, invalidId, status,
      firstName, lastName, salutationType, website,
    } = this.state;
    return (
      <Container style={{ marginTop: '2%' }}>
        {loading ? (
          <Skeleton height={200} duration={2} />
        ) : (
          !invalidId ? (
            <Row>
              <Col md="2" />
              <Col md="8">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Edit</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="2">
                          <FormGroup>
                            <label>Salutation</label>
                            <Input
                              type="select"
                              value={salutationType}
                              onChange={(e) => this.setState({ salutationType: e.target.value })}
                            >
                              {salutation.map(d => (<option key={d.label} value={d.value}>{d.value}</option>))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="5">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              placeholder="First Name"
                              type="text"
                              value={firstName}
                              onChange={(e) => this.setState({ firstName: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="5">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              placeholder="Last Name"
                              type="text"
                              value={lastName}
                              onChange={(e) => this.setState({ lastName: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Contact Name</label>
                            <Input
                              placeholder="Contact Name"
                              type="text"
                              value={contactName}
                              onChange={(e) => this.setState({ contactName: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Company Name</label>
                            <Input
                              placeholder="Company Name"
                              type="text"
                              value={companyName}
                              onChange={(e) => this.setState({ companyName: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Website</label>
                            <Input
                              placeholder="www.example.com"
                              type="text"
                              value={website}
                              onChange={(e) => this.setState({ website: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Mobile</label>
                            <Input
                              placeholder="xxxxx xxxxx"
                              type="text"
                              maxlength="10"
                              value={mobile}
                              onChange={(e) => this.setState({ mobile: e.target.value.replace(/\D/, '') })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="text-muted">
                    <div style={{ float: 'right' }}>
                      <Button
                        className="btn-round"
                        color="secondary"
                        onClick={() => this.props.history.goBack()}
                      >
                        Close
                      </Button>&ensp;&ensp;
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.changeStatus()}
                      >
                        {status === 'active' ? 'Mark as In-Active' : 'Mark as Active'}
                      </Button>&ensp;
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.submit()}
                        disabled={status === 'active' ? false : true}
                      >
                        Update Contact
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="2" />
            </Row>
          ) :
            <Row>
              <Col md="2" />
              <Col md="8">
                <Card className="card-user">
                  <CardBody>
                    <Row><Col><h1> No Record Found ...!</h1></Col></Row>
                    <Row><Col><p>back to &ensp;&ensp;<a href="/">Home</a></p></Col></Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2" />
            </Row>
        )}
      </Container>
    )
  }
}
