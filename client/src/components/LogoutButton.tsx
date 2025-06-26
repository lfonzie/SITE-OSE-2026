import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className={`fixed top-4 right-4 z-50 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 ${className}`}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout Admin
    </Button>
  );
}