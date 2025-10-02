const statuses : { value: string, name: string }[] = [
    {value: "0", name: 'Active'},
    {value: "-1", name: 'Inactive'},
    // {value: "pending", name: 'Pending'},
    // {value: "banned", name: 'Banned'},
];

const availableGroups: { value: string, name: string }[] = [
    {value: "science", name: 'Science'},
    {value: "arts", name: 'Arts'},
    {value: "commerce", name: 'Commerce'},
];

const availableSegments: { value: number, name: string }[] = [
    {value: 1, name:"Primary"},
    {value: 2, name:"Secondary"},
    {value: 3, name:"Higher Secondary"},
    {value: 4, name:"Admission"},
    {value: 5, name:"Job Placement"},
    {value: 6, name:"Other"},
];



export const enums = {
    statuses,
    availableGroups,
    availableSegments
}