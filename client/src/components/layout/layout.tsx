import React, { Component, useState } from 'react';
import clsx from 'clsx';
import './layout.css';
import logo from './logo.svg';
import { MdFlightTakeoff } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Login } from '../login-page/login/login';
import { Route, Switch, Router, Redirect, withRouter } from 'react-router';
import { Register } from '../register-page/register/register';
import { BrowserRouter, useHistory, Link } from 'react-router-dom';
import { Vacations } from '../vacations/vacations';
import { Reports } from '../reports/reports';
import { Admin } from '../admin/admin';
import LoginStatus from '../login-status/login-status';
import { Button, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NotFound from '../404/404';
import AuthenticatedRoute from '../authenticated-route/authenticated-route';

import { connect } from "react-redux";
import axios from 'axios';
import { RouteComponentProps } from "react-router";

type PathParamsType = {}

type PropsType = RouteComponentProps<PathParamsType> & {}

interface Props extends PropsType {
    history: any;
    loginSuccess: any;
    auth: any;
    logout: any;
}

interface State { }

class LayoutComponent extends Component<Props, State> {

    async componentWillMount() {

        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));

        if (user && token) {
            this.props.auth.loggedIn = true;
            this.props.auth.user = user;
            this.props.auth.token = token;
            axios.defaults.headers.common.authorization = `TOKEN ${token.token}`;
        }

        // its better to use interceptors here because order of function components execute. 
        const { history } = this.props;
        axios.interceptors.response.use(
            (reponse) => reponse,
            (errorReponse) => {
                if (errorReponse.response.status === 401) {
                    this.props.logout();
                    history.replace('/login');
                }
                throw errorReponse;
            });
    }

    public render(): JSX.Element {
        return (
            <div className="layout">
                <AppBar position="static">
                    <Toolbar className="appToolbar">
                        <Typography variant="h6" noWrap>
                            Next Trip<MdFlightTakeoff ></MdFlightTakeoff>
                        </Typography>
                        <div className="on-right">
                            <Link to='/reports'>
                                <Button className="white" color="inherit">Reports</Button>
                            </Link>
                            <Link to='/vacations'>
                                <Button className="white" color="inherit">Vacations</Button>
                            </Link>

                            {this.props.auth.user && !!this.props.auth.user.isAdmin && <Link to='/admin'>
                                <Button className="white" color="inherit">Admin</Button>
                            </Link>
                            }

                            <span className="login-user">
                                <LoginStatus></LoginStatus>
                            </span>
                        </div>
                    </Toolbar>
                </AppBar>

                <main>
                    <Switch>
                        <Route
                            path="/login"
                            component={Login}
                        />
                        <Route path="/register" component={Register} exact />
                        <AuthenticatedRoute
                            path="/vacations"
                            component={Vacations}
                            appProps={{ isAuthenticated: this.props.auth.loggedIn }}
                        />
                        <AuthenticatedRoute
                            path="/admin"
                            component={Admin}
                            appProps={{ isAuthenticated: this.props.auth.loggedIn && this.props.auth.user.isAdmin }}
                        />
                        <AuthenticatedRoute
                            path="/reports"
                            component={Reports}
                            appProps={{ isAuthenticated: this.props.auth.loggedIn && this.props.auth.user.isAdmin }}
                        />
                        <Redirect from="/" to="/vacations" exact />
                        <Route component={NotFound} />

                    </Switch>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
    loginSuccess: ({ user, token }) => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } }),
    logout: () => dispatch({ type: 'LOGOUT', payload: {} }),
});

export const Layout = connect(mapStateToProps, mapDispatchToProps)(withRouter(LayoutComponent));