import { User, ShoppingCart, Bell } from "lucide-react"
import { BadgeIcon } from "@/components/common/BadgeIcon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function HelloBar() {
  const { cart } = useCart();
  const { user } = useAuth();

  return (
    <Card className="w-[98%] p-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg animate-slide-in-left">
      {
        user === undefined 
          ? <HelloBarSkeleton /> 
          : (
            <div className="flex items-center justify-between">
              {/* User greeting with Avatar */}
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.profile.avatar || "#"} />
                  <AvatarFallback className="bg-primary-foreground text-primary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-light">Welcome,</p>
                  <p className="font-medium">{user.fullName || "Guest User"}</p>
                </div>
              </div>

              {/* Action icons */}
              <div className="flex items-center gap-4">
                {/* TODO: Notification */}
                {/* <BadgeIcon 
                  onClick={() => alert("Bell clicked")}
                  icon={Bell} 
                  count={3} 
                  iconSize="lg"
                  className="hover:text-primary-foreground/80 transition-colors"
                /> */}
                <Link to="/cart">
                  <BadgeIcon
                    icon={ShoppingCart}
                    count={cart.items.length}
                    showNumber
                    iconSize="lg"
                    className="hover:text-primary-foreground/80 transition-colors"
                  />
                </Link>
              </div>
            </div>
          )
      }
    </Card>
  );
}

export default HelloBar

const HelloBarSkeleton = () => (
    <div className="flex items-center justify-between">
      {/* User greeting with Avatar */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="text-sm font-light w-16 h-3" />
          <Skeleton className="font-medium w-20 h-3" />
        </div>
      </div>
      {/* Action icons */}
      <div className="flex items-center gap-4">
        {/* <Skeleton className="h-6 w-6" /> */}
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
);