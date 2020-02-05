import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";

const ProfileForm = ({
    onSubmit,
    onChange,
    errors,
    data,
    keyPress,
    hasChanges
}) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">

        <TextField
            label='Email'
            fullWidth
            autoFocus
            name='email'
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.email }
            disabled={true}
        />

        <TextField
            label='JBO'
            fullWidth
            autoFocus
            name='jbo'
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.jbo }
            disabled={true}
        />

        <TextField
            label='Name'
            error={ hasError(errors, 'name') }
            helperText={ getError(errors, 'name') }
            fullWidth
            autoFocus
            name='name'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.name }
        />

        <TextField
            label='Surname'
            error={ hasError(errors, 'surname') }
            helperText={ getError(errors, 'surname') }
            fullWidth
            autoFocus
            name='surname'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.surname }
        />

        <TextField
            label='Address'
            error={ hasError(errors, 'address') }
            helperText={ getError(errors, 'address') }
            fullWidth
            autoFocus
            name='address'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.address }
        />

        <TextField
            label='City'
            error={ hasError(errors, 'city') }
            helperText={ getError(errors, 'city') }
            fullWidth
            autoFocus
            name='city'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.city }
        />

        <TextField
            label='Country'
            error={ hasError(errors, 'country') }
            helperText={ getError(errors, 'country') }
            fullWidth
            autoFocus
            name='country'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.country }
        />

        <TextField
            label='Phone number'
            error={ hasError(errors, 'phoneNumber') }
            helperText={ getError(errors, 'phoneNumber') }
            fullWidth
            autoFocus
            name='phoneNumber'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.phoneNumber }
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit } disabled={!hasChanges}>
                { 'Edit profile' }
            </Button>
        </div>
    </form>
);

export default ProfileForm;