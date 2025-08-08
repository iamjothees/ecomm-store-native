import { getAddresses } from "@/features/users/userService";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Home, MapPin, Phone, PhoneCall } from 'lucide-react';

const AddressesSelector = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  useEffect(() => {
    getAddresses('user-12345').then(addresses => {
      setAddresses(addresses);
      const defaultShipping = addresses.find(a => a.isDefault && ['shipping', 'both'].includes(a.addressType));
      const defaultBilling = addresses.find(a => a.isDefault && ['billing', 'both'].includes(a.addressType));
      if (defaultShipping) {
        setSelectedShippingAddress(defaultShipping);
      }
      if (defaultBilling) {
        setSelectedBillingAddress(defaultBilling);
      }
    });
  }, []);

  useEffect(() => {
    if (useShippingAsBilling) {
      setSelectedBillingAddress(selectedShippingAddress);
    } 
  }, [useShippingAsBilling, selectedShippingAddress]);


  const handleSelect = (address, type) => {
    if (type === 'shipping') {
      setSelectedShippingAddress(address);
      if (useShippingAsBilling) {
        setSelectedBillingAddress(address);
      }
    } else {
      setSelectedBillingAddress(address);
    }
  };

  const renderAddress = (address, type) => {
    const isSelected = (type === 'shipping' && selectedShippingAddress?.id === address.id) ||
                        (type === 'billing' && selectedBillingAddress?.id === address.id);

    const AddressIcon = address.addressCategory === 'home' ? Home :
                        address.addressCategory === 'work' ? Briefcase :
                        MapPin;

    return (
      <Card
        key={address.id}
        className={`cursor-pointer relative ${isSelected ? 'border-primary' : ''}`}
        onClick={() => handleSelect(address, type)}
      >
        {isSelected && <CheckCircle2 className="absolute top-2 right-2 text-primary" />}
        <CardContent>
          <div className="flex items-end space-x-2 mb-2">
            <AddressIcon className="h-7 w-7 text-gray-500 pb-1" />
            <p className="grow-1 font-semibold text-lg">
              {address.name}
            </p>
          </div>
          <p className="text-gray-600">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>
          <p className="text-gray-600">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-gray-600">{address.country}</p>
          <p className="mt-2">
            {address.phoneNumber}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses
            .filter((addr) => [...['shipping', 'both'], ...(useShippingAsBilling ? ['billing'] : [])].includes(addr.addressType))
            .map((address) => renderAddress(address, 'shipping'))}
        </div>
        <div className="flex items-center space-x-2 mt-4">
            <input type="checkbox" id="useShippingAsBilling" checked={useShippingAsBilling} onChange={(e) => setUseShippingAsBilling(e.target.checked)} />
            <label htmlFor="useShippingAsBilling">Use same address for billing</label>
        </div>
      </div>

      {!useShippingAsBilling && (
        <div>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses
              .filter((addr) => ['billing', 'both'].includes(addr.addressType))
              .map((address) => renderAddress(address, 'billing'))}
          </div>
        </div>
      )}

      <Button>Add New Address</Button>
    </div>
  );
};

export default AddressesSelector;