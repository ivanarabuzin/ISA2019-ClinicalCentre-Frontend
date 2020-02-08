import React from 'react'
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import strings from "../localization";
import Validators from "../constants/ValidatorTypes";
import FormComponent from "../common/FormComponent";
import UserForm from "../components/forms/admin/user/UserForm";
import {addUser} from "../services/admin/UserAdminService";
import {withSnackbar} from "notistack";
import { declineUser } from '../services/UserService';
import UserDeclineForm from '../components/forms/user/UserDeclineForm';
import ApproveAppointmentForm from '../components/forms/user/ApproveAppointmentForm';
import { getFreeHallTermins } from '../services/HallTerminService';
import { getFreeDoctorTermins } from '../services/AppointmentService';

class ApproveAppointment extends FormComponent {

    validationList = {
        termin: [ {type: Validators.REQUIRED } ],
        hall: [ {type: Validators.REQUIRED } ]
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.data ? props.data : {},
            errors: {},
            termins: [],
            selectedTermin: null,
            halls: [],
            selectedHall: null
        };

        this.props.changeFullScreen(false);

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {

        getFreeHallTermins(this.props.appointment.clinic.id).then(response => {

            
        });

        getFreeDoctorTermins(this.props.appointment.clinic.id).then(response => {
            let termins = response.data.entities;
            termins.push(this.props.appointment.termin)

            console.log(this.props.appointment.termin);

            for(let t of termins) {
                t.description = t.doctor.name + " " + t.doctor.surname + " " + t.date + " " + t.time;
            }


            this.setState({
                termins: termins,
                selectedTermin: this.props.appointment.termin
            });
        });
    }

    submit() {

        if(!this.validate()) {
            return;
        }

        this.showDrawerLoader();

        // declineUser(this.props.id, this.state.data.message).then(response => {

        //     if(!response.ok) {
        //         this.props.onFinish(null);
        //         this.props.enqueueSnackbar('Error decline user', { variant: 'error' });
        //         return;
        //     }

        //     this.props.enqueueSnackbar('User declined', { variant: 'error' });
        //     this.props.onFinish(response.data.user);

        //     this.hideDrawerLoader();
        // });
    }

    render() {

        return (
            <Grid id='page' item md={ 12 }>

                <div className='header'>
                    <h1>Approve Appointment</h1>
                </div>

                <Paper className='paper'>
                    <ApproveAppointmentForm onChange={ this.changeData } onSubmit={ this.submit }
                                termins={this.state.termins} termin={this.state.selectedTermin}
                                data={ this.state.data } errors={ this.state.errors } onCancel={ this.props.onCancel }/>
                </Paper>

            </Grid>

        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, siteDataReducers })
{
    return { menu: menuReducers, siteData: siteDataReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ApproveAppointment)));