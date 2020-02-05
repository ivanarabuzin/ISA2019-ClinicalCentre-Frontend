import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";

const UserDeclineForm = ({
    onSubmit,
    onChange,
    errors,
    data,
    keyPress
}) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">

        <TextField
            label='Message'
            error={ hasError(errors, 'message') }
            helperText={ getError(errors, 'message') }
            fullWidth
            autoFocus
            name='message'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.message }
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { 'Send' }
            </Button>
        </div>
    </form>
);

export default UserDeclineForm;