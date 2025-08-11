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
