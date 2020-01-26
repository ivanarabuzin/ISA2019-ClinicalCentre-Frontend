import React from 'react'
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import {ListItemIcon, ListItemText, Menu, MenuItem, TableCell, Grid, Paper, Drawer} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePage from '../common/TablePage';
import { getClinics } from '../services/ClinicService';
import SelectControl from '../components/controls/SelectControl';
import DrawerWrapper from '../common/DrawerWrapper';
import PageState from '../constants/PageState';
import { getAppointmentTypes, getTermins } from '../services/AppointmentService';
import DatePickerControl from '../components/controls/DatePickerControl';
import { stringToDate, dateTimeToString, dateToString } from '../util/DateUtil';

class DoctorTermin extends TablePage {

    tableDescription = [
        { key: 'doctor', label: 'Doctor', transform: 'renderColumnDoctor' },
        { key: 'type', label: 'Type', transform: 'renderColumnType' },
        { key: 'doctor', label: 'Clinic', transform: 'renderColumnClinic' },
        { key: 'date', label: 'date', transform: 'renderColumnDate' }
    ];

    constructor(props) {
        super(props);

        this.state.sort = {name: 'name asc', value: 'name,asc'}

        this.state.showAdd = false;
        this.state.types = [];
        this.state.selectedType = {};
        this.state.date = undefined;
    }

    renderColumnType(item) {
        return item.name;
    }

    renderColumnDoctor(item) {
        return item.name + ' ' + item.surname;
    }

    renderColumnClinic(item) {
        return item.clinic.name;
    }

    fetchData() {

        let type = this.getSearchParam('type');
        let date = this.getSearchParam('date');

        this.setState({
            lockTable: true
        });

        getTermins(type, date).then(response => {
            
            if(!response.ok) {
                return;
            }

            console.log(response.data.entities);

            this.setState({
                tableData: response.data.entities,
                total: response.data.total,
                lockTable: false
            });
        });
    }

    componentDidMount() {
        this.fetchData();

        getAppointmentTypes().then(response => {
            
            this.setState({
                types: response.data.entities,
                selectedType: response.data.entities[0]
            });

        });
    }

    getPageHeader() {
        return <h1>Clinics</h1>;
    }

    renderAddContent() {
        return ''
    }

    handleClinicSelect(item) {
        
        localStorage.setItem('clinic', item);
    }

    renderRowMenu(index, item) {

        let ariaOwns = 'action-menu-' + index;

        return(
            <TableCell>
                <IconButton
                    aria-owns={ this.state.anchorEl ? ariaOwns : undefined }
                    aria-haspopup="true"
                    onClick={ (event) => this.handleMenuClick(event, ariaOwns) }
                >
                    <MoreVert/>
                </IconButton>
                {
                    ariaOwns === this.state.ariaOwns &&
                    <Menu
                        id={ ariaOwns }
                        anchorEl={ this.state.anchorEl }
                        open={ Boolean(this.state.anchorEl) }
                        onClose={ () => this.handleMenuClose() }
                    >
                        <MenuItem onClick={ () => this.handleClinicSelect(item) }>
                            <ListItemText inset primary='Select'/>
                        </MenuItem>
                    </Menu>
                }

            </TableCell>
        );
    }

    onTypeChange(event) {

        this.setState({
            selectedType: event.target.value
        }, () => {
            this.fetchData();
        });
    }

    onChangeDate(event) {
        

        this.setState({
            date: dateToString(event.target.value )
        }, () => {
            this.fetchData();

        });
    }

    render() {

        return (
            <Grid id='table-page'>
                { this.renderDialog(strings.table.confirmDelete, 'To subscribe to this website, please enter your email address here. We will send\n' +
                    'updates occasionally.', this.cancelDelete, this.delete) }
                <div className='header'>
                    { this.getPageHeader() }

                    <div className='filter-controls' style={{ width: '400px;', display: 'flex'}}>

                        {
                            this.state.showSearch &&
                            
                            <React.Fragment>

                                <DatePickerControl
                                    label='Date'
                                    name='Date'
                                    selected={this.state.date}
                                    placeholder={this.state.date}
                                    onChange={(date) => this.onChangeDate(date)}
                                />


                                <SelectControl
                                    label='Type'
                                    style={{ width: '200px'}}
                                    options={this.state.types}
                                    nameKey={'name'}
                                    valueKey={'id'}
                                    selected={this.state.selectedType}
                                    onChange={(event) => this.onTypeChange(event)}
                                />

                            </React.Fragment>
                            
                        }

                        {
                            this.state.showAdd &&
                            this.renderTableControls()
                        }
                    </div>
                </div>
                <Paper md={12}>
                    { this.renderTable(this.state.tableData) }
                </Paper>

                <Drawer id='drawer' anchor='right' open={  this.showDrawer() } onClose={ () => this.setPageState(PageState.View) } >
                    <DrawerWrapper onBack={ () => this.setPageState(PageState.View) }>
                        { this.renderDrawerContent() }
                    </DrawerWrapper>
                </Drawer>
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

function mapStateToProps({ menuReducers })
{
    return { menu: menuReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorTermin)));