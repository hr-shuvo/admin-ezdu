import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    children: ReactNode;
}

const AuthLayout = ({children}: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div
                className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC41Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

            {/* Main container */}
            <div className="w-full max-w-md">
                <Card className="border shadow-lg">
                    <CardContent className="p-8">


                        {/* Content */}
                        {children}
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-muted-foreground">
                    <p>Protected by ezdu security</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;




//
// <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//
//     <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//     </div>
//
//
//     <div className="relative w-full max-w-md">
//
//         <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/25">
//
//             <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
//                     <Sparkles className="w-8 h-8 text-white" />
//                 </div>
//             </div>
//
//             {children}
//         </div>
//     </div>
// </div>
//
