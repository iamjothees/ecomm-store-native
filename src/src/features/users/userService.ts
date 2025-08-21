import { AddressModel } from "@/features/users/models/AddressModel";
import { testUsers } from "@/tests/data";
import { UserModel } from "./models/UserModel";

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
