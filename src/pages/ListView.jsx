import React, { Component } from 'react'
import { Table } from 'reactstrap'

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

export default class ListView extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <div style={{ marginTop: '2%' }}>
        {contacts.length ? (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{capitalize(contact.contact_name)}</td>
                  <td>{contact.mobile || '---'}</td>
                  <td>{capitalize(contact.company_name) || '---'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : 'No Record Found'}
      </div>
    )
  }
}
