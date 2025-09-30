import { Loader } from "lucide-react"

const Loading = () =>{
    return(
        <div className="flex min-h-screen w-full items-center justify-center">
            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
    )
};


export default Loading;