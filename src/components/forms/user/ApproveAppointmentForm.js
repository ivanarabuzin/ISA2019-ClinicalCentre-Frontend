import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";
import SelectControl from '../../controls/SelectControl';

const ApproveAppointmentForm = ({
    onSubmit,
    onChange,
    errors,
    data,
    onChangeTermin,
    onChangeHall,
    termins,
    halls,
    hall,
    termin
}) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">

        <SelectControl
            label='Termin'
            style={{ width: '200px' }}
            options={termins}
            nameKey={'description'}
            valueKey={'id'}
            selected={termin}
            onChange={(event) => this.onChangeTermin(event)}
        />

        <SelectControl
            label='Hall'
            style={{ width: '200px' }}
            options={[]}
            nameKey={'name'}
            valueKey={'id'}
            selected={hall}
            onChange={(event) => this.onChangeHall(event)}
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { 'Approve' }
            </Button>
        </div>
    </form>
);

export default ApproveAppointmentForm;