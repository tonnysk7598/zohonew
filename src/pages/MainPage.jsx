import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'
import ListView from './ListView'

export default class MainPage extends Component {
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

  render() {
    const { allContacts, loading } = this.state;
    return (
      <div>
        <Container style={{ marginTop: '2%'}}>
        {!loading ? (
            <React.Fragment>
              <Button>Create New</Button>
              <ListView contacts={allContacts} />
            </React.Fragment>
        ) : ''}
        </Container>
      </div>
    )
  }
}
