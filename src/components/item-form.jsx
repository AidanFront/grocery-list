import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Formik } from "formik";

export default class ItemForm extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <Container>
        <h5>{title}</h5>
        <Formik
          initialValues={
            {
              itemname: data.itemname ? data.itemname : '',
              tag: data.tag ? data.tag : '',
              price: data.price ? data.price : '',
              quantity: data.quantity ? data.quantity : 1,
            }
          }
          validate={values => {
            const errors = {};
            if (!values.itemname) {
              errors.itemname = 'Item must have a name';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.itemname)
            ) {
              // errors.itemname = '';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            this.props.item(values, data.id);
            setTimeout(() => this.props.closePortal(), 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
              <form
                data-testid="form-item"
                onSubmit={handleSubmit}
              >
                <Row className="py-4">
                  <Col xs='6' className="text-danger small">
                    <label htmlFor="itemname">NAME:</label>
                    <br />
                    <input
                      className="w-100"
                      type="itemname"
                      name="itemname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.itemname}
                    />
                    {errors.itemname && touched.itemname && errors.itemname}
                  </Col>
                  <Col xs='2' className="text-danger small pl-0">
                    <label htmlFor="tag">TAG:</label>
                    <br />
                    <input
                      className="w-100"
                      type="tag"
                      name="tag"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tag}
                    />
                    {errors.tag && touched.tag && errors.tag}
                  </Col>
                  <Col xs='2' className="text-danger small pl-0">
                    <label
                      htmlFor="price"
                    >
                      PRICE:
          </label> <br />
                    <input
                      className="w-100 text-center"
                      type="price"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                    />
                    {errors.price && touched.price && errors.price}
                  </Col>
                  <Col xs='2' className="text-danger small pl-0">
                    <label
                      htmlFor="quantity"
                    >
                      QUANTITY:
          </label> <br />
                    <input
                      className="w-100 text-center"
                      type="quantity"
                      name="quantity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quantity}
                    />
                    {errors.quantity && touched.quantity && errors.quantity}
                  </Col>
                </Row>
                <Row>
                  <Col xs='12' className="d-flex justify-content-center py-3">
                    <button
                      data-testid="form-item-btn"
                      className="btn--add-item rounded-pill w-100"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      ADD ITEM
                    </button>
                  </Col>
                </Row>

              </form>
            )}
        </Formik>
      </Container>
    )
  }
}
