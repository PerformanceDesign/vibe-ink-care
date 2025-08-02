import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { ProcedureCard } from "@/components/ProcedureCard";
import { AftercarePlan } from "@/components/AftercarePlan";
import { AddProcedureForm } from "@/components/AddProcedureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, TrendingUp, Users, Calendar } from "lucide-react";
import { dummyProcedures, generateAftercareSteps, type Procedure } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [userProcedures, setUserProcedures] = useState<Procedure[]>([
    {
      id: "my1",
      type: "tattoo",
      date: "2024-01-30",
      studio: "My Local Studio",
      artist: "Jane Doe",
      location: "Left wrist",
      description: "Small minimalist rose",
      isPublic: false,
      userId: "currentUser",
      userName: "Me"
    }
  ]);

  const handleAddProcedure = (formData: any) => {
    const newProcedure: Procedure = {
      id: `my${userProcedures.length + 1}`,
      type: formData.type as "tattoo" | "piercing",
      date: formData.date,
      studio: formData.studio || "Unknown Studio",
      artist: formData.artist || "Unknown Artist",
      location: formData.location,
      description: formData.description || "",
      isPublic: false,
      userId: "currentUser",
      userName: "Me"
    };
    
    setUserProcedures(prev => [newProcedure, ...prev]);
    setShowAddForm(false);
    setSelectedProcedure(newProcedure.id);
  };

  const calculateDaysSince = (date: string) => {
    const procedureDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - procedureDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderHome = () => (
    <div className="space-y-6 pb-20">
      {/* Welcome Header */}
      <div className="bg-gradient-dark rounded-lg p-6 shadow-card">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Track your healing journey and care for your art</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{userProcedures.length}</div>
            <div className="text-xs text-muted-foreground">Procedures</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {userProcedures.filter(p => calculateDaysSince(p.date) <= 30).length}
            </div>
            <div className="text-xs text-muted-foreground">Healing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue">
              {userProcedures.filter(p => p.isPublic).length}
            </div>
            <div className="text-xs text-muted-foreground">Shared</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => setShowAddForm(true)}
          className="h-20 bg-gradient-primary shadow-glow-primary hover:shadow-glow-primary/80 transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add New</span>
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveTab("explore")}
          className="h-20 border-accent/20 hover:bg-accent/10"
        >
          <div className="flex flex-col items-center gap-2">
            <Search className="h-6 w-6" />
            <span className="text-sm font-medium">Explore</span>
          </div>
        </Button>
      </div>

      {/* My Procedures */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Procedures</h2>
          <Badge variant="outline" className="border-primary/20 text-primary">
            {userProcedures.length} total
          </Badge>
        </div>
        {userProcedures.length === 0 ? (
          <Card className="bg-gradient-dark border-border">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold mb-2">No procedures yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first tattoo or piercing to start tracking your aftercare journey
              </p>
              <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Procedure
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userProcedures.map((procedure) => (
              <ProcedureCard
                key={procedure.id}
                {...procedure}
                onViewDetails={setSelectedProcedure}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderExplore = () => (
    <div className="space-y-6 pb-20">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Explore Community</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tattoos and piercings..."
            className="pl-10 bg-background/50 border-border"
          />
        </div>
      </div>

      {/* Trending */}
      <Card className="bg-gradient-dark border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Trending Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="border-primary/20 text-primary">#TraditionalTattoo</Badge>
            <Badge variant="outline" className="border-accent/20 text-accent">#HelixPiercing</Badge>
            <Badge variant="outline" className="border-primary/20 text-primary">#MinimalistInk</Badge>
            <Badge variant="outline" className="border-accent/20 text-accent">#NostrilPiercing</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Community Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Feed
        </h2>
        {dummyProcedures.filter(p => p.isPublic).map((procedure) => (
          <ProcedureCard
            key={procedure.id}
            {...procedure}
            onViewDetails={setSelectedProcedure}
          />
        ))}
      </div>
    </div>
  );

  const renderAdd = () => (
    <div className="pb-20">
      <AddProcedureForm
        onSubmit={handleAddProcedure}
        onCancel={() => setActiveTab("home")}
      />
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 pb-20">
      <Card className="bg-gradient-dark border-border shadow-card">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              U
            </div>
            <h2 className="text-xl font-semibold mb-2">User Profile</h2>
            <p className="text-muted-foreground">Your aftercare journey tracker</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-semibold">{userProcedures.length}</div>
              <div className="text-sm text-muted-foreground">Procedures</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {userProcedures.filter(p => calculateDaysSince(p.date) <= 30).length}
              </div>
              <div className="text-sm text-muted-foreground">Currently Healing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAftercareDetails = () => {
    const procedure = [...userProcedures, ...dummyProcedures].find(p => p.id === selectedProcedure);
    if (!procedure) return null;

    const daysSince = calculateDaysSince(procedure.date);
    const steps = generateAftercareSteps(procedure.type, daysSince);

    return (
      <div className="pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedProcedure(null)}
            className="px-2"
          >
            ← Back
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{procedure.location}</h1>
            <p className="text-sm text-muted-foreground">{procedure.studio}</p>
          </div>
        </div>
        
        <AftercarePlan
          type={procedure.type}
          daysSinceDate={daysSince}
          steps={steps}
        />
      </div>
    );
  };

  if (selectedProcedure) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {renderAftercareDetails()}
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {renderAdd()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {activeTab === "home" && renderHome()}
        {activeTab === "explore" && renderExplore()}
        {activeTab === "add" && renderAdd()}
        {activeTab === "profile" && renderProfile()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;