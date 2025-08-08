import { AddressModel } from "@/features/users/models/AddressModel";
import { testUsers } from "@/tests/data";
import { UserModel } from "./models/UserModel";

export const getAddresses = async (userId: string): Promise<AddressModel[]> => {

    const user = testUsers.find((user: UserModel) => user.id === userId);

    const addresses = [ ...user.shippingAddresses, ...user.billingAddresses ];
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(addresses), 500);
    });
};
