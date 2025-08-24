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

    const addresses = user.addresses || [];
    
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

    const newAddress = { ...addressData, id: uuidv4() };
    
    if (!testUsers[userIndex].addresses) {
        testUsers[userIndex].addresses = [];
    }
    testUsers[userIndex].addresses.push(newAddress);

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
    
    const addressIndex = testUsers[userIndex].addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex !== -1) {
        testUsers[userIndex].addresses[addressIndex] = addressData;
    }

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

    if (!testUsers[userIndex].addresses) {
        return;
    }
    testUsers[userIndex].addresses = testUsers[userIndex].addresses.filter(addr => addr.id !== addressId);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
    });
};