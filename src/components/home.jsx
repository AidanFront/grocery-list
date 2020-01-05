import React, { Component } from 'react';
import { Container } from 'reactstrap';
import List from './list';
import items from "../data/seed-data";
import Header from "./header";


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: items,
      search: items,
      searchParam: '',
    };
    this.addItem = this.addItem.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  testf = (a) => {
    return 5;
  };

  addItem = (values) => {
    let nextID = this.state.items[this.state.items.length - 1].id + 1;
    const newitem = {
      itemname: values.itemname,
      tag: values.tag,
      price: values.price,
      quantity: values.quantity,
      id: nextID
    }

    this.setState((prevState) => ({
      items: [...prevState.items, newitem],
    }), () => {
      this.updateSearch('')
    })
  };

  editItem = (values, id) => {
    const newItems = this.state.items.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        return values;
      }
    });
    this.setState({
      items: [...newItems]
    }, () => {
      this.updateSearch('')
    })
  };

  deleteItem = (id) => {
    if (window.confirm('Are you sure want to delete item?')) {
      this.setState({
        items: [...this.state.items.filter(item => item.id !== id)]
      }, () => {
        this.updateSearch('')
      })
    } else {
      //'Do nothing'
    }

  };

  updateSearch = (param) => {
    const params = param.toLowerCase();
    const filteredItems = this.state.items.filter(
      (item) => {
        return item.tag.toLowerCase().indexOf(params) !== -1;
      }
    );
    this.setState({
      search: filteredItems
    })
  }

  exactSearch = (param) => {
    const params = param.toLowerCase();
    const searchinput = document.getElementById('search');
    const filteredItems = this.state.items.filter(
      (item) => {
        return item.tag.toLowerCase() === params;
      }
    );
    this.setState({
      search: filteredItems,
    }, () => {
      searchinput.value = param;
    });
  }

  render() {
    const filteredSearch = this.state.search;
    return (
      <main>
        <Container>
          <Header
            data-testid="header-component"
            search={this.updateSearch}
            add={this.addItem}
          />
          <List
            data-testid="list-component"
            search={this.exactSearch}
            items={filteredSearch}
            edit={this.editItem}
            delete={() => this.deleteItem}
          />
        </Container>
      </main >
    )
  }
}

