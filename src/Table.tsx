import React from 'react';
import { Employee } from './types';

type Props = {
    employeeData: Employee[],
    removeEmployee(id: number): void,
    updateEmployee(id: number): void,
};

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Salary</th>
                <th>Age</th>
                <th>Remove</th>
                <th>Update</th>
            </tr>
        </thead>
    );
}

const TableBody = (props: Props) => {
    const rows = props.employeeData.map((employee, index) => {
        return (
            <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
                <td>{employee.age}</td>
                <td><button onClick={() => props.removeEmployee(employee.id)}>Delete</button></td>
                <td><button onClick={() => props.updateEmployee(employee.id)}>Update</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props: Props) => {
    const { employeeData, removeEmployee, updateEmployee } = props;
        return (
            <table className='table'>
                <TableHeader />
                <TableBody employeeData={employeeData} removeEmployee={removeEmployee} updateEmployee={updateEmployee} />
            </table>
        );
}

export default Table;
