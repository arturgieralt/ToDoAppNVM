import * as React from "react";
import * as uuid from 'uuid';
import { IAddTaskFormProps, IAddTaskFormState } from './AddTaskForm.types';

export class AddTaskForm extends React.Component<IAddTaskFormProps, IAddTaskFormState> {
    constructor (props: IAddTaskFormProps) {
        super(props);
        const { listId } = this.props;
        const id = uuid.v4();

        this.state = {
            task: {
                title: '',
                listId, 
                isDone: false,
                expiryDate: undefined,
                id
            },
            isValid: false
        };
    }

    public render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange} name='title' placeholder='Your task title' value={this.state.task.title}/>
                <input type='datetime-local' onChange={this.onInputChange} name='expiryDate' value={this.state.task.expiryDate} />
                <input type='button' value='Add' onClick={this.props.addTask} disabled={!this.state.isValid} />
            </div>
            
        )
    } 
    
    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        const task = Object.assign({}, this.state.task, {
            [name]: value
        })
        this.setState({
            task
        });
    }
}
