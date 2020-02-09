import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import MenuState from "../constants/MenuState";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Drawer} from "@material-ui/core";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {

            submenu: {
                example: false
            }
        };
    }

    getNavigationClass() {

        if(this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    isCurrentPath(path) {

        return this.props.history.location.pathname == path;
    }

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    render() {

        return (
            <Drawer variant="permanent" id='navigation'>

                <div className={ this.getNavigationClass() }>
                    <div className='logo-container'>
                        <div className='title'>
                            <h2>Clinical Centre</h2>
                        </div>
                    </div>
                    
                    <List component="nav">
                        <Link to={'/'} className={ this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>
                                <ListItemText inset primary='Clinics' className='navigation-text'/>
                            </ListItem>
                        </Link>
                    </List>
                    {
                        this.props.auth.user && this.props.auth.user.role != 'ADMIN' &&
                        <React.Fragment>
                            <List component="nav">
                                <Link to={'/profile'} className={ this.isCurrentPath('/profile') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Profile' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/records'} className={ this.isCurrentPath('/records') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Records' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/surgeries'} className={ this.isCurrentPath('/surgeries') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Surgery' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/appointments'} className={ this.isCurrentPath('/appointments') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Appointments' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/appointments/history'} className={ this.isCurrentPath('/appointments/history') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Appointments History' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/rate/doctor'} className={ this.isCurrentPath('/rate/doctor') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Rate doctors' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/rate/clinic'} className={ this.isCurrentPath('/rate/clinic') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Rate clinics' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                        </React.Fragment>
                    }
                    
                    {
                        this.props.auth.user && this.props.auth.user.role == 'ADMIN' &&
                        <React.Fragment>
                            <List component="nav">
                                <Link to={'/unconfirmed-users'} className={ this.isCurrentPath('/unconfirmed-users') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Unconfirmed users' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            <List component="nav">
                                <Link to={'/appointments/uncofirmed'} className={ this.isCurrentPath('/appointments/uncofirmed') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Unconfirmed appointments' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List>
                            {/* <List component="nav">
                                <Link to={'/hall/termins'} className={ this.isCurrentPath('/hall/termins') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemText inset primary='Hall termins' className='navigation-text'/>
                                    </ListItem>
                                </Link>
                            </List> */}
                        </React.Fragment>
                    }
                    
                </div>
            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));