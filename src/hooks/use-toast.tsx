import { toast } from 'sonner';
import {
    Alert,
    AlertIcon,
    AlertContent,
    AlertTitle,
    AlertDescription,
} from '@/components/ui/alert';
import { RiAlertFill, RiCheckFill } from '@remixicon/react';

interface CustomToastProps {
    title: string;
    description: string;
    duration?: number;
    children?: React.ReactNode;
}

export function useCustomAlertToast() {
    function showSuccessToast({
        title,
        description,
        duration = 5000,
        children,
    }: CustomToastProps) {
        toast.custom(
            (t) => (
                <Alert
                    variant="success"
                    appearance="light"
                    close={true}
                    onClose={() => toast.dismiss(t)}
                >
                    <AlertIcon>
                        <RiCheckFill />
                    </AlertIcon>
                    <AlertContent>
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>
                            <p>{description}</p>
                            {children && (
                                <div className="space-x-3.5">{children}</div>
                            )}
                        </AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            { duration }
        );
    }

    function showAlertToast({
        title,
        description,
        duration = 5000,
        children,
    }: CustomToastProps) {
        toast.custom(
            (t) => (
                <Alert
                    variant="destructive"
                    appearance="light"
                    close={true}
                    onClose={() => toast.dismiss(t)}
                >
                    <AlertIcon>
                        <RiAlertFill />
                    </AlertIcon>
                    <AlertContent>
                        <AlertTitle>{title} </AlertTitle>
                        <AlertDescription>
                            <p>{description} </p>
                            {children && (
                                <div className="space-x-3.5"> {children} </div>
                            )}
                        </AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            { duration }
        );
    }

    return { showAlertToast, showSuccessToast };
}
