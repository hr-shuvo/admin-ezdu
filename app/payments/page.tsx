import { DataTable } from "@/app/payments/data-table";
import { columns, Payment } from "@/app/payments/columns";


const payments: Payment[] = [
    {
        "id": "728ed52f",
        "amount": 100,
        "username": "uq1_updated",
        "status": "success",
        "email": "user1@example.com"
    },
    {
        "id": "489e1d42",
        "amount": 125,
        "username": "uq2_updated",
        "status": "failed",
        "email": "user2@example.com"
    },
    {
        "id": "9a1bc334",
        "amount": 150,
        "username": "uq3_updated",
        "status": "pending",
        "email": "user3@example.com"
    },
    {
        "id": "a67f91b0",
        "amount": 200,
        "username": "uq4_updated",
        "status": "success",
        "email": "user4@example.com"
    },
    {
        "id": "c34d8129",
        "amount": 175,
        "username": "uq5_updated",
        "status": "failed",
        "email": "user5@example.com"
    },
    {
        "id": "e12fbc98",
        "amount": 300,
        "username": "uq6_updated",
        "status": "pending",
        "email": "user6@example.com"
    },
    {
        "id": "f45b9211",
        "amount": 220,
        "username": "uq7_updated",
        "status": "success",
        "email": "user7@example.com"
    },
    {
        "id": "b93a6d77",
        "amount": 130,
        "username": "uq8_updated",
        "status": "failed",
        "email": "user8@example.com"
    },
    {
        "id": "d72f41aa",
        "amount": 260,
        "username": "uq9_updated",
        "status": "pending",
        "email": "user9@example.com"
    },
    {
        "id": "ef92c35d",
        "amount": 110,
        "username": "uq10_updated",
        "status": "success",
        "email": "user10@example.com"
    },
    {
        "id": "a23d9f88",
        "amount": 190,
        "username": "uq11_updated",
        "status": "failed",
        "email": "user11@example.com"
    },
    {
        "id": "b81c4e55",
        "amount": 280,
        "username": "uq12_updated",
        "status": "pending",
        "email": "user12@example.com"
    }
];

const PaymentsPage = () => {
    return (

        <div className=''>
            <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
                <h1 className='font-semibold'>All Payments</h1>

            </div>

            <DataTable columns={columns} data={payments}/>
        </div>



    )
}

export default PaymentsPage