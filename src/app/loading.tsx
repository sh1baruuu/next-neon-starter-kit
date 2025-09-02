import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-3">
                <Loader2
                    size={32}
                    strokeWidth={3}
                    className="text-blue-500 animate-spin"
                />
                <span className="text-xs text-muted-foreground">
                    Loading...
                </span>
            </div>
        </div>
    );
}
