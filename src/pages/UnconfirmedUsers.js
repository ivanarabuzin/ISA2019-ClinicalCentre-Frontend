
import React from 'react'
import TablePage from "../common/TablePage";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import { getSurgeries } from '../services/SurgeryService';
import { getUnconfrimedUsers, confirmeUser } from '../services/UserService';
import { TableCell, ListItemText, Menu, MenuItem } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';
import PageState from '../constants/PageState';
import DeclineUser from './DeclineUser';

class UnconfirmedUsers extends TablePage {

    tableDescription = [
        { key: 'email', label: 'Email' },
        { key: 'name', label: 'Name' },
        { key: 'surname', label: 'Surname' },
    ];

    constructor(props) {
        super(props);

        this.state.declineUser = {};

    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getUnconfrimedUsers({
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
        return <h1>Unconfirmed users</h1>;
    }

    renderAddContent() {
        return <DeclineUser id={this.state.declineUser.id} onCancel={ this.onCancel } onFinish={ this.onFinish }/>
    }

    handleConfirm(item) {

        confirmeUser(item.id).then(response => {

            this.fetchData();

        });
    }

    handleDecline(item) {

        this.setState({
            declineUser: item
        });

        this.setPageState(PageState.Add)

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
                        <MenuItem onClick={ () => this.handleConfirm(item) }>
                            <ListItemText inset primary='Confirm'/>
                        </MenuItem>
                        <MenuItem onClick={ () => this.handleDecline(item) }>
                            <ListItemText inset primary='Decline'/>
                        </MenuItem>
                    </Menu>
                }

            </TableCell>
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(UnconfirmedUsers)));