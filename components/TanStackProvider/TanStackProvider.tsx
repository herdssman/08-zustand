'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface TsProps {
    children: React.ReactNode;
}

const TanStackProvider = ({children}: TsProps) => {
    const [qClient] = useState(() => new QueryClient())
    
    return <QueryClientProvider client={qClient}>{children}</QueryClientProvider>
}

export default TanStackProvider;