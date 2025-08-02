import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Search, User, Home } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Search },
    { id: "add", label: "Add", icon: Plus },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-lg bg-card/80 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 h-12 px-3",
              activeTab === id && "bg-gradient-primary shadow-glow-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}