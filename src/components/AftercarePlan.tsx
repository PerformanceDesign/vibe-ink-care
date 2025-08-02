import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, Droplets, Shield, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface AftercareStep {
  id: string;
  day: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
}

interface AftercarePlanProps {
  type: "tattoo" | "piercing";
  daysSinceDate: number;
  steps: AftercareStep[];
}

export function AftercarePlan({ type, daysSinceDate, steps }: AftercarePlanProps) {
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  
  const getPhase = (days: number, type: string) => {
    if (type === "tattoo") {
      if (days <= 3) return "Initial Healing";
      if (days <= 14) return "Scabbing Phase";
      if (days <= 30) return "Surface Healing";
      return "Deep Healing";
    } else {
      if (days <= 14) return "Initial Care";
      if (days <= 60) return "Active Healing";
      if (days <= 180) return "Stabilizing";
      return "Fully Healed";
    }
  };

  const currentPhase = getPhase(daysSinceDate, type);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-dark border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                type === "tattoo" ? "bg-primary" : "bg-accent"
              )} />
              {type === "tattoo" ? "Tattoo" : "Piercing"} Aftercare
            </CardTitle>
            <Badge variant="outline" className="border-primary/20 text-primary">
              Day {daysSinceDate}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-2">
              <div className={cn(
                "px-2 py-1 rounded-md text-xs font-medium",
                type === "tattoo" 
                  ? "bg-primary/20 text-primary" 
                  : "bg-accent/20 text-accent"
              )}>
                {currentPhase}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-dark border-border">
          <CardContent className="p-4 text-center">
            <Droplets className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Keep Clean</h3>
            <p className="text-xs text-muted-foreground">Gentle daily cleaning</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-dark border-border">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Protect</h3>
            <p className="text-xs text-muted-foreground">Avoid trauma & friction</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-dark border-border">
          <CardContent className="p-4 text-center">
            <Sun className="h-8 w-8 text-destructive mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Sun Protection</h3>
            <p className="text-xs text-muted-foreground">Avoid direct exposure</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Steps */}
      <Card className="bg-gradient-dark border-border shadow-card">
        <CardHeader>
          <CardTitle>Daily Care Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-all",
                step.completed 
                  ? "bg-primary/10 border border-primary/20" 
                  : "bg-muted/5 border border-border",
                step.important && "ring-1 ring-destructive/50"
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : step.important ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    Day {step.day}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}