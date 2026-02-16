import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Registration Disabled"
            description="Public registration is currently closed."
        >
            <Head title="Register" />

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <p className="text-muted-foreground">
                    Public registration has been disabled by the administrator.
                    Please contact support if you need an account.
                </p>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </AuthLayout>
    );
}
