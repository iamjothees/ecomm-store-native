import React, { useEffect, useState } from 'react';
import { addAddress, getAddresses, deleteAddress, updateAddress } from '@/features/users/userService';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { AddressForm } from './AddressForm';
import { useToast } from '@/contexts/ToastContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function ManageAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = () => {
    getAddresses(user.id).then(setAddresses);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsDrawerOpen(true);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsDrawerOpen(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(user.id, addressId);
      fetchAddresses();
      showToast("Address deleted successfully");
    } catch (error) {
      showToast("Failed to delete address", "error");
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedAddress) {
        await updateAddress(user.id, { ...selectedAddress, ...data });
        showToast("Address updated successfully");
      } else {
        await addAddress(user.id, data);
        showToast("Address added successfully");
      }
      fetchAddresses();
      setIsDrawerOpen(false);
    } catch (error) {
      showToast("Failed to save address", "error");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Addresses</CardTitle>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" onClick={handleAddAddress}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedAddress ? 'Edit Address' : 'Add a new address'}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-32 overflow-y-auto">
                <AddressForm 
                    address={selectedAddress} 
                    onSubmit={handleFormSubmit} 
                    onCancel={() => setIsDrawerOpen(false)} 
                />
            </div>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        {addresses === undefined && <AddressSkeleton />}
        {addresses?.length === 0 && <p>You have no saved addresses.</p>}
        {addresses?.length > 0 && (
          <div className="space-y-4">
            {addresses.map(address => (
              <Address 
                key={address.id} 
                address={address} 
                onEdit={handleEditAddress} 
                onDelete={handleDeleteAddress} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const Address = ({ address, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-start">
      <div>
        <p className="font-semibold">{address.name} ({address.addressCategory})</p>
        <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
        {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
        <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.postalCode}</p>
        <p className="text-sm text-muted-foreground">{address.country}</p>
        <p className="text-sm text-muted-foreground">Phone: {address.phoneNumberWithCountryCode}</p>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(address)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-500" onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this address.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(address.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden md:flex flex-col space-y-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this address.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(address.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

const AddressSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="border p-4 rounded-lg">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-48 mb-1" />
        <Skeleton className="h-4 w-40 mb-1" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export default ManageAddresses;