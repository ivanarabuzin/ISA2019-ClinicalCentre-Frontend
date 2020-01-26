import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";

const RegistrationForm = ({
    onSubmit,
    onChange,
    errors,
    data,
    keyPress
}) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">
        <TextField
            label='Email'
            error={ hasError(errors, 'email') }
            helperText={ getError(errors, 'email') }
            fullWidth
            autoFocus
            name='email'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.email }
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

        <TextField
            label='JBO'
            error={ hasError(errors, 'jbo') }
            helperText={ getError(errors, 'jbo') }
            fullWidth
            autoFocus
            name='jbo'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.jbo }
        />

        <TextField
            label='Password'
            error={ hasError(errors, 'password') }
            helperText={ getError(errors, 'password') }
            fullWidth
            name='password'
            type='password'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.password }
        />

        <TextField
            label='Password repeat'
            error={ hasError(errors, 'passwordRepeat') }
            helperText={ getError(errors, 'passwordRepeat') }
            fullWidth
            name='passwordRepeat'
            type='password'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.passwordRepeat }
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { 'Register' }
            </Button>
        </div>
    </form>
);

export default RegistrationForm;