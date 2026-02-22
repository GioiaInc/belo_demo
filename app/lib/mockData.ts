export interface Contact {
  id: string;
  name: string;
  avatar: string;
  mood: "neutral" | "warm" | "tense" | "excited";
  lastMessage: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "contact";
  timestamp: string;
  mood: number; // 0 = tense/cold, 0.5 = neutral, 1 = warm/positive
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
// DEMO CHAT FLOW
// =============================================

// Old messages shown on load (filler context — "yesterday")
export const chatHistory: Message[] = [
  {
    id: "h1",
    text: "Are we still on for Friday?",
    sender: "user",
    timestamp: "Yesterday",
    mood: 0.6,
  },
  {
    id: "h2",
    text: "Yeah should be good",
    sender: "contact",
    timestamp: "Yesterday",
    mood: 0.6,
  },
  {
    id: "h3",
    text: "Cool, see you then",
    sender: "user",
    timestamp: "Yesterday",
    mood: 0.65,
  },
];

// The scripted demo flow:
// Step 0: chatHistory is shown. Then Saeed sends first message.
// Step 1: Saeed sends "Hey, are you coming tonight?" (auto, after delay)
// Step 2: User types & sends "No" → mood dips
// Step 3: Saeed sends "Is everything alright?" (auto, after typing indicator)
// Step 4: User types & sends "Idk to be honest." → mood drops further
// Step 5: Saeed sends supportive message → mood warms back up

export const demoScript: Message[] = [
  {
    id: "d1",
    text: "Hey, are you coming tonight?",
    sender: "contact",
    timestamp: "5:52 PM",
    mood: 0.5,
  },
  {
    id: "d2",
    text: "No",          // user types this
    sender: "user",
    timestamp: "5:53 PM",
    mood: 0.35,
  },
  {
    id: "d3",
    text: "Is everything alright?",
    sender: "contact",
    timestamp: "5:54 PM",
    mood: 0.3,
  },
  {
    id: "d4",
    text: "Idk to be honest.",  // user types this
    sender: "user",
    timestamp: "5:56 PM",
    mood: 0.2,
  },
  {
    id: "d5",
    text: "Hey, I'm here for you. Whatever it is, we can talk about it",
    sender: "contact",
    timestamp: "5:57 PM",
    mood: 0.55,
  },
];

// Mood to color palette mapping for chat background
export const moodPalettes = {
  getColors(mood: number): { primary: string; secondary: string; accent: string; cloudOpacity: number } {
    if (mood < 0.25) {
      return {
        primary: "#0d0521",
        secondary: "#1a1035",
        accent: "#2a1a4a",
        cloudOpacity: 0.7,
      };
    } else if (mood < 0.45) {
      return {
        primary: "#150a2e",
        secondary: "#251545",
        accent: "#3d2566",
        cloudOpacity: 0.5,
      };
    } else if (mood < 0.6) {
      return {
        primary: "#1a0a2e",
        secondary: "#2d1b4e",
        accent: "#5b3a8c",
        cloudOpacity: 0.3,
      };
    } else if (mood < 0.8) {
      return {
        primary: "#1f0a2e",
        secondary: "#3d1b4e",
        accent: "#8b4a8c",
        cloudOpacity: 0.35,
      };
    } else {
      return {
        primary: "#250a2e",
        secondary: "#4e1b4a",
        accent: "#a855a0",
        cloudOpacity: 0.4,
      };
    }
  },
};
