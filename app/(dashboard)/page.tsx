import AppBarChart from "@/components/charts/chart-bar";
import AppAreaChart from "@/components/charts/chart-area-gradient";
import AppPieChart from "@/components/charts/chart-pie";
import CardList from "@/components/card-list";
import TodoList from "@/components/todo-list";

const Dashboard = () => {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
                <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'>
                    <AppBarChart/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg'>
                    <CardList title={"Latest Transaction"}/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg'>
                    <AppPieChart/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg'>
                    <TodoList/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'>
                    <AppAreaChart/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg'>
                    <CardList title={"Popular Content"}/>
                </div>
                <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
                <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
                <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
                <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>

            </div>

        </>
    );
}

export default Dashboard;
