# Money Count
![Main Menu Preview](https://github.com/LGaratti/Money_Count/blob/main/public/moneycount-dashboard.png)

Money Count is a comprehensive financial tracking web application that empowers users to effortlessly manage their income and expenditures. Built with the modern capabilities of React, Chakra UI, and TypeScript, this application employs Vite for an accelerated development lifecycle. It leverages Supabase for robust database interactions and secure authentication.

## Features

- **Transaction Management**: Easily log and categorize financial transactions and get a snapshot of recent activities.
- **Visual Analytics**: Use Recharts for rendering detailed graphs and charts that provide insightful financial analytics.
- **Internationalization**: Utilizing react-i18next for internationalization, enabling multi-language support.
- **Interactive Calendar**: Incorporates React Calendar for date selection, enabling users to track their transactions effectively.
- **Form Management**: Utilizes React Hook Form to streamline form handling with efficient user input validation.
- **Theme Customization**: Offers theme personalization capabilities, allowing users to choose and customize the Chakra UI theme to their preference.
- **Dark and Light Modes**: Supports a toggle between dark and light modes, catering to user comfort and accessibility.

## Technologies

- **Frontend**: React.js, Chakra UI, TypeScript, Recharts, React Hook Form, React Calendar
- **Development**: Vite, Yarn
- **Backend**: Supabase
- **Deployment**: Vercel

## Prerequisites

To run this project, you will need:

- Node.js (LTS version)
- Yarn package manager

## Local Development

To set up the project on your local machine:

1. Clone the repository:
   ```sh
   git clone https://github.com/LGaratti/Money_Count.git
   ```

2. Enter the project directory:
   ```sh
   cd money-count
   ```

3. Install the necessary dependencies:
   ```sh
   yarn
   ```

4. Launch the development server with Vite:
   ```sh
   npx vite
   ```

5. Access the application at [http://localhost:5173](http://localhost:5173).

## Environment Configuration

Set up your environment variables by creating a `.env.local` file at the root of the project with the following contents:

```sh
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

Money Count is prepared for deployment on Vercel. Simply push your code to GitHub and set up a project on Vercel for continuous deployment.

## Acknowledgements

This project makes use of some remarkable open-source software:

- [Vite](https://vitejs.dev/): Enhanced tooling for front-end development.
- [React](https://reactjs.org/): A library for crafting dynamic user interfaces.
- [Chakra UI](https://chakra-ui.com/): A component library for creating accessible and beautiful UIs.
- [Recharts](http://recharts.org/): A charting library built with React components.
- [React Hook Form](https://react-hook-form.com/): Efficient form management for React.
- [React Calendar](https://www.npmjs.com/package/react-calendar): Flexible calendar component for React.
- [Supabase](https://supabase.io/): An open-source alternative to Firebase.
- [Vercel](https://vercel.com/): A platform for automating front-end deployments.

## License

Money Count is distributed under the MIT License.
