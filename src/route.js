import React from 'react';
import Home from './pages/Home';
import Error from "./pages/Error";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

import { Route } from 'react-router-dom';
import { isUserLoggedIn } from "./base/OAuth";
import Login from "./pages/user/Login";
import Lock from "./pages/user/Lock";
import UserList from "./pages/admin/users/UserList";
import ClinicList from './pages/ClinicList';
import RecordList from './pages/RecordList';
import Registration from './pages/user/Registration';
import UserConfirmation from './pages/user/UserConfirmation';
import Profile from './pages/user/Profile';
import SurgeryList from './pages/SurgeryList';
import UnconfirmedUsers from './pages/UnconfirmedUsers';
import AppointmentList from './pages/AppointmentList';
import DoctorTermin from './pages/DoctorTermin';
import TerminClinicList from './pages/TerminClinicList';
import HallTermin from './pages/HallTermin';
import UnconfirmedAppointments from './pages/UnconfirmedAppointments';
import AppointmentListHistory from './pages/AppointmentListHistory';
import RateDoctor from './pages/RateDoctor';
import RateClinic from './pages/RateClinic';

let ROUTES = {
    // Home: {
    //     path: '/',
    //     component: <Home/>,
    //     auth: true
    // },
    Error: {
        path: '/error',
        component: <Error/>,
        auth: false
    },
    Forbidden: {
        path: '/forbidden',
        component: <Forbidden/>,
        auth: false
    },
    NotFound: {
        path: '/not-found',
        component: <NotFound/>,
        auth: false
    },
    Login: {
        path: '/login',
        component: <Login/>,
        auth: false
    },
    Register: {
        path: '/register',
        component: <Registration/>,
        auth: false
    },
    UserConfirmation: {
        path: '/userConfirmation',
        component: <UserConfirmation/>,
        auth: false
    },
    Lock: {
        path: '/lock',
        component: <Lock/>,
        auth: false
    },
    UserList: {
        path: '/users',
        component: <UserList showFilter={ false }/>,
        auth: true
    },
    EditProfile: {
        path: '/profile',
        component: <Profile/>,
        auth: true
    },
    ClinicList: {
        path: '/',
        component: <ClinicList showFilter={ false }/>,
        auth: true
    },
    RecordList: {
        path: '/records',
        component: <RecordList showFilter={ false }/>,
        auth: true
    },
    SurgeryList: {
        path: '/surgeries',
        component: <SurgeryList showFilter={ false }/>,
        auth: true
    },
    UnconfirmedUsers: {
        path: '/unconfirmed-users',
        component: <UnconfirmedUsers showFilter={ false }/>,
        auth: true
    }, 
    AppointmentList: {
        path: '/appointments',
        component: <AppointmentList showFilter={ false }/>,
        auth: true
    },
    AppointmentListHistory: {
        path: '/appointments/history',
        component: <AppointmentListHistory showFilter={ false }/>,
        auth: true
    },
    DoctorTerminList: {
        path: '/termins',
        component: <DoctorTermin showFilter={ false }/>,
        auth: true
    },
    ClinicTerminList: {
        path: '/clinics/termins',
        component: <TerminClinicList showFilter={ false }/>,
        auth: true
    },
    HallTermins: {
        path: '/hall/termins',
        component: <HallTermin showFilter={ false }/>,
        auth: true
    },
    UnconfirmedAppointments: {
        path: '/appointments/uncofirmed',
        component: <UnconfirmedAppointments showFilter={ false }/>,
        auth: true
    },
    RateDoctor: {
        path: '/rate/doctor',
        component: <RateDoctor showFilter={ false }/>,
        auth: true
    },
    RateClinic: {
        path: '/rate/clinic',
        component: <RateClinic showFilter={ false }/>,
        auth: true
    }
};

export default ROUTES;

function getRoute(path) {

    for(const [key, value] of Object.entries(ROUTES)) {

        if(value.path === path) {
            return value;
        }
    }

    return null;
}

export function checkPath(path) {

    let pathObject = getRoute(path);

    if(!pathObject) {
        return true;
    }

    if(pathObject.auth) {
        return !isUserLoggedIn();
    }

    return false;
}

export function getRoutes() {

    let result = [];

    for(const [key, value] of Object.entries(ROUTES)) {

        result.push(
            <Route key={ 'route-' + result.length } exact path={ value.path } render={() => (
                value.component
            )}/>
        )
    }

    return result;
}