import React, { Component, Fragment } from 'react'
import {
  Row,
  Col
} from 'reactstrap';
import { PortalWithState } from 'react-portal';
import ItemForm from "./item-form";

export default class ListItem extends Component {

  render() {
    const { itemname, tag, price, quantity, id } = this.props.data;
    return (
      <div className="list-item my-1 rounded-pill px-2">
        <Row>
          <Col sm="8" xs="6" className="d-flex justify-content-between">
            <span className="text-capitalize text-truncate">{itemname}</span>
            <button
              className="list-item__tag text-uppercase rounded-pill border-0"
              onClick={() => this.props.search(tag)}
            >
              <b className="text-truncate">{tag}</b>
            </button>
          </Col>
          <Col sm="1" xs="2" className="d-flex justify-content-center">
            <span className="small"></span>{price && '$' + price}
          </Col>
          <Col sm="1" xs="2" className="d-flex justify-content-center px-0">
            {quantity ? <span className="text-truncate">{quantity}</span> : ""}
          </Col>
          <Col xs="2" className="list-item__quantity text-center p-0">

            <PortalWithState closeOnOutsideClick closeOnEsc>
              {({ openPortal, closePortal, isOpen, portal }) => (
                <Fragment>
                  <button
                    className="border-0 d-inline-flex"
                    onClick={openPortal}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  {portal(
                    <div className="portal-modal border rounded p-3">
                      <button
                        className="portal-modal__close-btn position-absolute border-0"
                        onClick={closePortal}
                      >
                        <i className="fas fa-times" />
                      </button>

                      <ItemForm
                        item={this.props.edit}
                        data={this.props.data}
                        closePortal={() => closePortal()}
                        title="Edit Item"
                      />
                    </div>
                  )}
                </Fragment>
              )}
            </PortalWithState>
            <button
              className="border-0 d-inline-flex"
              onClick={() => this.props.delete(id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </Col>
        </Row>
      </div>
    )
  }
}
