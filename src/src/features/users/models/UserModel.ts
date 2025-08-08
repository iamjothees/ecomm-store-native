import { AddressModel } from "./AddressModel";

export interface UserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    preferences?: {
        language?: string;
        currency?: string;
        notifications?: {
            email?: boolean;
            push?: boolean;
            sms?: boolean;
        };
    };
    shippingAddresses?: AddressModel[];
    billingAddresses?: AddressModel[];
}
