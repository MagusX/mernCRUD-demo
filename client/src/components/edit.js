import React, { Component } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
  }

  onChangeName = e => {
    this.setState({name: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    axios.put(`/items/${this.props.match.params.id}`, {
      name: this.state.name
    })
    .then(res => {
      console.log("nice");
      console.log(res.data);
    })
    .catch(err => console.log(err));
    console.log(this.state.name);

    this.setState({name: ""});
  }

  render() {
    return (
      <Container>
      <Form onSubmit={this.onSubmit}>
        <Form.Control name="name" type="text" onChange={this.onChangeName} value={this.state.name} required />
        <Button variant="primary" size="block" type="submit">
          Save
        </Button>
      </Form>
      </Container>
    );
  }
}