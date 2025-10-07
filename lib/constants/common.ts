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
    {value: 2, name:"Junior"},
    {value: 3, name:"Secondary"},
    {value: 4, name:"Higher Secondary"},
    {value: 5, name:"Admission"},
    {value: 6, name:"Job Placement"},
    {value: 7, name:"Other"},
];

const contentTypes: { value: number, name: string }[] = [
    {value: 1, name:"ReadingText"},
    {value: 2, name:"Video"},
    {value: 3, name:"Pdf"},
    {value: 4, name:"Url"},
    {value: 5, name:"Others"},
];




export const enums = {
    statuses,
    availableGroups,
    availableSegments,
    contentTypes,
}