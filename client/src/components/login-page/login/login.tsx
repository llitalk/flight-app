import React, { Component, ChangeEvent } from 'react';
import './login.css';
import { LoginForm } from '../login-form/login-form';
import axios from 'axios';
import qs from 'qs';
import { connect } from "react-redux";
import to from 'await-to-js';

interface Props {
    loginSuccess: any;
    history: any;
}

interface State {
    error: string;
}

class LoginComponent extends Component<Props, State>{
    async onSubmit(form) {
        const [error, repsonse] = await to(axios({
            url: "/api/login",
            method: "POST",
            data: qs.stringify(form)
        }));

        if (error) {
            return this.onLoginFailed(error);
        }

        const { user, token } = repsonse.data;

        this.props.loginSuccess({ user, token });

        this.props.history.push('/vacations');
    }

    onLoginFailed(error) {
        const messages = {
            USER_NOT_FOUND: 'Invalid user or password',
            PASSWORD_INVALID: 'Invalid user or password',
            DEFAULT: 'An unknown error occurred. Please try again'
        }

        const errorMessage = messages[error.response.data.error] || messages.DEFAULT;

        this.setState({ ...this.state, error: errorMessage });

        setTimeout(() => {
            this.setState({ ...this.state, error: null });
        }, 2000);
    }

    public render(): JSX.Element {
        return (
            <div className="login-page">
                <LoginForm onSubmit={(e) => this.onSubmit(e)}></LoginForm>
                <div>
                    {this.state && this.state.error && <div className="error-message text-center">{this.state.error}</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
    loginSuccess: ({ user, token }) => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } }),
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);    