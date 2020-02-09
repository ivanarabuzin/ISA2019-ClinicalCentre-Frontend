import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";
import SelectControl from '../../controls/SelectControl';

const RataForm = ({
    onSubmit,
    onChange,
    errors,
    data
}) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">

        <SelectControl
            label='Rate'
            style={{ width: '200px' }}
            options={[ {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, ]}
            nameKey={'value'}
            valueKey={'value'}
            selected={data.rate}
            name="rate"
            onChange={(event) => onChange(event)}
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { 'Rate' }
            </Button>
        </div>
    </form>
);

export default RataForm;