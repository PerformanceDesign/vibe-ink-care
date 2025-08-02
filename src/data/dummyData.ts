export interface Procedure {
  id: string;
  type: "tattoo" | "piercing";
  date: string;
  studio: string;
  artist: string;
  location: string;
  description: string;
  isPublic: boolean;
  userId: string;
  userName: string;
}

export interface AftercareStep {
  id: string;
  day: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
}

export const dummyProcedures: Procedure[] = [
  {
    id: "1",
    type: "tattoo",
    date: "2024-01-15",
    studio: "Ink Sanctuary",
    artist: "Marcus Rodriguez",
    location: "Right forearm",
    description: "A detailed dragon design in traditional Japanese style with cherry blossoms",
    isPublic: true,
    userId: "user1",
    userName: "TattooLover92"
  },
  {
    id: "2",
    type: "piercing",
    date: "2024-01-20",
    studio: "Steel & Silver",
    artist: "Sarah Chen",
    location: "Nose (nostril)",
    description: "Simple titanium stud, 18g",
    isPublic: true,
    userId: "user2",
    userName: "PiercingQueen"
  },
  {
    id: "3",
    type: "tattoo",
    date: "2024-01-25",
    studio: "Dark Arts Collective",
    artist: "Jordan Blake",
    location: "Left shoulder",
    description: "Geometric mandala with dotwork shading",
    isPublic: true,
    userId: "user3",
    userName: "GeometricSoul"
  },
  {
    id: "4",
    type: "piercing",
    date: "2024-01-28",
    studio: "Precision Piercing",
    artist: "Alex Turner",
    location: "Ear (helix)",
    description: "Double helix piercing with rose gold hoops",
    isPublic: false,
    userId: "user4",
    userName: "ModifiedLife"
  },
  {
    id: "5",
    type: "tattoo",
    date: "2024-02-01",
    studio: "Traditional Ink",
    artist: "Maria Santos",
    location: "Right thigh",
    description: "American traditional rose with banner reading 'Mom'",
    isPublic: true,
    userId: "user5",
    userName: "ClassicInk"
  }
];

export const generateAftercareSteps = (type: "tattoo" | "piercing", daysSince: number): AftercareStep[] => {
  if (type === "tattoo") {
    return [
      {
        id: "1",
        day: 1,
        title: "Initial Cleaning",
        description: "Gently wash with unscented antibacterial soap 2-3 times daily. Pat dry with clean paper towel.",
        completed: daysSince >= 1,
        important: true
      },
      {
        id: "2",
        day: 2,
        title: "Start Moisturizing",
        description: "Apply a thin layer of unscented lotion or tattoo aftercare cream. Avoid over-moisturizing.",
        completed: daysSince >= 2
      },
      {
        id: "3",
        day: 3,
        title: "Monitor Healing",
        description: "Check for signs of infection. Normal: slight redness, minimal swelling. Concerning: excessive heat, pus, spreading redness.",
        completed: daysSince >= 3,
        important: true
      },
      {
        id: "4",
        day: 5,
        title: "Scabbing Phase",
        description: "Scabs may start forming. DO NOT pick or scratch. Continue gentle cleaning and moisturizing.",
        completed: daysSince >= 5
      },
      {
        id: "5",
        day: 7,
        title: "Peeling Begins",
        description: "Skin may start peeling like a sunburn. This is normal. Continue gentle care routine.",
        completed: daysSince >= 7
      },
      {
        id: "6",
        day: 14,
        title: "Surface Healing",
        description: "Surface should be mostly healed. Continue moisturizing. Avoid sun exposure and soaking.",
        completed: daysSince >= 14
      },
      {
        id: "7",
        day: 30,
        title: "Deep Healing Complete",
        description: "Tattoo should be fully healed on the surface. Continue protecting from sun. You can now swim and exercise normally.",
        completed: daysSince >= 30
      }
    ];
  } else {
    return [
      {
        id: "1",
        day: 1,
        title: "Initial Care",
        description: "Clean with sterile saline solution 1-2 times daily. Do not rotate or move jewelry unnecessarily.",
        completed: daysSince >= 1,
        important: true
      },
      {
        id: "2",
        day: 3,
        title: "Gentle Cleaning Routine",
        description: "Continue saline cleaning. Avoid harsh soaps, alcohol, or hydrogen peroxide. Pat dry gently.",
        completed: daysSince >= 3
      },
      {
        id: "3",
        day: 7,
        title: "Monitor for Issues",
        description: "Watch for signs of rejection or infection. Normal: slight tenderness, minimal clear discharge.",
        completed: daysSince >= 7,
        important: true
      },
      {
        id: "4",
        day: 14,
        title: "Avoid Trauma",
        description: "Protect piercing from being bumped or caught. Sleep on the opposite side if possible.",
        completed: daysSince >= 14
      },
      {
        id: "5",
        day: 30,
        title: "Healing Progress",
        description: "Continue daily cleaning. Swelling should be significantly reduced. Avoid changing jewelry yet.",
        completed: daysSince >= 30
      },
      {
        id: "6",
        day: 60,
        title: "Stable Healing",
        description: "Piercing should feel more stable. Continue gentle care. Still avoid unnecessary jewelry changes.",
        completed: daysSince >= 60
      },
      {
        id: "7",
        day: 90,
        title: "Near Complete Healing",
        description: "Most piercings are well-healed by now. You may be able to change jewelry, but be gentle.",
        completed: daysSince >= 90
      }
    ];
  }
};