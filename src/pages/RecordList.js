import React from 'react'
import TablePage from "../common/TablePage";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../localization";
import {withSnackbar} from "notistack";
import { getRecords } from '../services/RecordService';

class RecordList extends TablePage {

    tableDescription = [
        { key: 'description', label: 'Description' },
        { key: 'dateCreated', label: strings.userList.dateCreated, transform: 'renderColumnDate' }
    ];

    constructor(props) {
        super(props);

        this.state.showActions = false;
        this.state.showAdd = false;
        this.state.showSearch = false;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getRecords({
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
        return ''
    }


    renderRowMenu(index, item) {

        let ariaOwns = 'action-menu-' + index;

        return ''
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordList)));