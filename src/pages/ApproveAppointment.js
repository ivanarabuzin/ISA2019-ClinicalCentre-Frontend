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
import { getFreeDoctorTermins, approveAppointment } from '../services/AppointmentService';

class ApproveAppointment extends FormComponent {

    validationList = {
        selectedTermin: [ {type: Validators.REQUIRED } ],
        selectedHall: [ {type: Validators.REQUIRED } ]
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
        this.onTerminChange = this.onTerminChange.bind(this);
        this.onChangeHall = this.onChangeHall.bind(this);
    }

    componentDidMount() {

        getFreeDoctorTermins(this.props.appointment.clinic.id).then(response => {
            let termins = response.data.entities;
            termins.push(this.props.appointment.termin)

            for(let t of termins) {
                t.description = t.doctor.name + " " + t.doctor.surname + " " + t.date + " " + t.time;
            }


            this.setState({
                termins: termins,
                selectedTermin: this.props.appointment.termin
            }, () => {

                getFreeHallTermins(this.props.appointment.clinic.id).then(response => {
                    
                    let halls = response.data.entities;
                    let result = [];

                    for(let h of halls) {

                        h.name = h.hall.name;

                        if(h.date == this.state.selectedTermin.date && h.time == this.state.selectedTermin.time) {
                            result.push(h);
                        }
                    }
                    
                    this.setState({
                        halls: result,
                        selectedHall: result[0]
                    })
            
                });
            });
        });
    }

    onTerminChange(event) {

        this.setState({
            selectedTermin: event.target.value
        }, () => {
            getFreeHallTermins(this.props.appointment.clinic.id).then(response => {
                    
                let halls = response.data.entities;
                let result = [];

                for(let h of halls) {

                    h.name = h.hall.name;

                    if(h.date == this.state.selectedTermin.date && h.time == this.state.selectedTermin.time) {
                        result.push(h);
                    }
                }
                
                this.setState({
                    halls: result,
                    selectedHall: result[0]
                })
        
            });
        });
    }

    onChangeHall(event) {

        this.setState({
            selectedHall: event.target.value
        })
    }

    submit() {

        console.log('test');

        if(!this.state.selectedHall || !this.state.selectedTermin) {
            return;
        }

        this.showDrawerLoader();

        approveAppointment(this.props.appointment.id, this.state.selectedTermin.id, this.state.selectedHall.id).then(response => {

            console.log(response);

            if(!response.ok || !response.data) {
                this.props.onFinish(null);
                this.props.enqueueSnackbar("Error", { variant: 'error' });
                return;
            }

            this.props.onFinish(null);
            this.props.enqueueSnackbar("Success", { variant: 'success' });

        });
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
                                halls={this.state.halls} hall={this.state.selectedHall}
                                onChangeTermin={this.onTerminChange}
                                onChangeHall={this.onChangeHall}
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