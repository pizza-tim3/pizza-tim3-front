export const events = [
  {
    id: 1,
    user_id: 4,
    inviteOnly: true,
    name: "Joes Bday!",
    location: {
      name: "Pizza Joint",
    },
    event_date: "2019-03-14 13:18:54",
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
  },
  {
    id: 2,
    user_id: 6,
    inviteOnly: true,
    name: "Loris nameday!",
    location: {
      name: "Pete`s Pizza",
    },
    event_date: "2019-07-30 18:18:54",
    attending_users: [
      {
        user_id: 23,
        name: "Lori",
      },
      {
        user_id: 77,
        name: "Ana",
      },
      {
        user_id: 55,
        name: "Carole",
      },
    ],
  },
  {
    id: 3,
    user_id: 4,
    inviteOnly: true,
    name: "Petes Graduation!",
    location: {
      name: "Guiseppe`s Pizza",
    },
    event_date: "2019-12-30 16:18:54",
    attending_users: [
      {
        user_id: 2,
        name: "Stew",
      },
      {
        user_id: 7,
        name: "Pete",
      },
      {
        user_id: 14,
        name: "Teri",
      },
      {
        user_id: 19,
        name: "Chuck",
      },
    ],
  },
];

export default events;
