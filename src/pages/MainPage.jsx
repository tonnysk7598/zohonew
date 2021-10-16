import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Skeleton from 'react-loading-skeleton'

import ListView from './ListView'

export default class MainPage extends Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  state = {
    allContacts: []
  }

  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.getAllContacts()
    }, 3000);
  }

  getAllContacts = async () => {
    this.setState({ loading: true })
    const response = await fetch('/getAllContacts');
    const contactsResponse = await response.json();
    this.setState({ allContacts: contactsResponse, loading: false });
  }

  routeChange=()=> {
    let path = '/create';
    this.props.history.push(path);
  }

  render() {
    const { allContacts, loading } = this.state;
    return (
      <div>
        <Container style={{ marginTop: '2%' }}>
          {!loading ? (
            <React.Fragment>
              <Row>
                <Col lg={10}>
                  <h1>All Contacts</h1>
                </Col>
                <Col lg={2}>
                  <Button onClick={this.routeChange}>Create New</Button>
                </Col>
              </Row>
              <ListView contacts={allContacts} getAllContacts={this.getAllContacts} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Skeleton height={100} duration={2} />
              <div style={{ marginTop: '2%' }} />
              <Skeleton count={15} height={30} duration={2} />
            </React.Fragment>
          )}
        </Container>
      </div>
    )
  }
}
