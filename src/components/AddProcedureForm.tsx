import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureFormData {
  type: "tattoo" | "piercing" | "";
  date: string;
  studio: string;
  artist: string;
  location: string;
  description: string;
}

interface AddProcedureFormProps {
  onSubmit: (data: ProcedureFormData) => void;
  onCancel: () => void;
}

export function AddProcedureForm({ onSubmit, onCancel }: AddProcedureFormProps) {
  const [formData, setFormData] = useState<ProcedureFormData>({
    type: "",
    date: "",
    studio: "",
    artist: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.date && formData.location) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ProcedureFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.type && formData.date && formData.location;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="bg-gradient-dark border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-primary" />
            Add New Procedure
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Record your new tattoo or piercing to get personalized aftercare guidance
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Procedure Type */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Procedure Type *</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={formData.type === "tattoo" ? "default" : "outline"}
                  onClick={() => updateField("type", "tattoo")}
                  className={cn(
                    "h-12 flex flex-col items-center gap-1",
                    formData.type === "tattoo" && "bg-gradient-primary shadow-glow-primary"
                  )}
                >
                  <div className="text-lg">🎨</div>
                  <span className="text-xs">Tattoo</span>
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "piercing" ? "default" : "outline"}
                  onClick={() => updateField("type", "piercing")}
                  className={cn(
                    "h-12 flex flex-col items-center gap-1",
                    formData.type === "piercing" && "bg-gradient-accent shadow-glow-accent"
                  )}
                >
                  <div className="text-lg">💎</div>
                  <span className="text-xs">Piercing</span>
                </Button>
              </div>
            </div>

            {/* Procedure Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Procedure Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="bg-background/50 border-border"
                required
              />
            </div>

            {/* Body Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Body Location *
              </Label>
              <Input
                id="location"
                placeholder="e.g., Right forearm, Left earlobe"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="bg-background/50 border-border"
                required
              />
            </div>

            {/* Studio Name */}
            <div className="space-y-2">
              <Label htmlFor="studio" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Studio Name
              </Label>
              <Input
                id="studio"
                placeholder="Studio name"
                value={formData.studio}
                onChange={(e) => updateField("studio", e.target.value)}
                className="bg-background/50 border-border"
              />
            </div>

            {/* Artist Name */}
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Artist/Piercer Name
              </Label>
              <Input
                id="artist"
                placeholder="Artist or piercer name"
                value={formData.artist}
                onChange={(e) => updateField("artist", e.target.value)}
                className="bg-background/50 border-border"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your tattoo/piercing..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="bg-background/50 border-border min-h-20"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid}
                className={cn(
                  "flex-1",
                  isFormValid && "bg-gradient-primary shadow-glow-primary"
                )}
              >
                Create Aftercare Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}