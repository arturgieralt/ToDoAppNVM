import * as React from "react";
import * as uuid from 'uuid';
import { IAddTaskFormProps, IAddTaskFormState } from './AddTaskForm.types';

export class AddTaskForm extends React.Component<IAddTaskFormProps, IAddTaskFormState> {
    
    private initState: IAddTaskFormState = {
        task: {
            title: '',
            listId: '', 
            isDone: false,
            expiryDate: undefined,
            id: ''
        },
        isValid: false
    }

    constructor (props: IAddTaskFormProps) {
        super(props);
        const { listId } = this.props;

        this.state = {
            ...this.initState,
            task: {...this.initState.task, ...{listId}} 
        };
    }

    public render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange} name='title' placeholder='Your task title' value={this.state.task.title}/>
                <input type='datetime-local' onChange={this.onInputChange} name='expiryDate' value={this.state.task.expiryDate} />
                <input type='button' value='Add' onClick={this.addTask} disabled={!this.state.isValid} />
            </div>
            
        )
    } 
    
    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        const task = Object.assign({}, this.state.task, {
            [name]: value
        })
        this.setState({
            task,
            isValid: (task.title.length > 0 && task.listId.length > 0) ? true : false
        });
    }

    private addTask = (event: React.MouseEvent<HTMLInputElement>) => {
        
        if(this.state.isValid) {
            const taskWithId = Object.assign({}, this.state.task, {
                id: uuid.v4()
            });
            this.props.addTask(taskWithId);
            const { listId } = this.props;
            this.setState({
                ...this.initState,
                task: {...this.initState.task, ...{listId}} 
            });
        }
    }
}
