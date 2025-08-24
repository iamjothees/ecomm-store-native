import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInput } from '@/components/common/PhoneInput';

const addressSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address line 1 must be at least 5 characters." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  phoneNumberCountryCode: z.string().min(2, { message: "Country code must be at least 2 digits." }),
  addressCategory: z.enum(['home', 'work', 'other']),
});

export function AddressForm({ address, onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      id: address?.id || '',
      name: address?.name || '',
      addressLine1: address?.addressLine1 || '',
      addressLine2: address?.addressLine2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || '',
      postalCode: address?.postalCode || '',
      phoneNumber: address?.phoneNumber || '',
      phoneNumberCountryCode: address?.phoneNumberCountryCode || '',
      addressCategory: address?.addressCategory || 'home',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Home" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apt, suite, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <PhoneInput
          control={form.control}
          countryCodeName="phoneNumberCountryCode"
          phoneNumberName="phoneNumber"
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="addressCategory"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Address Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                    <SelectTrigger>
                        <SelectValue placeholder="Select an address category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
