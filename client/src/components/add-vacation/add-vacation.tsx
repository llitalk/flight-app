import React, { Component, ChangeEvent } from 'react';
import { Vacation } from '../../models/vacation';
import { connect } from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import { AddVacationForm } from './add-vacation-form';

interface Props {
    open: any;
    cancel: any;
    onSubmit: any;
}

interface State {
}

class AddVacationComponent extends Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    public render(): JSX.Element {
        return (
            <Dialog
                className="add-dialog"
                open={this.props.open}
                onClose={this.props.cancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <AddVacationForm
                    onSubmit={(e) => this.props.onSubmit(e)}
                    onCancel={() => this.props.cancel()}
                ></AddVacationForm>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const AddVacation = connect(mapStateToProps, mapDispatchToProps)(AddVacationComponent);
