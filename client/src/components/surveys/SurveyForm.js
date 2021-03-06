import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {
        label: 'Survey Title',
        name: 'title',
        error: 'Provide a Survey Title'
    }, {
        label: 'Subject Line',
        name: 'subject',
        error: 'Provide a Subject Line'
    }, {
        label: 'Email Body',
        name: 'body',
        error: 'Provide a Email Body'
    }, {
        label: 'Recipient List',
        name: 'emails',
        error: 'Provide a Recipeint List'
    }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({label, name}) => {
            return (<Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}/>);
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this
                    .props
                    .handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({name, error}) => {
        if (!values[name]) {
            errors[name] = error;
        }
    });    

    return errors;
}

export default reduxForm({validate, form: 'surveyForm'})(SurveyForm);