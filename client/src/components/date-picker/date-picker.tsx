import React, { Component, ChangeEvent } from 'react';

import { KeyboardDatePicker } from '@material-ui/pickers';

export function DatePicker({ inputRef, minDate, name, label, updateValue = null }) {

    const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

    const handleSelectedDateChange = date => {
        setSelectedDate(date);
        updateValue && updateValue(date);
    };

    return (
        <KeyboardDatePicker
            fullWidth
            style={{ marginTop: 20 }}
            inputRef={inputRef}
            disableToolbar
            minDate={minDate}
            format="DD/MM/YYYY"
            margin="normal"
            label={label}
            name={name}
            value={selectedDate}
            onChange={handleSelectedDateChange}
        />
    )
}
