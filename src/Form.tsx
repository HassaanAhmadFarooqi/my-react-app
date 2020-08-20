import React, {Component} from 'react';
import { Employee } from './types';

type Props = {
    handleSubmit(employee: Employee): void,
    employeeToUpdate: Employee | null,
};
type State = Employee;

const initialState: State = {
    id: NaN,
    name: '',
    salary: '',
    age: '',
};

class Form extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'name':
                this.setState({ name: event.target.value });
                break;
            case 'salary':
                this.setState({ salary: event.target.value });
                break;
            case 'age':
                this.setState({ age: event.target.value });
                break;
        }
    }

    onFormSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState(initialState);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (this.props.employeeToUpdate && this.props.employeeToUpdate !== prevProps.employeeToUpdate) {
            this.setState(this.props.employeeToUpdate);
        }
    }

    render() {
        const { name, salary, age } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='salary'>Salary</label>
                    <input
                        type='text'
                        name='salary'
                        id='salary'
                        value={salary}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='text'
                        name='age'
                        id='age'
                        value={age}
                        onChange={this.handleChange}
                    />
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>
        );
    };
}

export default Form;
