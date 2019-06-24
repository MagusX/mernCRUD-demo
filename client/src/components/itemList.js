import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Container, Form } from "react-bootstrap";

export default class itemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: ""
    };
  }

  //Add new item
  onChangeItem = e => {
    this.setState({
      newItem: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
    console.log(`newItem: ${this.state.newItem}`);

    axios.post("/items", {
      name: this.state.newItem
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    this.setState({newItem: ""});

    /* 
    Update UI without refresh
    After POST database is updated but the UI doesn't know
    so use GET to get the latest item, push it to state Array
    */
    axios.get("/items")
    .then(res => {
      const index = res.data.length - 1;
      return this.setState(state => ({items: [...state.items, {
        key: res.data[index]._id,
        name: res.data[index].name
      }]}));
    })
    .catch(err => console.log(err));
  }

  //Render item list
  componentDidMount() {
    axios.get("/items")
    .then(res => {
      res.data.map(item => {
        return this.setState(state => ({items: [...state.items, {key: item._id, name: item.name}]}));
      });
    })
    .catch(err => console.log(err));
  }

  itemList = () => {
    //console.log(this.state.items);
    return this.state.items.map(item => {
      return (
        <tr key={item.key}>
          <td>{item.name}</td>
          <td style={{width: "2%"}}><Button href={`/${item.key}`} id={item.key} variant="warning">Edit</Button></td>
          <td style={{width: "2%"}}><Button onClick={this.handleDelete} id={item.key} variant="danger" type="submit">X</Button></td>
        </tr>
      );
    });
  }

  //Delete item
  handleDelete = e => {
    //delete from database
    const curId = e.target.id;
    axios.delete(`/items/${curId}`)
    .then(res => { //then update UI
      this.state.items.map(item => {
        return this.setState(state => ({items: state.items.filter(item => item.key !== curId)}));
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Container>
        {/* Item form */}
        <Form onSubmit={this.onSubmit}>
        <Form.Control type="text" onChange={this.onChangeItem} value={this.state.newItem} required />
        <Button variant="primary" size="block" type="submit">
          Add
        </Button>
        </Form>

        {/* Item list */}
        <Table bordered size="sm" className="mt-3">
        <tbody>
          { this.itemList() }
        </tbody>
        </Table>
        </Container>
      </div>
    );
  }
}