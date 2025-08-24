export class AddressModel {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    phoneNumberCountryCode?: string;
    isDefault?: boolean;
    addressCategory: 'home' | 'work' | 'other';
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        name: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: string,
        country: string,
        postalCode: string,
        phoneNumber: string,
        phoneNumberCountryCode?: string,
        isDefault?: boolean,
        addressCategory?: 'home' | 'work' | 'other',
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
        this.phoneNumberCountryCode = phoneNumberCountryCode;
        this.isDefault = Boolean(isDefault);
        this.addressCategory = addressCategory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get phoneNumberWithCountryCode(): string {
        return `${this.phoneNumberCountryCode} ${this.phoneNumber}`;
    }

    static fromJson(json: any): AddressModel {
        if (!json.name) {
            throw new Error("Address name is required");
        }
        if (!json.addressLine1) {
            throw new Error("Address line 1 is required");
        }
        if (!json.city) {
            throw new Error("City is required");
        }
        if (!json.state) {
            throw new Error("State is required");
        }
        if (!json.country) {
            throw new Error("Country is required");
        }
        if (!json.postalCode) {
            throw new Error("Postal code is required");
        }
        if (!json.phoneNumber) {
            throw new Error("Phone number is required");
        }
        if (json.phoneNumber && !json.phoneNumberCountryCode) {
            throw new Error("Phone number country code is required");
        }
        if (!json.addressCategory) {
            throw new Error("Address category is required");
        }

        const address = new AddressModel(
            json.id,
            json.name,
            json.addressLine1,
            json.addressLine2,
            json.city,
            json.state,
            json.country,
            json.postalCode,
            json.phoneNumber,
            json.phoneNumberCountryCode,
            json.isDefault,
            json.addressCategory,
        );
        address.createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        address.updatedAt = json.updatedAt ? new Date(json.updatedAt) : undefined;
        return address;
    }
}

// Validation type for required fields when creating a new address
export type CreateAddressModel = Omit<AddressModel, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing address
export type UpdateAddressModel = Partial<CreateAddressModel> & {
    id: string;
};