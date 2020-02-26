import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    open: any;
    cancel: any;
    okay: any;
}

interface State {
}

class DeleteVacation extends Component<Props, State> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    public render(): JSX.Element {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.cancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Vacation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.cancel} color="primary">
                        No
                    </Button>
                    <Button onClick={this.props.okay} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteVacation);
