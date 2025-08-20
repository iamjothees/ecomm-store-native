import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSection from '@/components/account/ProfileSection';
import OrderHistory from '@/components/account/OrderHistory';
import ManageAddresses from '@/components/account/ManageAddresses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import useScreenContext from "@/contexts/ScreenContext";

function Account() {
  const { user, logout } = useAuth();
  const { defaultScreen, setScreen } = useScreenContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate('/onboarding');
    });
  };

  useEffect(() => { setScreen(() => ({ ...defaultScreen, screenTitle: "Account" })); }, []);

  if (user === undefined) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pt-18 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold">Welcome, <span className="text-2xl font-bold">{user.fullName}</span></h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
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
