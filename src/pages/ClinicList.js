import React from 'react'
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import {ListItemIcon, ListItemText, Menu, MenuItem, TableCell, Grid, Paper, Drawer, Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePage from '../common/TablePage';
import { getClinics } from '../services/ClinicService';
import SelectControl from '../components/controls/SelectControl';
import DrawerWrapper from '../common/DrawerWrapper';
import PageState from '../constants/PageState';
import { getAppointmentTypes } from '../services/AppointmentService';
import DatePickerControl from '../components/controls/DatePickerControl';
import { stringToDate, dateTimeToString, dateToString } from '../util/DateUtil';
import TextField from '@material-ui/core/TextField';

class ClinicList extends TablePage {

    tableDescription = [
        { key: 'name', label: 'Name' },
        { key: 'address', label: 'Address' },
        { key: 'description', label: 'Description' },
        { key: 'city', label: 'City' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'averageRate', label: 'Rate' },
    ];

    constructor(props) {
        super(props);

        this.state.sort = {name: 'name asc', value: 'name,asc'}

        this.state.showAdd = false;
        this.state.types = [];
        this.state.selectedType = {};
        this.state.date = dateToString(new Date());
        this.state.city = null;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getClinics({
            page: this.state.searchData.page - 1,
            size: this.state.searchData.perPage,
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
        localStorage.removeItem('clinic');
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

    handleHallTermins(item) {

        this.props.history.push('/hall/termins?clinicId=' + item.id)

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
                        <MenuItem onClick={ () => this.handleHallTermins(item) }>
                            <ListItemText inset primary='Hall termins'/>
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
        });
    }

    search() {
        this.props.history.push('/clinics/termins?type=' + this.state.selectedType.id + '&date=' + this.state.date + '&city=' + this.state.city );
    }

    onChangeCity(event) {

        this.setState({
            city: event.target.value
        })

    }

    render() {

        return (
            <Grid id='table-page'>
                { this.renderDialog(strings.table.confirmDelete, 'To subscribe to this website, please enter your email address here. We will send\n' +
                    'updates occasionally.', this.cancelDelete, this.delete) }
                <div className='header'>
                    { this.getPageHeader() }

                    <div className='filter-controls'>

                        {
                            this.state.showSearch &&
                            
                            <React.Fragment>

                                
                                <div style={{ width: '400px;', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <TextField
                                        label='City'
                                        name='city'
                                        onChange={ (e) => this.onChangeCity(e) }
                                        margin="normal"
                                        value={ this.state.city }
                                    />

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

                                    <SelectControl
                                        label='Sort'
                                        style={{ width: '200px'}}
                                        options={[{name: 'name asc', value: 'name,asc'}, {name: 'city asc', value: 'city,asc'},
                                        {name: 'rate asc', value: 'averageRate,asc'},
                                        {name: 'name desc', value: 'name,desc'}, {name: 'city desc', value: 'city,desc'},
                                        {name: 'rate desc', value: 'averageRate,desc'} ]}
                                        nameKey={'name'}
                                        valueKey={'value'}
                                        selected={this.state.sort}
                                        onChange={(event) => this.onSortChange(event)}
                                    />
                                </div>
                                

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button  onClick={() => this.search()}>Search</Button>
                                </div>


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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicList)));