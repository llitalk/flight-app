import React, { Component, ChangeEvent } from 'react';
import './add-vacation-form.css';

import * as yup from 'yup';
import useForm from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { DatePicker } from '../date-picker/date-picker';
import { FileSelect } from '../file-select/file-select';

const AddVacationSchema = yup.object().shape({
    description: yup.string().required().min(4),
    price: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    target: yup.string().required().min(4),
    picture: yup.string().required()
});

export function AddVacationForm(props) {

    let selectedFile = null;

    const defaultValues = {
        startDate: moment().format('DD/MM/YYYY'),
        endDate: moment().format('DD/MM/YYYY')
    }

    const { register, handleSubmit, errors, setValue } = useForm({ defaultValues, validationSchema: AddVacationSchema });
    const onSubmit = data => { props.onSubmit({ ...data, file: selectedFile }); }

    const fileSelect = (e) => {
        const file = e.target.files[0];
        setValue('picture', file.name, true);
        selectedFile = file;
    }

    const [minDate, setMinDate] = React.useState(new Date(Date.now()));
    const onValueChange = (date) => {
        setMinDate(date.toDate());
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-header">
                        <AddIcon />
                        <h2>Add new vacation</h2>
                    </div>

                    <TextField name="target" label="target" fullWidth style={{ marginTop: 20 }} inputRef={register} />
                    <span className="error-message">
                        {errors.target && errors.target.type === "required" && "target is required"}
                        {errors.target && errors.target.type === "min" && "target required to be more than 4 characters"}
                    </span>

                    <TextField name="description" label="description" fullWidth style={{ marginTop: 20 }} inputRef={register} />
                    <span className="error-message">
                        {errors.description && errors.description.type === "required" && "description is required"}
                        {errors.description && errors.description.type === "min" && "description required to be more than 4 characters"}
                    </span>

                    <TextField name="price" label="price" fullWidth style={{ marginTop: 20 }} inputRef={register} />
                    <span className="error-message">
                        {errors.price && errors.price.type === "required" && "price is required"}
                    </span>

                    <DatePicker
                        minDate={moment().subtract(1)}
                        name="startDate"
                        inputRef={register}
                        label="Start Date"
                        updateValue={onValueChange}
                    ></DatePicker>
                    <span className="error-message">
                        {errors.startDate && errors.startDate.type === "required" && "Start date is required"}
                    </span>

                    <DatePicker
                        minDate={minDate}
                        name="endDate"
                        inputRef={register}
                        label="End Date"
                    ></DatePicker>
                    <span className="error-message">
                        {errors.endDate && errors.endDate.type === "required" && "End date is required"}
                    </span>

                    <div className="upload-wrapper">
                        <FileSelect onSelect={fileSelect}></FileSelect>

                        <TextField
                            name="picture"
                            placeholder="your picture..."
                            style={{ marginTop: 20 }} inputRef={register}
                            InputProps={{
                                disabled: true,
                                readOnly: true,
                            }}
                        />
                    </div>
                    <span className="error-message">
                        {errors.picture && errors.picture.type === "required" && "Picture is required"}
                    </span>

                    <div className="form-footer">
                        <Button size="small" color="primary" type="submit">
                            Add
                        </Button>
                        <Button size="small" color="primary" type="button" onClick={() => props.onCancel()}>
                            Cancel
                    </Button>
                    </div>
                </form>
            </div>
        </MuiPickersUtilsProvider>
    )
}