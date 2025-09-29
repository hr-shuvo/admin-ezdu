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


