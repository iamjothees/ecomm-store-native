import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/contexts/ToastContext';
import { Pencil, CheckCircle, XCircle, Check, X, CalendarIcon, Calendar1 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfile } from '@/features/users/userService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().optional(),
  countryCode: z.string().optional(),
  dateOfBirth: z.date().optional(),
  avatar: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

function ProfileEditForm({ form, onSubmit }) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="+1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input {...field} value={ field.value ? format(field.value, "PPP") : "Select a date" } />
                    <Calendar1 className='absolute top-1/2 right-1 transform -translate-y-1/2 text-muted-foreground hover:text-primary-foreground' />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function ProfileSection() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      countryCode: user?.countryCode || '',
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      avatar: user?.profile?.avatar || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { avatar, ...profileData } = data;
      const updatedUserData = { ...profileData, profile: { avatar } };
      const updatedUser = await updateProfile(user.id, updatedUserData);
      setUser(updatedUser);
      setIsEditing(false);
      showToast("Profile updated successfully");
    } catch (error) {
      showToast("Failed to update profile", "error");
    }
  };

  if (!user) return null;

  const VerifiedStatus = ({ isVerified }) => (
    isVerified ? <CheckCircle className="inline-block h-4 w-4 text-green-500" /> : <XCircle className="inline-block h-4 w-4 text-red-500" />
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile</CardTitle>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={form.handleSubmit(onSubmit)}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profile?.avatar} alt={user.fullName} />
            <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
          </Avatar>
          {!isEditing && (
            <div className="space-y-1">
              <p className="text-lg font-semibold">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
            </div>
          )}
        </div>

        {isEditing ? (
          <ProfileEditForm form={form} onSubmit={onSubmit} />
        ) : (
          <>
            <div>
              <h3 className="text-md font-semibold mb-2">Account Status</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>Email Verified: <VerifiedStatus isVerified={user.isEmailVerified} /></p>
                <p>Phone Verified: <VerifiedStatus isVerified={user.isPhoneNumberVerified} /></p>
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-2">Important Dates</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {user.dateOfBirth && <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>}
                {user.createdAt && <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileSection;
