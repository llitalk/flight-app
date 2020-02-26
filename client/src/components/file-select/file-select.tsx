import React, { Component } from 'react';
import { Button } from '@material-ui/core';

interface Props {
    onSelect: any;
}

interface State { }

export class FileSelect extends Component<Props, State> {

    fileSelector;

    componentDidMount() {
        this.fileSelector = this.buildFileSelector();
    }

    buildFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('accept', 'image/*');
        fileSelector.onchange = (e) => {
            this.props.onSelect(e);
        }
        return fileSelector;
    }

    handleFileSelect(e) {
        e.preventDefault();
        this.fileSelector.click();
    }

    public render(): JSX.Element {
        return (
            <Button variant="contained" color="primary" onClick={e => this.handleFileSelect(e)}>
                Select Picture
            </Button>
        )
    }
}
