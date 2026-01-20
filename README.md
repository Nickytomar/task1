<!-- User List App (React Native)
📌 Objective

The goal of this task is to demonstrate proficiency in React Native, JavaScript fundamentals, API integration, pagination, and navigation by building a basic User List application.

🛠 Tech Stack

React Native (Expo)

React Navigation

Fetch API

FlatList

React Hooks (useState, useEffect)

✨ Features Implemented
✅ User List

Fetches users from:

https://jsonplaceholder.typicode.com/users


Displays users using FlatList for optimized performance.

Each page loads 5 users at a time.

✅ Pagination (Infinite Scroll)

Pagination implemented using _page and _limit query parameters.

Additional users are loaded automatically when the user scrolls to the bottom.

✅ Search Functionality

Search input filters users by name.

Case-insensitive filtering for better UX.

✅ User Detail Screen

On selecting a user, the app navigates to a detail screen displaying:

Name

Email

Phone Number

Address (Street & City)

✅ Navigation

Implemented using React Navigation Stack.

Clean separation between list and detail screens.

✅ Loading & Error Handling

Activity indicator shown while fetching data.

Error messages displayed if API request fails.

🌟 Bonus Features

Pull-to-refresh to reload user list from the first page.

Modular code structure with separation of concerns.


▶️ How to Run the App
Using Expo / Snack

Open the project in Snack (snack.expo.dev) or locally using Expo CLI.

Install dependencies.

Run the app on Android or iOS emulator/device.

⚠️ Note: Web preview may have limitations due to API and navigation constraints.

🧠 Implementation Notes

Pagination is guarded to prevent multiple API calls.

API logic is isolated in a service file for reusability.

UI logic and data logic are kept separate for better readability and maintenance.

The app is easily extendable to include Redux or TypeScript if required.

👨‍💻 Author

Nicky Tomar
React Native Developer
3.5+ years of experience in mobile app development -->