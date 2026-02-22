export interface Contact {
  id: string;
  name: string;
  avatar: string;
  mood: "neutral" | "warm" | "tense" | "excited";
  lastMessage: string;
}

export interface Insight {
  mood: string;       // e.g. "withdrawn", "warm", "distressed"
  signals: string[];  // e.g. ["short response", "deflection", "negative tone"]
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "contact";
  timestamp: string;
  mood: number; // 0 = tense/cold, 0.5 = neutral, 1 = warm/positive
  insight?: Insight;
}

// Outer ring: clockwise from top — Person 2, 3, 6, 5, 4, 1
export const outerRingContacts: Contact[] = [
  {
    id: "person2",
    name: "Saeed",
    avatar: "/avatars-figma/Person 2 (2).png",
    mood: "neutral",
    lastMessage: "Idk to be honest.",
  },
  {
    id: "person3",
    name: "Timur",
    avatar: "/avatars-figma/Person 3.png",
    mood: "tense",
    lastMessage: "We need to talk",
  },
  {
    id: "person6",
    name: "Leila",
    avatar: "/avatars-figma/Person 6 (1).png",
    mood: "warm",
    lastMessage: "Haha exactly",
  },
  {
    id: "person5",
    name: "Zarina",
    avatar: "/avatars-figma/Person 5.png",
    mood: "tense",
    lastMessage: "...",
  },
  {
    id: "person4",
    name: "Bekzat",
    avatar: "/avatars-figma/Person 4.png",
    mood: "excited",
    lastMessage: "Can't wait!",
  },
  {
    id: "person1",
    name: "Aisha",
    avatar: "/avatars-figma/Person 1.png",
    mood: "warm",
    lastMessage: "See you tomorrow!",
  },
];

// Center group
export const centerGroup = {
  id: "group227",
  avatar: "/avatars-figma/Group 227.png",
};

// User's own avatar (bottom-left)
export const userAvatar = {
  id: "user",
  avatar: "/avatars-figma/Group 175 (1).png",
};

// =============================================
// DEMO CHAT FLOW — wider emotional arc
// =============================================

// Baseline insight — explains the warm opening mood from yesterday's messages
export const baselineInsight: Insight = {
  mood: "warm",
  signals: ["playful tone", "shared excitement", "positive recall"],
};

// Yesterday messages — warm, friends vibing
export const chatHistory: Message[] = [
  {
    id: "h1",
    text: "Last night was so fun haha",
    sender: "contact",
    timestamp: "Yesterday",
    mood: 0.85,
  },
  {
    id: "h2",
    text: "Literally the best time",
    sender: "user",
    timestamp: "Yesterday",
    mood: 0.9,
  },
  {
    id: "h3",
    text: "We gotta do that again soon",
    sender: "contact",
    timestamp: "Yesterday",
    mood: 0.85,
  },
];

// The scripted demo flow — bright start → emotional dip → warm recovery
// Step 0: chatHistory shown (mood ~0.85). Then Saeed sends first message.
// Step 1: Saeed: warm invite (0.75)
// Step 2: User: "Maybe" — slight pullback (0.5)
// Step 3: Saeed: still upbeat (0.55)
// Step 4: User: opens up about feeling off (0.28)
// Step 5: Saeed: concern (0.2)
// Step 6: User: tries to shut down (0.12) — darkest point
// Step 7: Saeed: shows up for him (0.65) — warm recovery

export const demoScript: Message[] = [
  {
    id: "d1",
    text: "Heyy we're all going out tonight, you coming?",
    sender: "contact",
    timestamp: "5:52 PM",
    mood: 0.75,
  },
  {
    id: "d2",
    text: "Maybe",
    sender: "user",
    timestamp: "5:53 PM",
    mood: 0.5,
    insight: {
      mood: "withdrawn",
      signals: ["one-word reply", "non-committal tone"],
    },
  },
  {
    id: "d3",
    text: "Come on it'll be fun",
    sender: "contact",
    timestamp: "5:54 PM",
    mood: 0.55,
  },
  {
    id: "d4",
    text: "I've just been feeling off lately",
    sender: "user",
    timestamp: "5:56 PM",
    mood: 0.28,
    insight: {
      mood: "low",
      signals: ["emotional disclosure", "negative sentiment", "vague language"],
    },
  },
  {
    id: "d5",
    text: "Wait what's going on? Talk to me",
    sender: "contact",
    timestamp: "5:57 PM",
    mood: 0.2,
  },
  {
    id: "d6",
    text: "It's nothing, forget it",
    sender: "user",
    timestamp: "5:59 PM",
    mood: 0.12,
    insight: {
      mood: "distressed",
      signals: ["dismissive language", "emotional shutdown", "deflection"],
    },
  },
  {
    id: "d7",
    text: "Hey. You're not alone in this. I'm coming over.",
    sender: "contact",
    timestamp: "6:00 PM",
    mood: 0.65,
    insight: {
      mood: "supportive",
      signals: ["empathetic language", "commitment", "reassurance"],
    },
  },
];

// =============================================
// MOOD → COLOR PALETTE
// =============================================
// 0.7+ : Warm — orange, amber, rose glow
// 0.5-0.7 : Neutral warm — mauve, soft peach
// 0.3-0.5 : Cool — teal, slate blue
// 0.18-0.3 : Cold — deep navy, steel grey
// <0.18 : Darkest — near black, dense, oppressive
export const moodPalettes = {
  getColors(mood: number): {
    sky: string;
    cloudA: string;
    cloudB: string;
    cloudC: string;
    starOpacity: number;
    fogOpacity: number;
  } {
    if (mood < 0.18) {
      // Darkest — near black, heavy
      return {
        sky: "#020205",
        cloudA: "#0a0810",
        cloudB: "#080612",
        cloudC: "#0c0a15",
        starOpacity: 0.06,
        fogOpacity: 0.55,
      };
    } else if (mood < 0.3) {
      // Cold — deep steel-blue
      return {
        sky: "#050812",
        cloudA: "#0e1828",
        cloudB: "#121e30",
        cloudC: "#0a1520",
        starOpacity: 0.15,
        fogOpacity: 0.45,
      };
    } else if (mood < 0.5) {
      // Cool — teal-indigo, transitional
      return {
        sky: "#0a0e1a",
        cloudA: "#1a2840",
        cloudB: "#182535",
        cloudC: "#1e3045",
        starOpacity: 0.3,
        fogOpacity: 0.35,
      };
    } else if (mood < 0.7) {
      // Neutral warm — mauve, peach hints
      return {
        sky: "#140e1e",
        cloudA: "#3a2040",
        cloudB: "#452838",
        cloudC: "#4a2545",
        starOpacity: 0.4,
        fogOpacity: 0.3,
      };
    } else {
      // Warm — deep rose-purple sky with amber/orange cloud accents
      return {
        sky: "#1a0e18",
        cloudA: "#7a3050",
        cloudB: "#904838",
        cloudC: "#6a2848",
        starOpacity: 0.45,
        fogOpacity: 0.3,
      };
    }
  },
};
