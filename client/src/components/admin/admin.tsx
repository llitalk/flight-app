import React, { Component } from 'react';
import { connect } from "react-redux";
import './admin.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { VacationComponent } from '../vacation/vacation';

import { Vacation } from '../../models/vacation';
import { EditVacation } from '../edit-vacation/edit-vacation';
import { AddVacation } from '../add-vacation/add-vacation';
import DeleteVacation from '../delete-vacation/delete-vacation';

import axios from 'axios';
import to from 'await-to-js';
import moment from 'moment';

interface Props {
    auth: any;
}

interface State {
    vacations: Vacation[];
    editDialogOpen: boolean;
    addDialogOpen: boolean;
    deleteDialogOpen: boolean;

    editCurrentVacation: Vacation;
    deleteCurrentVacation: Vacation;
}

class AdminComponent extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = { addDialogOpen: false, editDialogOpen: false, deleteDialogOpen: false, editCurrentVacation: null, deleteCurrentVacation: null, vacations: null };
    }

    async componentDidMount() {
        const [error, response] = await to(axios({
            url: `/api/vacation`,
            method: 'get'
        }));

        if (error) {
            return;
        }

        let { vacations } = response.data;

        this.setState({ ...this.state, vacations });
    }

    onDelete(vacation) {
        this.setState({
            ...this.state,
            deleteCurrentVacation: vacation,
            deleteDialogOpen: true
        });
    }

    onEdit(vacation) {
        this.setState({
            ...this.state,
            editCurrentVacation: JSON.parse(JSON.stringify(vacation)),
            editDialogOpen: true
        });
    }

    onAddNewVacation() {
        this.setState({
            ...this.state,
            editCurrentVacation: {} as Vacation,
            addDialogOpen: true
        });
    }

    async deleteVacation() {
        const id = this.state.deleteCurrentVacation.id;

        const [error, response] = await to(axios({
            url: `/api/vacation`,
            method: 'delete',
            data: { id }
        }));

        this.setState({ ...this.state, deleteDialogOpen: false, deleteCurrentVacation: null, vacations: this.state.vacations.filter(v => v.id !== id) })
    }

    closeEditDialog() {
        this.setState({ ...this.state, editDialogOpen: false });
    }

    closeAddDialog() {
        this.setState({ ...this.state, addDialogOpen: false });
    }

    closeDeleteDialog() {
        this.setState({ ...this.state, deleteDialogOpen: false });
    }

    async saveVacation(form) {
        const { file, ...vacation } = form;

        vacation.startDate = moment(vacation.startDate).format('YYYY-MM-DD');
        vacation.endDate = moment(vacation.endDate).format('YYYY-MM-DD');

        var formData = new FormData();
        formData.append("file", file);
        formData.append("vacation", JSON.stringify(vacation));

        const [error, response] = await to(axios.put('/api/vacation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));

        if (error) {
            return;
        }

        const vacations = this.state.vacations.map(v => v.id === response.data.vacation.id ? response.data.vacation : v);

        this.setState({ ...this.state, editDialogOpen: false, vacations });
    }

    async addVacation(form) {
        const { file, ...vacation } = form;

        vacation.startDate = moment(vacation.startDate).format('YYYY-MM-DD');
        vacation.endDate = moment(vacation.endDate).format('YYYY-MM-DD');

        var formData = new FormData();
        formData.append("file", file);
        formData.append("vacation", JSON.stringify(vacation));

        const [error, response] = await to(axios.post('/api/vacation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));

        if (error) {
            return;
        }

        this.setState({
            ...this.state,
            addDialogOpen: false,
            vacations: [...this.state.vacations, response.data.vacation]
        });
    }

    public render(): JSX.Element {
        return (
            <div className="admin">

                <h3 className="vacations-title">All Vacations:</h3>

                <Fab className="add-vacation-button" color="primary" aria-label="add" onClick={() => this.onAddNewVacation()}>
                    <AddIcon />
                </Fab>

                <div className="vacations-container">
                    {
                        this.state && this.state.vacations && this.state.vacations.map(vacation => {
                            return <VacationComponent key={vacation.id}
                                onDelete={(e) => this.onDelete(e)}
                                onEdit={(e) => this.onEdit(e)}
                                vacation={vacation}></VacationComponent>
                        })
                    }
                    {
                        this.state && this.state.vacations && this.state.vacations.length === 0 && (
                            <div className="no-results">No data to display</div>
                        )
                    }
                </div>

                <AddVacation
                    open={this.state.addDialogOpen}
                    cancel={() => this.closeAddDialog()}
                    onSubmit={e => this.addVacation(e)}
                ></AddVacation>

                <EditVacation
                    vacation={this.state.editCurrentVacation}
                    open={this.state.editDialogOpen}
                    cancel={() => this.closeEditDialog()}
                    onSubmit={e => this.saveVacation(e)}
                ></EditVacation>

                <DeleteVacation
                    open={this.state.deleteDialogOpen}
                    cancel={() => this.closeDeleteDialog()}
                    okay={() => this.deleteVacation()}
                ></DeleteVacation>

            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({});

export const Admin = connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
