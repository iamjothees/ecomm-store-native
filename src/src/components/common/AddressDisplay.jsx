import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddressDisplay = ({ title, address }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <address className="not-italic space-y-1 text-muted-foreground">
            <p className="font-semibold text-primary">{address.name}</p>
            <p>{address.addressLine1}</p>
            {address.addressLine2 && <p>{address.addressLine2}</p>}
            <p>{address.city}, {address.state} {address.postalCode}</p>
            <p>{address.country}</p>
            <p>
                <span className="font-medium">Phone:</span> {address.phoneNumberCountryCode} {address.phoneNumber}
            </p>
        </address>
      </CardContent>
    </Card>
  );
};

export default AddressDisplay;
