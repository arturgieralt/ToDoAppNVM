import * as React from "react";
import * as uuid from 'uuid';
import * as Datetime  from 'react-datetime';
import { IAddTaskFormProps, IAddTaskFormState } from './AddTaskForm.types';
import './AddTask.css';
import { Moment } from 'moment';
export class AddTaskForm extends React.Component<IAddTaskFormProps, IAddTaskFormState> {
    
    public initState: IAddTaskFormState = {
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

    public guidProvider (): string {
        return uuid.v4();
    }
        
    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        const task = Object.assign({}, this.state.task, {
            [name]: value
        })
        this.setState({
            task,
            isValid: (task.title.length > 0 && task.listId.length > 0) ? true : false
        });
    }

    public changeDate = (date: Moment | string) => {
        if(typeof date !== "string") {
            this.setState({
                task: Object.assign({}, this.state.task, {
                    expiryDate: (date as Moment)
                })
            });
        }
        
    }

    public addTask = (event: React.MouseEvent<HTMLInputElement>) => {
        
        if(this.state.isValid) {
            const taskWithId = Object.assign({}, this.state.task, {
                id: this.guidProvider()
            });
            this.props.addTask(taskWithId);
            const { listId } = this.props;
            this.setState({
                ...this.initState,
                task: {...this.initState.task, ...{listId}} 
            });
        }
    }
    
    public render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange} name='title' placeholder='Your task title' value={this.state.task.title}/>
                <Datetime onChange={this.changeDate} value={this.state.task.expiryDate} inputProps={{placeholder: 'Choose date'}}/> 
                <input type='button' value='Add' onClick={this.addTask} disabled={!this.state.isValid} />
            </div>
        );
    } 
}
