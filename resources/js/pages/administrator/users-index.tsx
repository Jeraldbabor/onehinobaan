import { Head, useForm, router } from '@inertiajs/react';
import {
    Plus,
    UserCog,
    Key,
    Trash2,
    UserCheck,
    User as UserIcon,
    Camera,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type UserRow = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor';
    avatar_url: string | null;
    created_at: string;
};

type UsersIndexProps = {
    users: UserRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User Management', href: '/dashboard/users' },
];

export default function UsersIndex({ users }: UsersIndexProps) {
    // Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Dialog states
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

    // Add User Form
    const addForm = useForm({
        name: '',
        email: '',
        role: 'editor' as 'admin' | 'editor',
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
    });

    const [addAvatarPreview, setAddAvatarPreview] = useState<string | null>(
        null,
    );
    const addFileInputRef = useRef<HTMLInputElement>(null);

    const handleAddAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            addForm.setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAddAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Edit User Form
    const editForm = useForm({
        id: 0,
        name: '',
        email: '',
        role: 'editor' as 'admin' | 'editor',
        avatar: null as File | null,
        _method: 'put',
    });

    const [editAvatarPreview, setEditAvatarPreview] = useState<string | null>(
        null,
    );
    const editFileInputRef = useRef<HTMLInputElement>(null);

    const handleEditAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = useForm({
        password: '',
        password_confirmation: '',
    });

    const triggerToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const submitAdd = (e: React.FormEvent) => {
        e.preventDefault();
        addForm.post('/dashboard/users', {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                addForm.reset();
                setAddAvatarPreview(null);
                triggerToast('User created successfully.');
            },
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.post(`/dashboard/users/${editForm.data.id}`, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                editForm.reset();
                setEditAvatarPreview(null);
                triggerToast('User updated successfully.');
            },
        });
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        resetForm.post(`/dashboard/users/${selectedUser.id}/reset-password`, {
            onSuccess: () => {
                setIsResetDialogOpen(false);
                resetForm.reset();
                triggerToast('Password reset successfully.');
            },
        });
    };

    const handleDeleteUser = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this user? This action cannot be undone.',
            )
        )
            return;
        router.delete(`/dashboard/users/${id}`, {
            onSuccess: () => {
                triggerToast('User deleted successfully.');
            },
        });
    };

    const openAddDialog = () => {
        addForm.reset();
        setAddAvatarPreview(null);
        setIsAddDialogOpen(true);
    };

    const openEditDialog = (user: UserRow) => {
        editForm.setData({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: null,
            _method: 'put',
        });
        setEditAvatarPreview(user.avatar_url);
        setIsEditDialogOpen(true);
    };

    const openResetDialog = (user: UserRow) => {
        setSelectedUser(user);
        resetForm.reset();
        setIsResetDialogOpen(true);
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Admin
                    </span>
                );
            case 'editor':
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Editor
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-400">
                        User
                    </span>
                );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="flex flex-1 flex-col gap-6 px-4 py-8 md:px-6 lg:max-w-5xl">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Accounts & Permissions
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage administrative and editor accounts for the
                            municipality.
                        </p>
                    </div>
                    <Button onClick={openAddDialog}>
                        <Plus className="mr-2 size-4" />
                        New Account
                    </Button>
                </header>

                <div className="grid gap-4">
                    {users.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <UserCog className="size-12 text-muted-foreground opacity-20" />
                                <p className="mt-4 text-sm text-muted-foreground">
                                    No other accounts found.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {users.map((user) => (
                                <Card key={user.id} className="overflow-hidden">
                                    <div className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center lg:p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                                                {user.avatar_url ? (
                                                    <img
                                                        src={user.avatar_url}
                                                        alt={user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-semibold uppercase">
                                                        {user.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="leading-none font-semibold">
                                                        {user.name}
                                                    </h3>
                                                    {getRoleBadge(user.role)}
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </p>
                                                <p className="text-xs text-muted-foreground/60">
                                                    Joined {user.created_at}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    openEditDialog(user)
                                                }
                                            >
                                                <UserCheck className="mr-1.5 size-3.5" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    openResetDialog(user)
                                                }
                                            >
                                                <Key className="mr-1.5 size-3.5" />
                                                Password
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDeleteUser(user.id)
                                                }
                                            >
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <DialogDescription>
                            Add a new administrator, editor, or regular user.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitAdd} className="space-y-4 pt-4">
                        <div className="mb-4 flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted shadow-inner">
                                    {addAvatarPreview ? (
                                        <img
                                            src={addAvatarPreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="h-10 w-10 text-muted-foreground" />
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="absolute -right-1 -bottom-1 h-7 w-7 rounded-full shadow-md"
                                    onClick={() =>
                                        addFileInputRef.current?.click()
                                    }
                                >
                                    <Camera className="h-3.5 w-3.5" />
                                </Button>
                                <input
                                    type="file"
                                    ref={addFileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAddAvatarChange}
                                />
                            </div>
                            <div className="text-center">
                                <Label className="text-xs text-muted-foreground">
                                    Profile Picture (Optional)
                                </Label>
                                {addForm.errors.avatar && (
                                    <p className="mt-1 text-[10px] text-destructive">
                                        {addForm.errors.avatar}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="add-name">Full Name</Label>
                            <Input
                                id="add-name"
                                value={addForm.data.name}
                                onChange={(e) =>
                                    addForm.setData('name', e.target.value)
                                }
                                required
                            />
                            {addForm.errors.name && (
                                <p className="text-xs text-destructive">
                                    {addForm.errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-email">Email Address</Label>
                            <Input
                                id="add-email"
                                type="email"
                                value={addForm.data.email}
                                onChange={(e) =>
                                    addForm.setData('email', e.target.value)
                                }
                                required
                            />
                            {addForm.errors.email && (
                                <p className="text-xs text-destructive">
                                    {addForm.errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-role">Account Role</Label>
                            <Select
                                value={addForm.data.role}
                                onValueChange={(val: 'admin' | 'editor') =>
                                    addForm.setData('role', val)
                                }
                            >
                                <SelectTrigger id="add-role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="editor">
                                        Editor (Content Management)
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        Administrator (Full Access)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-password">Password</Label>
                            <Input
                                id="add-password"
                                type="password"
                                value={addForm.data.password}
                                onChange={(e) =>
                                    addForm.setData('password', e.target.value)
                                }
                                required
                            />
                            {addForm.errors.password && (
                                <p className="text-xs text-destructive">
                                    {addForm.errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-confirm">
                                Confirm Password
                            </Label>
                            <Input
                                id="add-confirm"
                                type="password"
                                value={addForm.data.password_confirmation}
                                onChange={(e) =>
                                    addForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={addForm.processing}>
                                Create Account
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                        <DialogDescription>
                            Update user information and permissions.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4 pt-4">
                        <div className="mb-4 flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted shadow-inner">
                                    {editAvatarPreview ? (
                                        <img
                                            src={editAvatarPreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="h-10 w-10 text-muted-foreground" />
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="absolute -right-1 -bottom-1 h-7 w-7 rounded-full shadow-md"
                                    onClick={() =>
                                        editFileInputRef.current?.click()
                                    }
                                >
                                    <Camera className="h-3.5 w-3.5" />
                                </Button>
                                <input
                                    type="file"
                                    ref={editFileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleEditAvatarChange}
                                />
                            </div>
                            <div className="text-center">
                                <Label className="text-xs text-muted-foreground">
                                    Profile Picture
                                </Label>
                                {editForm.errors.avatar && (
                                    <p className="mt-1 text-[10px] text-destructive">
                                        {editForm.errors.avatar}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) =>
                                    editForm.setData('name', e.target.value)
                                }
                                required
                            />
                            {editForm.errors.name && (
                                <p className="text-xs text-destructive">
                                    {editForm.errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email Address</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) =>
                                    editForm.setData('email', e.target.value)
                                }
                                required
                            />
                            {editForm.errors.email && (
                                <p className="text-xs text-destructive">
                                    {editForm.errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-role">Account Role</Label>
                            <Select
                                value={editForm.data.role}
                                onValueChange={(val: 'admin' | 'editor') =>
                                    editForm.setData('role', val)
                                }
                            >
                                <SelectTrigger id="edit-role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="editor">
                                        Editor (Content Management)
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        Administrator (Full Access)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reset Password Dialog */}
            <Dialog
                open={isResetDialogOpen}
                onOpenChange={setIsResetDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleResetPassword}>
                        <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                                Set a new password for {selectedUser?.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="reset-password">
                                    New Password
                                </Label>
                                <Input
                                    id="reset-password"
                                    type="password"
                                    value={resetForm.data.password}
                                    onChange={(e) =>
                                        resetForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                {resetForm.errors.password && (
                                    <p className="text-xs text-destructive">
                                        {resetForm.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="reset-confirm">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="reset-confirm"
                                    type="password"
                                    value={resetForm.data.password_confirmation}
                                    onChange={(e) =>
                                        resetForm.setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsResetDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={resetForm.processing}
                            >
                                Reset Password
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Toast
                open={showToast}
                onOpenChange={setShowToast}
                title={toastMessage}
            />
        </AppLayout>
    );
}
