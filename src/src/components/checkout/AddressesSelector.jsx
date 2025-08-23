import { getAddresses, addAddress } from "@/features/users/userService";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Home, MapPin, Plus } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { saveSelectedAddresses, getSelectedAddresses } from "@/features/cart/cartService";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { AddressForm } from "@/components/account/AddressForm";
import { useToast } from "@/contexts/ToastContext";

const AddressesSelector = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAddresses();
      const { shippingAddress, billingAddress, isBillingSameAsShipping } = getSelectedAddresses();
      if (shippingAddress) setSelectedShippingAddress(shippingAddress);
      if (billingAddress) setSelectedBillingAddress(billingAddress);
      setUseShippingAsBilling(isBillingSameAsShipping);
    }
  }, [user]);

  useEffect(() => {
    if (useShippingAsBilling) {
      setSelectedBillingAddress(selectedShippingAddress);
    }
    saveSelectedAddresses(selectedShippingAddress, selectedBillingAddress, useShippingAsBilling);
  }, [useShippingAsBilling, selectedShippingAddress, selectedBillingAddress]);

  const fetchAddresses = () => {
    getAddresses(user.id).then(addresses => {
      setAddresses(addresses);
      if (!selectedShippingAddress) {
        const defaultShipping = addresses.find(a => a.isDefault && ['shipping', 'both'].includes(a.addressType));
        if (defaultShipping) setSelectedShippingAddress(defaultShipping);
        else if (addresses.length > 0) setSelectedShippingAddress(addresses[0]);
      }
    });
  };

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

  const handleFormSubmit = async (data) => {
    try {
      await addAddress(user.id, data);
      fetchAddresses();
      showToast("Address added successfully");
      setIsDrawerOpen(false);
    } catch (error) {
      showToast("Failed to save address", "error");
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
        <CardContent className="p-4">
          <div className="flex items-end space-x-2 mb-2">
            <AddressIcon className="h-7 w-7 text-gray-500 pb-1" />
            <p className="grow-1 font-semibold text-lg">
              {address.name}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>
          <p className="text-gray-600 text-sm">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-gray-600 text-sm">{address.country}</p>
          <p className="mt-2 text-sm">
            {address.phoneNumberWithCountryCode}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <CardHeader className="px-2">
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
          <CardHeader className="px-2">
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses
              .filter((addr) => ['billing', 'both'].includes(addr.addressType))
              .map((address) => renderAddress(address, 'billing'))}
          </div>
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
            <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Add a new address</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-32 overflow-y-auto">
                <AddressForm 
                    onSubmit={handleFormSubmit} 
                    onCancel={() => setIsDrawerOpen(false)} 
                />
            </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddressesSelector;