import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function ProfileSection() {
  const { user } = useAuth();

  if (!user) return null;

  const VerifiedStatus = ({ isVerified }) => (
    isVerified ? <CheckCircle className="inline-block h-4 w-4 text-green-500" /> : <XCircle className="inline-block h-4 w-4 text-red-500" />
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile</CardTitle>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* --- Basic Info --- */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profile?.avatar} alt={user.fullName} />
            <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
          </div>
        </div>

        {/* --- Account Status --- */}
        <div>
          <h3 className="text-md font-semibold mb-2">Account Status</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Active Member: {user.isActive ? 'Yes' : 'No'}</p>
            <p>Email Verified: <VerifiedStatus isVerified={user.isEmailVerified} /></p>
            <p>Phone Verified: <VerifiedStatus isVerified={user.isPhoneNumberVerified} /></p>
          </div>
        </div>

        {/* --- Preferences --- */}
        {user.preferences && (
          <div>
            <h3 className="text-md font-semibold mb-2">Preferences</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>Language: {user.preferences.language}</p>
              <p>Currency: {user.preferences.currency}</p>
              <div className="col-span-2">
                <p>Notifications:</p>
                <div className="flex space-x-2 mt-1">
                  {user.preferences.notifications?.email && <Badge variant="outline">Email</Badge>}
                  {user.preferences.notifications?.push && <Badge variant="outline">Push</Badge>}
                  {user.preferences.notifications?.sms && <Badge variant="outline">SMS</Badge>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Important Dates --- */}
        <div>
            <h3 className="text-md font-semibold mb-2">Important Dates</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
                {user.dateOfBirth && <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>}
                {user.createdAt && <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>}
            </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default ProfileSection;
