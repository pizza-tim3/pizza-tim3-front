export const events = [
  {
    id: 1,
    user_id: 4,
    inviteOnly: true,
    name: "Joes Bday!",
    location: {
      name: "5 Slices Guys",
      address: "143 Main st, Rockville, MD 20853",
    },
    event_date: new Date(),
    attending_users: [
      {
        user_id: 13,
        name: "Joe",
        pending: false,
      },
      {
        user_id: 2,
        name: "Stew",
        pending: true,
      },
      {
        user_id: 7,
        name: "Pete",
        pending: false,
      },
      {
        user_id: 14,
        name: "Teri",
        pending: true,
      },
    ],
    comments: [
      { user_id: 3, comment: "This is a greate place" },
      { user_id: 15, comment: "Boy, oh boy" },
    ],
  },
  {
    id: 2,
    user_id: 6,
    inviteOnly: true,
    name: "Loris nameday!",
    location: {
      name: "Pete`s Pizza",
      address: "143 Main st, Rockville, MD 20853",
    },
    event_date: new Date(),
    attending_users: [
      {
        user_id: 23,
        name: "Lori",
        pending: false,
      },
      {
        user_id: 77,
        name: "Ana",
        pending: true,
      },
      {
        user_id: 55,
        name: "Carole",
        pending: false,
      },
    ],
    comments: [
      { user_id: 6, comment: "This is a not bad" },
      { user_id: 35, comment: "can not wait" },
    ],
  },
  {
    id: 3,
    user_id: 4,
    inviteOnly: true,
    name: "Petes Graduation!",
    location: {
      name: "Guiseppe`s Pizza",
      address: "143 Main st, Rockville, MD 20853",
    },
    event_date: new Date(),
    attending_users: [
      {
        user_id: 2,
        name: "Stew",
        pending: true,
        logo: "",
      },
      {
        user_id: 7,
        name: "Pete",
        pending: true,
        logo: "",
      },
      {
        user_id: 14,
        name: "Teri",
        pending: true,
        logo: "",
      },
      {
        user_id: 19,
        name: "Chuck",
        pending: true,
        logo: "",
      },
    ],
    comments: [
      { user_id: 3, comment: "This is a greate place" },
      { user_id: 15, comment: "Boy, oh boy" },
    ],
  },
];

export default events;
