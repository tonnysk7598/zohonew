import React, { Component } from 'react'
import { Card, CardBody, Row, Col } from "reactstrap";

export default class ErrorPage extends Component {
  render() {
    return (
        <div className="content">
        <Row>
          <Col md="2" />
          <Col md="8">
            <Card className="card-user">
              <CardBody>
                <Row><Col><h1> 404 Error. Something went wrong...!</h1></Col></Row>
                <Row><Col><p>back to &ensp;&ensp;<a href="/">Home</a></p></Col></Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="2" />
        </Row>
      </div>
    )
  }
}
