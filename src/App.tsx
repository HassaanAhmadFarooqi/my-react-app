import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Employee } from './types';
import Form from './Form';
import Table from './Table';
import './App.css';

type Props = {};
type State = {
    error: any,
    successMessage: string,
    employees: Employee[],
    showUpdateForm: boolean,
    employeeToUpdate: Employee | null,
};

const initialState: State = {
    error: null,
    successMessage: '',
    employees: [],
    showUpdateForm: false,
    employeeToUpdate: null,
};

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleSubmit = (employee: Employee): void => {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('salary', employee.salary);
        formData.append('age', employee.age);

        fetch('http://dummy.restapiexample.com/api/v1/create', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(
                result =>
                    this.setState({
                        employees: [...this.state.employees, result.data],
                        successMessage: result.message,
                    }),
                error =>
                    this.setState({ error }),
            );
    }

    updateEmployee = (employeeId: number) => {
        const employeeToUpdate: Employee[] = this.state.employees.filter((employee) => employee.id === employeeId)
        this.setState({
            showUpdateForm: true,
            employeeToUpdate: employeeToUpdate ? employeeToUpdate[0] : null,
        });
    }

    handleUpdate = (employee: Employee): void => {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('salary', employee.salary);
        formData.append('age', employee.age);

        fetch(`http://dummy.restapiexample.com/api/v1/update/${employee.id}`, {
            method: 'PUT',
            body: formData,
        })
            .then(response => response.json())
            .then(
                result =>
                    this.setState({
                        employees: this.state.employees.map((stateEmployee: any) =>
                            stateEmployee.id === employee.id ? employee : stateEmployee
                        ),
                        showUpdateForm: false,
                        employeeToUpdate: null,
                        successMessage: result.message,
                    }),
                error =>
                    this.setState({ error }),
            );
    }

    removeEmployee = (employeeId: number) => {
        fetch(`http://dummy.restapiexample.com/api/v1/delete/${employeeId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(
                result =>
                    this.setState({
                        employees: this.state.employees.filter((employee) => employee.id !== parseInt(result.data)),
                        successMessage: result.message,
                    }),
                error =>
                    this.setState({ error }),
            );
    }

    componentDidMount() {
        fetch('http://dummy.restapiexample.com/api/v1/employees')
            .then(response => response.json())
            .then(
                result =>
                    this.setState({
                        employees: result.data.map((employee: any) => {
                            return {
                                id: parseInt(employee.id),
                                name: employee.employee_name,
                                salary: employee.employee_salary,
                                age: employee.employee_age,
                            };
                        })
                    }),
                error =>
                    this.setState({ error }),
            );
    }

    render() {
        const { employees, error, showUpdateForm, employeeToUpdate, successMessage } = this.state;

        if (error) {
            return (
                <div className='App'>
                    <div>Error: {error.message}</div>
                </div>
            );
        } else {
            return (
                <div className='App'>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h2>All Employees</h2>
                                <Table
                                    employeeData={employees}
                                    removeEmployee={this.removeEmployee}
                                    updateEmployee={this.updateEmployee}
                                />
                            </Col>
                            <Col>
                                <div>
                                    <h2>Add New Employee</h2>
                                    <Form handleSubmit={this.handleSubmit} employeeToUpdate={null}/>
                                </div>
                                <div>
                                    <h3>{successMessage}</h3>
                                </div>
                                <div className={showUpdateForm ? 'show-form' : 'hide-form'}>
                                    <h2>Update Employee Data</h2>
                                    <Form handleSubmit={this.handleUpdate} employeeToUpdate={employeeToUpdate}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    };
}

export default App;
