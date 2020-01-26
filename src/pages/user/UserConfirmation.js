import React from 'react'

import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LoginForm from "../../components/forms/user/LoginForm";
import Validators from "../../constants/ValidatorTypes";
import {login} from "../../base/OAuth";
import { activateUser } from '../../services/UserService';


class UserConfirmation extends Page {


    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            redirectUrl: props.location.state ? props.location.state.redirectUrl : '/'
        };

        this.props.changeFullScreen(true);
    }

    componentDidMount() {

        let token = this.getSearchParam('registrationToken');

        console.log(token);

        activateUser(token).then(response => {
            this.props.history.push('/login');
        });
    }


    render() {

        return '';
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
        login: Actions.login
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserConfirmation));