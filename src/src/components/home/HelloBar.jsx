import { User, ShoppingCart, Bell } from "lucide-react"
import { BadgeIcon } from "@/components/common/BadgeIcon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router";

export function HelloBar() {
  const { cart } = useCart();

  return (
    <Card className="w-[98%] p-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg">
      <div className="flex items-center justify-between">
        {/* User greeting with Avatar */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary-foreground text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-light">Hello,</p>
            <p className="font-medium">Joe Dev</p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <BadgeIcon 
            onClick={() => alert("Bell clicked")}
            icon={Bell} 
            count={3} 
            iconSize="lg"
            className="hover:text-primary-foreground/80 transition-colors"
          />
          <Link to="/cart">
            <BadgeIcon
              icon={ShoppingCart}
              count={cart.length}
              showNumber
              iconSize="lg"
              className="hover:text-primary-foreground/80 transition-colors"
            />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default HelloBar