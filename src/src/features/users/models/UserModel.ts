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
    phoneNumberCountryCode?: string;
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
    addresses?: AddressModel[];

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
        phoneNumberCountryCode?: string,
        addresses?: AddressModel[],
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
        this.phoneNumberCountryCode = phoneNumberCountryCode;
        this.addresses = addresses;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    };

    get phoneNumberWithCountryCode(): string {
        return `${this.phoneNumberCountryCode} ${this.phoneNumber}`;
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
        if (json.phoneNumber && !json.phoneNumberCountryCode) {
            throw new Error("Phone number country code is required");
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
            json.phoneNumberCountryCode,
            json.addresses?.map((address: any) => AddressModel.fromJson(address))
        );
        user.dateOfBirth = json.dateOfBirth ? new Date(json.dateOfBirth) : undefined;
        user.createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        user.updatedAt = json.updatedAt ? new Date(json.updatedAt) : undefined;
        user.preferences = json.preferences;
        return user;
    }
}