import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { PortalWithState } from 'react-portal';
import ItemForm from "./item-form";


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
    }, () => {
      this.props.search(this.state.search)
    });
  }

  render() {
    return (

      <header className="header">
        <Row className="py-4">
          <Col xs="12" md="6">
            <i className="fas fa-carrot"></i>
            <h1 className="pl-2 d-inline-flex">Grocery List</h1>
          </Col>
          <Col xs="12" md="6" className="pr-1 d-flex justify-content-md-center">
            <div className="c-search-bar position-relative">
              <input
                className="rounded-pill px-2"
                id="search"
                type="text"
                placeholder="Search by Category"
                value={this.state.search}
                onChange={this.updateSearch}
              />
              <i className="fas fa-search position-absolute"></i>
            </div>
          </Col>
          <PortalWithState closeOnOutsideClick closeOnEsc>
            {({ openPortal, closePortal, isOpen, portal }) => (
              <Fragment>
                <button
                  className="c-add-item rounded-circle position-fixed"
                  onClick={openPortal}
                  data-testid="add-button"
                >
                  <i className="fas fa-plus"></i>
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
                      item={this.props.add}
                      data={{}}
                      closePortal={() => closePortal()}
                      title="Add a new Item"
                    />
                  </div>
                )}
              </Fragment>
            )}
          </PortalWithState>
        </Row>
      </header>
    )
  }
}