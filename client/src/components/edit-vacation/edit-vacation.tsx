import React, { Component, ChangeEvent } from 'react';
import { Vacation } from '../../models/vacation';
import { connect } from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import { EditVacationForm } from './edit-vacation-form';

interface Props {
    vacation: Vacation;
    open: any;
    cancel: any;
    save: any;
    onSubmit: any;
}

interface State {
}

class EditVacationComponent extends Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    public render(): JSX.Element {
        return (
            <Dialog
                className="edit-dialog"
                open={this.props.open}
                onClose={this.props.cancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <EditVacationForm
                    vacation={this.props.vacation}
                    onSubmit={(e) => this.props.onSubmit(e)}
                    onCancel={this.props.cancel}
                ></EditVacationForm>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const EditVacation = connect(mapStateToProps, mapDispatchToProps)(EditVacationComponent);
