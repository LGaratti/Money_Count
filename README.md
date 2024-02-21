# Money Count

Money Count is a comprehensive financial tracking web application that empowers users to effortlessly manage their income and expenditures. Utilizing the robustness of React and the flexibility of Chakra UI, integrated with the precision of TypeScript, this application is developed with Vite to expedite the development process. Backed by Supabase for database interactions and authentication, Money Count is designed for secure and scalable user experiences.

## Features

- **Transaction Management**: Log and categorize financial transactions, with a quick overview of recent activities.
- **Visual Analytics**: Employing Recharts for a detailed graphical representation of financial data, offering insights at a glance.
- **Responsive Design**: Thanks to Chakra UI, the interface adapts seamlessly across different devices and screen sizes.
- **Interactive Calendar**: React Calendar is used to select and navigate through dates for better tracking of transactions.
- **Form Handling**: Implements React Hook Form for optimized form state management, providing an intuitive and efficient user input experience.

## Technologies

- **Frontend**: React.js, Chakra UI, TypeScript
- **Development**: Vite, Yarn
- **Backend**: Supabase
- **Deployment**: Vercel (Note: A public demo is not available at the moment)

## Prerequisites

Ensure the following tools are installed on your system:

- Node.js (LTS version)
- Yarn package manager

## Local Development

Follow these steps to get your development environment set up:

1. Clone the repository:
   ```sh
   git clone https://github.com/LGaratti/Money_Count.git
   ```

2. Change to the project directory:
   ```sh
   cd money-count
   ```

3. Install dependencies:
   ```sh
   yarn
   ```

4. Start the development server with Vite:
   ```sh
   npx vite
   ```

5. The application will be running on [http://localhost:5173](http://localhost:5173).

## Environment Configuration

Create a `.env.local` file at the project root and populate it with your Supabase credentials:

```sh
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

Money Count is configured for deployment with Vercel. To deploy, push the repository to GitHub and connect it with Vercel for seamless CI/CD.

## Acknowledgements

- [Vite](https://vitejs.dev/): Frontend tooling for the modern web.
- [React](https://reactjs.org/): Building user interfaces with component-based architecture.
- [Chakra UI](https://chakra-ui.com/): Accessible components for a delightful design system.
- [Recharts](http://recharts.org/): Composable charting library built on React components.
- [React Hook Form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
- [React Calendar](https://www.npmjs.com/package/react-calendar): A modular and customizable calendar component for React.
- [Supabase](https://supabase.io/): Open-source Firebase alternative providing database and authentication solutions.
- [Vercel](https://vercel.com/): Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.
