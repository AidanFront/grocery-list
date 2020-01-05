import React, { Component } from 'react';
import ListItem from './list-item';
import {
  Row,
  Col
} from 'reactstrap';

export default class List extends Component {
  render() {
    return (
      <div className="pt-3border-top">
        <Row>
          <Col xs="6" sm="8" className="small text-truncate ml-2">
            <u>NAME</u>
          </Col>
          <Col xs="2" sm="1" className="small text-truncate">
            <u>PRICE</u>
          </Col>
          <Col xs="2" sm="1" className="px-0 small text-truncate">
            <u>QUANTITY</u>
          </Col>
        </Row>
        {
          this.props.items.map((data, key) => {
            return (
              <ListItem
                data={data}
                search={this.props.search}
                edit={this.props.edit}
                delete={this.props.delete()}
                key={key}
              />
            )
          })
        }
      </div>
    )
  }
}
