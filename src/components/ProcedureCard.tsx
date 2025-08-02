import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureCardProps {
  id: string;
  type: "tattoo" | "piercing";
  date: string;
  studio: string;
  artist: string;
  location: string;
  description: string;
  isPublic?: boolean;
  onViewDetails: (id: string) => void;
}

export function ProcedureCard({
  id,
  type,
  date,
  studio,
  artist,
  location,
  description,
  isPublic = false,
  onViewDetails,
}: ProcedureCardProps) {
  return (
    <Card className="bg-gradient-dark border-border shadow-card hover:shadow-glow-primary transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant={type === "tattoo" ? "default" : "secondary"}
              className={cn(
                "text-xs font-semibold",
                type === "tattoo" && "bg-gradient-primary border-primary/20",
                type === "piercing" && "bg-gradient-accent border-accent/20"
              )}
            >
              {type.toUpperCase()}
            </Badge>
            {isPublic && (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{studio}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{artist}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(id)}
          className="w-full mt-4 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
        >
          View Aftercare
        </Button>
      </CardContent>
    </Card>
  );
}