import AppBarChart from "@/components/bar-chart";
import AppAreaChart from "@/components/chart-area-gradient";
import AppPieChart from "@/components/chart-pie";

const Home = () => {
    return (
        <>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
            <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'>
                <AppBarChart/>
            </div>
            <div className='bg-primary-foreground p-4 rounded-lg'>

            </div>
            <div className='bg-primary-foreground p-4 rounded-lg'>
                <AppPieChart/>
            </div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
            <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2'>
                <AppAreaChart/>
            </div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>
            <div className='bg-primary-foreground p-4 rounded-lg'>Test</div>

        </div>

        </>
    );
}

export default Home;
