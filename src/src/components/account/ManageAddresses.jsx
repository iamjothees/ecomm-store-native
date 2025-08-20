import React, { useEffect, useState } from 'react';
import { getAddresses } from '@/features/users/userService';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ManageAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(undefined);

  useEffect(() => {
    if (user) {
      getAddresses(user.id).then(setAddresses);
    }
  }, [user]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Addresses</CardTitle>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent>
        {addresses === undefined && <AddressSkeleton />}
        {addresses?.length === 0 && <p>You have no saved addresses.</p>}
        {addresses?.length > 0 && (
          <div className="space-y-4">
            {addresses.map(address => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const AddressItem = ({ address }) => {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-start">
      <div>
        <p className="font-semibold">{address.name} ({address.addressCategory})</p>
        <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
        {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
        <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.postalCode}</p>
        <p className="text-sm text-muted-foreground">{address.country}</p>
        <p className="text-sm text-muted-foreground">Phone: {address.phoneNumber}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button variant="destructive" size="sm">Delete</Button>
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
