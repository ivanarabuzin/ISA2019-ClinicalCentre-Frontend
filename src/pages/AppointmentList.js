import React from 'react'
import TablePage from "../common/TablePage";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import { getSurgeries } from '../services/SurgeryService';
import SelectControl from '../components/controls/SelectControl';
import DrawerWrapper from '../common/DrawerWrapper';
import PageState from '../constants/PageState';
import {ListItemIcon, ListItemText, Menu, MenuItem, TableCell, Grid, Paper, Drawer} from "@material-ui/core";
import { getAppointments, acceptAppointment, rejectAppointment } from '../services/AppointmentService';
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';


class AppointmentList extends TablePage {

    tableDescription = [
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
        { key: 'type', label: 'Type', transform: 'renderColumnType' },
        { key: 'hall', label: 'Hall', transform: 'renderColumnHall' },
        { key: 'doctor', label: 'Doctor', transform: 'renderColumnDoctor' },
        { key: 'clinic', label: 'Clinic', transform: 'renderColumnClinic' },
        { key: 'date', label: strings.userList.dateCreated, transform: 'renderColumnDate' }
    ];

    constructor(props) {
        super(props);

        this.state.showActions = true;

        this.state.sort = {name: 'description asc', value: 'description,asc'}

        this.state.showAdd = false;

        console.log('test');
    }

    renderColumnHall(item) {
        return item.name;
    }

    renderColumnClinic(item) {
        return item.name;
    }

    renderColumnDoctor(item) {
        return item.name + ' ' + item.surname;
    }

    renderColumnType(item) {
        return item.name;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getAppointments({
            page: this.state.searchData.page - 1,
            perPage: this.state.searchData.perPage,
            term: this.state.searchData.search.toLowerCase(),
            sort: this.state.sort.value
        }).then(response => {

            if(!response.ok) {
                return;
            }

            this.setState({
                tableData: response.data.entities,
                total: response.data.total,
                lockTable: false
            });
        });
    }

    componentDidMount() {

       
        this.fetchData();
    }

    getPageHeader() {
        return <h1>Surgeries</h1>;
    }

    renderAddContent() {
        return ''
    }

    handleAccept(item) {

        acceptAppointment(item.id).then(response => {
            
            this.fetchData();
        });
    }

    handleReject(item) {

        rejectAppointment(item.id).then(response => {

            this.fetchData();
        });
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
                        <MenuItem onClick={ () => this.handleAccept(item) }>
                            <ListItemText inset primary='Accept'/>
                        </MenuItem>
                        <MenuItem onClick={ () => this.handleReject(item) }>
                            <ListItemText inset primary='Reject'/>
                        </MenuItem>
                    </Menu>
                }

            </TableCell>
        );
    }

    onSortChange(event) {

        this.setState({
            sort: event.target.value
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

                    <div className='filter-controls' style={{ width: '200px'}}>

                        {
                            this.state.showSearch &&
                            <SelectControl
                            label='Sort'
                            style={{ width: '200px'}}
                            options={[{name: 'description asc', value: 'description,asc'}, {name: 'dateCreated asc', value: 'dateCreated,asc'},
                            {name: 'type asc', value: 'type,asc'},
                            {name: 'description desc', value: 'description,desc'}, {name: 'dateCreated desc', value: 'dateCreated,desc'},
                            {name: 'type desc', value: 'type,desc'} ]}
                            nameKey={'name'}
                            valueKey={'value'}
                            selected={this.state.sort}
                            onChange={(event) => this.onSortChange(event)}
                            />
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AppointmentList)));