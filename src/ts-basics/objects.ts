type Employee = {
    readonly id: number,
    name: string
    retire: (date: Date) => void;

}

let employee: Employee = {
    id: 1, 
    name: 'Lameck',
    retire: (date: Date) => {
        console.log(date);
    }
};
console.log(employee);
employee.retire(new Date());