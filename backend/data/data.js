const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Emily",
        email: "emily@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b123e18c25468bc7d4ee4",
    chatName: "Emily",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b124e4081150716472c79",
    chatName: "Project Team",
    groupAdmin: {
      name: "Alice",
      email: "alice@example.com",
    },
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Jake",
        email: "jake@example.com",
      },
      {
        name: "Sarah",
        email: "sarah@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "Mia",
        email: "mia@example.com",
      },
    ],
    _id: "617b125e4081150016472c80",
    chatName: "Study Group",
    groupAdmin: {
      name: "Jake",
      email: "jake@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Liam",
        email: "liam@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b126e18c25468bc7d4ff4",
    chatName: "Liam",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Sophia",
        email: "sophia@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "David",
        email: "david@example.com",
      },
      {
        name: "Ella",
        email: "ella@example.com",
      },
    ],
    _id: "617b127e4081150716472c81",
    chatName: "Book Club",
    groupAdmin: {
      name: "Sophia",
      email: "sophia@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Olivia",
        email: "olivia@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b128e18c25468bc7d5004",
    chatName: "Olivia",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Mason",
        email: "mason@example.com",
      },
      {
        name: "Ethan",
        email: "ethan@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b129e4081150016472c82",
    chatName: "Gaming Squad",
    groupAdmin: {
      name: "Mason",
      email: "mason@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Ava",
        email: "ava@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b130e18c25468bc7d5114",
    chatName: "Ava",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Charlotte",
        email: "charlotte@example.com",
      },
      {
        name: "James",
        email: "james@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "Lucas",
        email: "lucas@example.com",
      },
    ],
    _id: "617b131e4081150716472c83",
    chatName: "Music Lovers",
    groupAdmin: {
      name: "Charlotte",
      email: "charlotte@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Noah",
        email: "noah@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b132e18c25468bc7d5224",
    chatName: "Noah",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Amelia",
        email: "amelia@example.com",
      },
      {
        name: "Harper",
        email: "harper@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
      {
        name: "Ella",
        email: "ella@example.com",
      },
    ],
    _id: "617b133e4081150016472c84",
    chatName: "Fitness Group",
    groupAdmin: {
      name: "Amelia",
      email: "amelia@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Isabella",
        email: "isabella@example.com",
      },
      {
        name: "myntrauser",
        email: "myntrauser@example.com",
      },
    ],
    _id: "617b134e18c25468bc7d5334",
    chatName: "Isabella",
  },
];

module.exports = {chats};