import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSection from '@/components/account/ProfileSection';
import OrderHistory from '@/components/account/OrderHistory';
import ManageAddresses from '@/components/account/ManageAddresses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import useScreenContext from "@/contexts/ScreenContext";
import { Loader2 } from 'lucide-react';

function Account() {
  const { user, logout } = useAuth();
  const { defaultScreen, setScreen } = useScreenContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout().then(() => {
      navigate('/onboarding');
    }).finally(() => {
      setIsLoggingOut(false);
    });
  };

  useEffect(() => { setScreen(() => ({ ...defaultScreen, screenTitle: "Account" })); }, []);

  if (user === undefined) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pt-18 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold">Hello, <span className="text-2xl font-bold">{user.fullName}</span></h1>
        <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
          {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Logout
        </Button>
      </div>
      <div className="space-y-8">
        <ProfileSection />
        <OrderHistory />
        <ManageAddresses />
      </div>
    </div>
  );
}

export default Account;
