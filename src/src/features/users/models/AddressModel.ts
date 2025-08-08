export interface AddressModel {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    isDefault?: boolean;
    addressType: 'shipping' | 'billing' | 'both';
    addressCategory: 'home' | 'work' | 'other';
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Validation type for required fields when creating a new address
export type CreateAddressModel = Omit<AddressModel, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing address
export type UpdateAddressModel = Partial<CreateAddressModel> & {
    id: string;
};
