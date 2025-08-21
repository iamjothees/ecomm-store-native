import { AddressModel } from "@/features/users/models/AddressModel";
import { testUsers } from "@/tests/data";
import { UserModel } from "./models/UserModel";
import { v4 as uuidv4 } from 'uuid';

export const getAddresses = async (userId: string): Promise<AddressModel[]> => {

    const userJson = testUsers.find((user) => user.id === userId);
    if (!userJson) {
        return [];
    }
    const user = UserModel.fromJson(userJson);

    const addresses = [ ...(user.shippingAddresses || []), ...(user.billingAddresses || []) ];
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(addresses), 500);
    });
};

export const updateProfile = async (userId: string, profileData: Partial<UserModel>): Promise<UserModel> => {
    console.log('Updating profile for user:', userId, profileData);

    const userIndex = testUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        throw new Error("User not found");
    }

    // Merge the existing user data with the new profile data
    const updatedUserJson = { ...testUsers[userIndex], ...profileData };
    
    // Update the user in our mock data
    testUsers[userIndex] = updatedUserJson;

    const updatedUser = UserModel.fromJson(updatedUserJson);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(updatedUser), 500);
    });
};

export const addAddress = async (userId: string, addressData: Omit<AddressModel, 'id'>): Promise<AddressModel> => {
    const userIndex = testUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const newAddress = { ...addressData, id: uuidv4(), userId };
    
    if (newAddress.addressType === 'shipping' || newAddress.addressType === 'both') {
        if (!testUsers[userIndex].shippingAddresses) {
            testUsers[userIndex].shippingAddresses = [];
        }
        testUsers[userIndex].shippingAddresses.push(newAddress);
    }
    if (newAddress.addressType === 'billing' || newAddress.addressType === 'both') {
        if (!testUsers[userIndex].billingAddresses) {
            testUsers[userIndex].billingAddresses = [];
        }
        testUsers[userIndex].billingAddresses.push(newAddress);
    }

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(AddressModel.fromJson(newAddress)), 500);
    });
};

export const updateAddress = async (userId: string, addressData: AddressModel): Promise<AddressModel> => {
    const userIndex = testUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const addressId = addressData.id;

    const updateUserAddress = (addresses: AddressModel[] | undefined) => {
        if (!addresses) return;
        const addressIndex = addresses.findIndex(addr => addr.id === addressId);
        if (addressIndex !== -1) {
            addresses[addressIndex] = addressData;
        }
    };

    updateUserAddress(testUsers[userIndex].shippingAddresses);
    updateUserAddress(testUsers[userIndex].billingAddresses);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(AddressModel.fromJson(addressData)), 500);
    });
};

export const deleteAddress = async (userId: string, addressId: string): Promise<void> => {
    const userIndex = testUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const filterAddresses = (addresses: AddressModel[] | undefined) => {
        if (!addresses) return undefined;
        return addresses.filter(addr => addr.id !== addressId);
    };

    testUsers[userIndex].shippingAddresses = filterAddresses(testUsers[userIndex].shippingAddresses);
    testUsers[userIndex].billingAddresses = filterAddresses(testUsers[userIndex].billingAddresses);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
    });
};