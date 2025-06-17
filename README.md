# SkinBB Web Industry

A modern web application built with React, TypeScript, and Vite, featuring a robust component library and best practices for web development.

## 🛠️ Technology Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**:
  - Radix UI
  - Headless Tree
  - Heroicons
  - Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router
- **Code Quality**:
  - ESLint
  - Prettier
  - TypeScript

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd skinbb-web-industry
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Project Architecture

### Components

The project follows a modular component architecture:

- Reusable UI components in `src/components`
- Feature-specific components in `src/features`
- Layout components in `src/layouts`

### State Management

- React Context for global state management
- Custom hooks for reusable state logic

### Routing

- React Router for navigation
- Route definitions in `src/routes`

### Styling

- Tailwind CSS for utility-first styling
- Custom styles in `src/styles`

## 🔧 Development Guidelines

1. **TypeScript**

   - Use strict type checking
   - Define types in `src/types`
   - Avoid using `any` type

2. **Component Structure**

   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Follow atomic design principles

3. **Code Style**

   - Follow ESLint rules
   - Use Prettier for formatting
   - Write meaningful comments

4. **Performance**
   - Use React.memo for expensive components
   - Implement proper code splitting
   - Optimize bundle size

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
