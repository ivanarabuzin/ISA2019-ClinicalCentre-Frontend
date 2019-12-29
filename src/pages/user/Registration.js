import React from 'react'

import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Validators from "../../constants/ValidatorTypes";


class Register extends Page {

    validationList = {
        email: [ {type: Validators.EMAIL } ],
        password: [ {type: Validators.REQUIRED } ],
        passwordRepeat: [ {type: Validators.REQUIRED } ],
        address: [ {type: Validators.REQUIRED } ],
        city: [ {type: Validators.REQUIRED } ],
        country: [ {type: Validators.REQUIRED } ],
        phoneNumber: [ {type: Validators.REQUIRED } ],
        jbo: [ {type: Validators.REQUIRED } ]
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            redirectUrl: props.location.state ? props.location.state.redirectUrl : '/'
        };

        this.props.changeFullScreen(true);

        this.keyPress = this.keyPress.bind(this);
    }

    componentDidMount() {

        if(this.props.auth.user) {
            this.props.history.push('/');
        }
    }

    keyPress(event) {

        if(event.key == 'Enter') {
            this.login()
        }
    }

    register() {

        if(!this.validate()) {
            return;
        }

        register(this.state.data).then(response => {

            this.props.history.push({
                pathname: this.state.redirectUrl
            })
        });
    }

    render() {

        return (

            <div id='login'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>{ strings.login.login }</h1>


                        <RegistrationForm onSubmit={ () => this.register() } onChange={ this.changeData }
                                   keyPress={ this.keyPress }
                                   data={ this.state.data } errors={ this.state.errors }/>
                    </Paper>
                </Grid>
            </div>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));