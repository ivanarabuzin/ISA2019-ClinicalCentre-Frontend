import React from 'react'
import TablePage from "../common/TablePage";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import { getRateClinics } from '../services/ClinicService';
import {ListItemIcon, ListItemText, Menu, MenuItem, TableCell, Grid, Paper, Drawer} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';
import RateClinicPage from './RateClinicPage';
import PageState from '../constants/PageState';

class RateClinic extends TablePage {

    tableDescription = [
        { key: 'name', label: 'Name' },
        { key: 'averageRate', label: 'Rate' },
    ];

    constructor(props) {
        super(props);

        this.state.showActions = true;
        this.state.showAdd = false;
        this.state.showSearch = false;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getRateClinics({
            page: this.state.searchData.page - 1,
            perPage: this.state.searchData.perPage,
            term: this.state.searchData.search.toLowerCase()
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
        return <h1>Records</h1>;
    }

    renderAddContent() {
        return <RateClinicPage onCancel={ this.onCancel } onFinish={ this.onFinish } clinic={ this.state.clinic }/>
    }

    handleRate(item) {

        this.state.clinic = item;

        this.setState({
            pageState: PageState.Add
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
                        <MenuItem onClick={ () => this.handleRate(item) }>
                            <ListItemText inset primary='Rate'/>
                        </MenuItem>
                    </Menu>
                }

            </TableCell>
        )
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(RateClinic)));