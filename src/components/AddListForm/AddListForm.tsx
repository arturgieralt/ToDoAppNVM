import * as React from "react";
import * as uuid from 'uuid';
import { List } from 'src/store/store.types';

interface IAddListFormState {
    list: List;
    isValid: boolean;
}

export class AddListForm extends React.Component<{}, IAddListFormState> {
    constructor (props: {}) {
        super(props);
        const id = uuid.v4();

        this.state = {
            list: {
                title: '',
                id,
                orderedTasks: []
            },
            isValid: false
        };
    }

    public render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange} name='title' placeholder='Your list title' value={this.state.list.title}/>
                <input type='button' value='Add' onClick={this.addList} disabled={!this.state.isValid} />
            </div>
            
        )
    } 
    
    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        const list = Object.assign({}, this.state.list, {
            [name]: value
        })
        this.setState({
            list
        });
    }
}
