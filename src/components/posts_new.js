import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    // helper that needs to return JSX for component attribute
    renderField(field) {
        // es6 destructuring to pull off properties on nested objects
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    // called by Redux Form's handleSubmit which calls the validation
    onSubmit(values) {
        // this === component
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}>
                </Field>
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}>
                </Field>
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}>
                </Field>
                <button type="submit" className="btn btn-primary">Save</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}

// when user tries to submit form, function is automatically called by Redux Form
// values is an object that contains the values that are submitted
// return: object that contains validation errors
function validate(values) {
    // values -> { title: 'test1', categories: 'a', content: 'blah' }
    const errors = {};

    // validate the inputs from values object
    if (!values.title) {
        // assign property to errors if error
        errors.title = 'Enter a title';
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content please!';
    }

    // if errors is empty, form is fine to submit
    // if errors has any properies, Redux Form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);