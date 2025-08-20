import { AddressModel } from "./AddressModel";

class Profile{
    avatar?: string;
}

export class UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    profile: Profile;
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

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        isActive: boolean,
        isEmailVerified: boolean,
        isPhoneNumberVerified: boolean,
        profile: Profile,
        email?: string,
        phoneNumber?: string,
        shippingAddresses?: AddressModel[],
        billingAddresses?: AddressModel[],
    ) {
        if (!email && !phoneNumber) throw new Error("Email or phone number is required");

        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.isEmailVerified = isEmailVerified;
        this.isPhoneNumberVerified = isPhoneNumberVerified;
        this.profile = profile;
        this.phoneNumber = phoneNumber;
        this.shippingAddresses = shippingAddresses;
        this.billingAddresses = billingAddresses;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    };

    static fromJson(json: any): UserModel {
        if (!json.id) {
            throw new Error("User ID is required");
        }
        if (!json.email && !json.phoneNumber) {
            throw new Error("Email or phone number is required");
        }
        if (!json.firstName) {
            throw new Error("First name is required");
        }
        if (!json.lastName) {
            throw new Error("Last name is required");
        }
        if (json.isActive === undefined) {
            throw new Error("isActive is required");
        }
        if (json.isEmailVerified === undefined) {
            throw new Error("isEmailVerified is required");
        }
        if (json.isPhoneNumberVerified === undefined) {
            throw new Error("isPhoneNumberVerified is required");
        }

        const user = new UserModel(
            json.id,
            json.firstName,
            json.lastName,
            json.isActive,
            json.isEmailVerified,
            json.isPhoneNumberVerified,
            json.profile || new Profile(),
            json.email,
            json.phoneNumber,
            json.shippingAddresses?.map((address: any) => AddressModel.fromJson(address)),
            json.billingAddresses?.map((address: any) => AddressModel.fromJson(address))
        );
        user.dateOfBirth = json.dateOfBirth ? new Date(json.dateOfBirth) : undefined;
        user.createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        user.updatedAt = json.updatedAt ? new Date(json.updatedAt) : undefined;
        user.preferences = json.preferences;
        return user;
    }
}