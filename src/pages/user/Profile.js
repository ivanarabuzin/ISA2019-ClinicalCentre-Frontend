import React from 'react'

import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProfileForm from "../../components/forms/user/ProfileForm";
import Validators from "../../constants/ValidatorTypes";
import {login, setUserToLocalStorage} from "../../base/OAuth";
import { editProfile } from '../../services/UserService';


class Profile extends Page {

    validationList = {
        address: [ {type: Validators.REQUIRED } ],
        city: [ {type: Validators.REQUIRED } ],
        country: [ {type: Validators.REQUIRED } ],
        phoneNumber: [ {type: Validators.REQUIRED } ],
        name: [ {type: Validators.REQUIRED } ],
        surname: [ {type: Validators.REQUIRED } ]
    };

    constructor(props) {
        super(props);

        let user = localStorage.getItem('user');

        this.state = {
            data: user ? user : {},
            errors: {},
            redirectUrl: props.location.state ? props.location.state.redirectUrl : '/'
        };


        this.keyPress = this.keyPress.bind(this);
    }

    componentDidMount() {

        console.log(this.props.auth);

        if(this.props.auth.user) {
            this.setState({
                data: this.props.auth.user
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: this.props.auth.user
        });
    }

    keyPress(event) {

        if(event.key == 'Enter') {
            this.profile()
        }
    }

    profile() {

        if(!this.validate()) {
            return;
        }

        editProfile(this.state.data).then(response => {
            this.props.login(response.data);
            setUserToLocalStorage(response.data)
        });
    }

    render() {

        return (

            <div id='login'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>Edit profile</h1>


                        <ProfileForm onSubmit={ () => this.profile() } onChange={ this.changeData }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));