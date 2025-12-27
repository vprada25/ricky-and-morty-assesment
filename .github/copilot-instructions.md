# Rick and Morty Character Explorer - Project Instructions

## Project Overview

React 18 application with TypeScript for exploring Rick and Morty characters using **Hexagonal Architecture** (Ports & Adapters pattern). This is a production-ready application demonstrating modern React development with clean architecture principles.

## Project Status

✅ **COMPLETED** - All features implemented and fully tested (112 unit tests passing).

## Tech Stack

### Core

- **React 18.3** with TypeScript 5.6 (strict mode)
- **Vite 6.0** as build tool and dev server
- **React Router DOM 7** for client-side routing

### State & Data

- **Zustand 5.0** for state management (lightweight, no boilerplate)
- **Apollo Client 3.11** for GraphQL data fetching
- **GraphQL** for API communication

### Styling

- **TailwindCSS 3.4** utility-first CSS framework
- **PostCSS** for CSS processing
- Custom design system with defined color palette

### Testing

- **Vitest 2.1** as test runner (Vite-native, fast)
- **React Testing Library 16.1** for component testing
- **@testing-library/user-event** for user interaction simulation
- **112 comprehensive unit tests** across all layers

### Code Quality

- **ESLint 9** for linting
- **TypeScript strict mode** for maximum type safety
- **Conventional Commits** for commit messages

## Architecture

### Hexagonal Architecture (Ports & Adapters)

The project strictly follows hexagonal architecture to achieve:

- ✅ **Technology independence** - Business logic doesn't depend on frameworks
- ✅ **Testability** - Easy to mock and test each layer
- ✅ **Maintainability** - Clear separation of concerns
- ✅ **Flexibility** - Easy to swap implementations

### Layer Structure

```
┌─────────────────────────────────────────────────┐
│           Presentation Layer (UI)               │
│  Components, Hooks, Pages, Stores, Routes       │
│  - Atomic Design (Atoms → Molecules → Organisms)│
│  - Custom Hooks for logic separation            │
│  - Zustand stores for state management          │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│         Application Layer (Use Cases)           │
│  Business Logic, Use Case Orchestration         │
│  - CharacterUseCases (getCharacters, etc.)      │
│  - StorageUseCases (favorites, comments, etc.)  │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│          Domain Layer (Core Business)           │
│  Entities, Interfaces, Enums                    │
│  - Character entity                             │
│  - Repository interfaces (Ports)                │
│  - Storage interfaces (Ports)                   │
│  - Domain enums (Status, Gender, etc.)          │
└─────────────────────────────────────────────────┘
                        ↑
┌─────────────────────────────────────────────────┐
│      Infrastructure Layer (Adapters)            │
│  External Services, Implementations             │
│  - GraphQLCharacterRepository (API adapter)     │
│  - LocalStorageAdapter (Storage adapter)        │
│  - Apollo Client configuration                  │
│  - Factories for dependency injection           │
└─────────────────────────────────────────────────┘
```

**Key Principle**: Dependencies point INWARD. Domain layer has NO dependencies on outer layers.

## Project Structure

```
src/
├── domain/                          # 🎯 CORE - Business Logic (NO external dependencies)
│   ├── entities/
│   │   ├── Character.ts             # Character entity with business logic
│   │   └── enums.ts                # Status, Gender, SortOrder enums
│   ├── repositories/               # Ports (Interfaces)
│   │   └── CharacterRepository.ts  # Repository interface
│   └── ports/                      # Ports (Interfaces)
│       └── StoragePort.ts          # Storage interface
│
├── application/                     # 📋 USE CASES - Business Rules
│   └── useCases/
│       ├── CharacterUseCases.ts    # Character operations (getCharacters, etc.)
│       ├── CharacterUseCases.test.ts
│       ├── StorageUseCases.ts      # Storage operations (favorites, comments, delete)
│       └── StorageUseCases.test.ts
│
├── infrastructure/                  # 🔌 ADAPTERS - External Services
│   ├── graphql/
│   │   ├── apolloClient.ts        # Apollo Client setup
│   │   └── queries.ts             # GraphQL queries (GET_CHARACTERS, etc.)
│   ├── repositories/
│   │   └── GraphQLCharacterRepository.ts # API implementation
│   ├── storage/
│   │   └── LocalStorageAdapter.ts # LocalStorage implementation
│   └── factories/                  # Dependency Injection
│       ├── characterRepositoryFactory.ts
│       └── storageFactory.ts
│
└── presentation/                    # 🎨 UI - User Interface
    ├── components/                 # Atomic Design
    │   ├── atoms/                 # Basic: Button, Input, Badge, Loader
    │   ├── molecules/             # Composite: SearchBar, Pagination
    │   └── organisms/             # Complex: Header, FilterPanel, CharacterList
    ├── hooks/                     # Custom React Hooks
    │   ├── useCharacterData.ts   # Data fetching logic
    │   ├── useCharacterFilters.ts # Filter state management
    │   ├── useCharacterSelection.ts # Selection logic
    │   ├── useDebounce.ts        # Debounce utility
    │   └── useFilterDropdown.ts  # Dropdown state
    ├── pages/                     # Page components
    │   ├── HomePage/
    │   └── NotFoundPage/
    ├── store/                     # Zustand State Management
    │   ├── characterStore.ts     # Characters, filters, sorting
    │   ├── favoritesStore.ts     # Favorites with persistence
    │   ├── commentsStore.ts      # Comments with persistence
    │   ├── deletedCharactersStore.ts # Soft delete
    │   └── uiStore.ts            # UI state (mobile menu, etc.)
    ├── utils/
    │   └── filterBuilder.ts      # Builder pattern for filters
    ├── routes/
    │   └── index.tsx             # React Router configuration
    └── providers/
        └── RouterProvider.tsx    # Router setup
```

## Features Implemented

### Core Features ✅

- **Character Listing** with pagination (20 per page)
- **Advanced Filtering** (name, status, species, gender)
- **Alphabetical Sorting** (A-Z / Z-A)
- **Character Detail View** with full information
- **Favorites System** with LocalStorage persistence
- **Comments System** per character with persistence
- **Soft Delete** functionality (hide without permanent deletion)
- **Responsive Design** (Mobile First with breakpoints)
- **Error Handling** with user-friendly messages
- **Loading States** with skeleton loaders
- **Empty States** with helpful messages

### Technical Features ✅

- **Debounced Search** (500ms to reduce API calls)
- **Client-side Caching** (Apollo Client cache)
- **URL Query Params** for filter persistence
- **LocalStorage Persistence** (favorites, comments, deleted)
- **Type-safe API** with TypeScript interfaces
- **Comprehensive Testing** (112 unit tests)
- **Accessibility** (ARIA labels, semantic HTML, keyboard navigation)
- **Performance Optimization** (React.memo, debouncing, lazy loading)

## Design Patterns Used

### Architectural Patterns

1. **Hexagonal Architecture** - Clean separation of layers
2. **Repository Pattern** - Data access abstraction
3. **Factory Pattern** - Dependency injection (`characterRepositoryFactory`, `storageFactory`)
4. **Use Case Pattern** - Business logic encapsulation
5. **Builder Pattern** - Filter construction (`FilterBuilder`)
6. **Strategy Pattern** - Different filter parsers for each type
7. **Adapter Pattern** - `LocalStorageAdapter` implements `StoragePort`

### UI Patterns

1. **Atomic Design** - Component hierarchy (Atoms → Molecules → Organisms → Pages)
2. **Container/Presenter** - Hooks handle logic, components handle presentation
3. **Composition Pattern** - Small, reusable components
4. **Custom Hooks** - Logic reusability (`useDebounce`, `useCharacterData`, etc.)
5. **Observer Pattern** - Zustand stores with subscriptions

### State Management

1. **Store Separation** - Each store has single responsibility
2. **Persistence Pattern** - Zustand persist middleware for LocalStorage
3. **Derived State** - Computed values in stores

## SOLID Principles Applied

### Single Responsibility Principle (SRP)

- ✅ Each component has ONE reason to change
- ✅ `CharacterUseCases` - Only character operations
- ✅ `StorageUseCases` - Only storage operations
- ✅ Each hook has a specific purpose
- ✅ Separate stores for different concerns

### Open/Closed Principle (OCP)

- ✅ Repositories open for extension via interfaces
- ✅ Filter system extendable with new filter types
- ✅ Component composition allows extension without modification

### Liskov Substitution Principle (LSP)

- ✅ Any `CharacterRepository` implementation can replace another
- ✅ Any `StoragePort` implementation is interchangeable
- ✅ Components work with any valid props

### Interface Segregation Principle (ISP)

- ✅ Small, focused interfaces (ports)
- ✅ `CharacterRepository` - Only character operations
- ✅ `StoragePort` - Only storage operations
- ✅ Components receive only needed props

### Dependency Inversion Principle (DIP)

- ✅ Use cases depend on repository INTERFACES, not implementations
- ✅ Domain layer has NO dependencies on infrastructure
- ✅ Factories handle concrete implementations
- ✅ High-level modules don't depend on low-level modules

## Code Quality Standards

### TypeScript Usage

- ✅ **Strict Mode Enabled** - Maximum type safety
- ✅ **No `any` Types** - All types explicitly defined
- ✅ **Interface-First** - Interfaces for all contracts
- ✅ **Enum Usage** - For domain constants
- ✅ **Type Guards** - Runtime type checking where needed

### React Best Practices

- ✅ **Functional Components** - Modern React with hooks
- ✅ **Custom Hooks** - Reusable logic extraction
- ✅ **Props Typing** - All props have TypeScript interfaces
- ✅ **Default Props** - Sensible defaults where appropriate
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Lazy Loading** - Code splitting for routes
- ✅ **Memoization** - Prevent unnecessary re-renders

### Testing Standards

- ✅ **Unit Tests** - Test individual units in isolation
- ✅ **Integration Tests** - Test component interactions
- ✅ **User-Centric** - Test from user's perspective (React Testing Library)
- ✅ **Arrange-Act-Assert** - Clear test structure
- ✅ **Descriptive Names** - Tests document behavior
- ✅ **Mocking** - Mock external dependencies properly
- ✅ **Coverage** - Comprehensive coverage across all layers

### Code Style

- ✅ **Clean Code** - Self-documenting, readable
- ✅ **DRY** - Don't Repeat Yourself
- ✅ **KISS** - Keep It Simple, Stupid
- ✅ **YAGNI** - You Aren't Gonna Need It
- ✅ **Meaningful Names** - Variables, functions clearly named
- ✅ **Small Functions** - Single responsibility, < 20 lines
- ✅ **Comments** - Only when code can't be self-explanatory

## Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server at http://localhost:5173

# Building
npm run build            # Build for production (output: dist/)
npm run preview          # Preview production build locally

# Testing
npm run test             # Run all tests (112 tests)
npm run test -- --watch  # Run tests in watch mode
npm run test:ui          # Run tests with Vitest UI
npm run test:coverage    # Run tests with coverage report

# Code Quality
npm run lint             # Run ESLint to check code quality
```

## Development Guidelines

### When Adding New Features

Follow the **Hexagonal Architecture** flow:

1. **Start with Domain Layer**

   - Define entities if needed (`domain/entities/`)
   - Create interfaces (ports) if needed (`domain/repositories/` or `domain/ports/`)

2. **Application Layer**

   - Create use cases in `application/useCases/`
   - Write unit tests for use cases

3. **Infrastructure Layer**

   - Implement adapters in `infrastructure/`
   - Create factories for dependency injection

4. **Presentation Layer**

   - Build UI components following Atomic Design
   - Create custom hooks for logic separation
   - Add Zustand stores if needed
   - Write component tests

5. **Testing**
   - Write unit tests for all layers
   - Ensure tests follow user-centric approach
   - Maintain test coverage

### Component Creation Guidelines

**Atomic Design Hierarchy:**

1. **Atoms** (`components/atoms/`)

   - Single-purpose, reusable components
   - Examples: Button, Input, Badge, Loader
   - No business logic
   - Highly reusable

2. **Molecules** (`components/molecules/`)

   - Combination of atoms
   - Examples: SearchBar (Input + Button), Pagination
   - Minimal business logic
   - Reusable in different contexts

3. **Organisms** (`components/organisms/`)

   - Complex UI sections
   - Examples: Header, FilterPanel, CharacterList
   - Can contain business logic
   - Specific to application

4. **Templates** (`components/templates/`)

   - Page layouts
   - Examples: Layout (header + content + footer)
   - Structure without content

5. **Pages** (`pages/`)
   - Complete pages with data
   - Examples: HomePage, NotFoundPage
   - Connects everything together

### Custom Hooks Guidelines

Create custom hooks when:

- ✅ Logic is reusable across components
- ✅ Component logic becomes too complex
- ✅ Need to separate concerns
- ✅ Managing complex state

**Naming Convention**: `use[Feature][Action]`

- Examples: `useCharacterData`, `useDebounce`, `useFilterDropdown`

**Structure**:

```typescript
export const useCustomHook = () => {
  // 1. State declarations
  // 2. Effects
  // 3. Event handlers
  // 4. Return object with clear API
  return { data, loading, error, actions };
};
```

### Store (Zustand) Guidelines

**When to Create a Store**:

- ✅ State shared across multiple components
- ✅ State needs persistence (LocalStorage)
- ✅ Complex state management needed
- ✅ State needs to be accessed globally

**Store Structure**:

```typescript
interface StoreState {
  // State properties
  data: Type[];

  // Actions (methods)
  addItem: (item: Type) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      data: [],

      // Actions
      addItem: (item) =>
        set((state) => ({
          data: [...state.data, item],
        })),
      // ... more actions
    }),
    { name: "store-name" } // LocalStorage key
  )
);
```

### Testing Guidelines

**Test Structure** (Arrange-Act-Assert):

```typescript
describe("ComponentName", () => {
  it("should do something when condition", () => {
    // Arrange - Setup
    const props = {
      /* ... */
    };

    // Act - Execute
    render(<Component {...props} />);

    // Assert - Verify
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
```

**What to Test**:

- ✅ Component renders correctly with props
- ✅ User interactions (clicks, input changes)
- ✅ Conditional rendering
- ✅ Error states
- ✅ Loading states
- ✅ Hook behavior
- ✅ Use case logic

**What NOT to Test**:

- ❌ Implementation details
- ❌ Third-party library internals
- ❌ CSS styles (unless functional)

### Code Style Guidelines

**Naming Conventions**:

- **Components**: PascalCase (`CharacterList`)
- **Hooks**: camelCase with 'use' prefix (`useCharacterData`)
- **Utilities**: camelCase (`filterBuilder`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINT`)
- **Interfaces**: PascalCase with 'I' or descriptive name (`CharacterRepository`)
- **Enums**: PascalCase (`CharacterStatus`)

**File Organization**:

```
Component/
├── Component.tsx        # Component implementation
├── Component.test.tsx   # Component tests
├── index.ts            # Barrel export
└── types.ts            # Component-specific types (if complex)
```

**Import Order**:

1. React imports
2. Third-party imports
3. Domain/Application imports
4. Infrastructure imports
5. Presentation imports
6. Relative imports
7. Type imports

**Example**:

```typescript
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Character } from "@/domain/entities/Character";
import { CharacterUseCases } from "@/application/useCases/CharacterUseCases";

import { useCharacterStore } from "@/presentation/store/characterStore";
import { Button } from "../atoms/Button";

import type { CharacterProps } from "./types";
```

## Common Patterns & Examples

### Fetching Data Pattern

```typescript
// Custom hook for data fetching
const useCharacterData = () => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await characterUseCases.getCharacters(filters);
        setData(result.characters);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return { data, loading, error };
};
```

### Filter Builder Pattern

```typescript
// Building complex filters
const filters = new FilterBuilder()
  .setName(searchTerm)
  .setStatus(CharacterStatus.Alive)
  .setGender(Gender.Male)
  .setPage(currentPage)
  .build();
```

### Conditional Rendering Pattern

```typescript
// Clear, readable conditional rendering
if (loading) return <Loader />;
if (error) return <ErrorMessage message={error.message} />;
if (!data.length) return <EmptyState />;

return <DataDisplay data={data} />;
```

## Important Notes

### Dependency Flow

- ⚠️ **NEVER** import from infrastructure in domain layer
- ⚠️ **NEVER** import from presentation in domain/application layers
- ✅ **ALWAYS** depend on interfaces (ports), not implementations
- ✅ **ALWAYS** use factories for creating instances

### State Management

- ⚠️ **AVOID** prop drilling (use stores or context)
- ✅ **USE** Zustand stores for global state
- ✅ **USE** useState for local component state
- ✅ **USE** persistence for favorites, comments, deleted characters

### Performance

- ✅ **USE** debouncing for search inputs (500ms)
- ✅ **USE** React.memo for expensive components
- ✅ **USE** useMemo for expensive calculations
- ✅ **USE** lazy loading for routes
- ⚠️ **AVOID** unnecessary re-renders

### Error Handling

- ✅ **ALWAYS** handle errors in async operations
- ✅ **DISPLAY** user-friendly error messages
- ✅ **LOG** errors for debugging
- ✅ **RECOVER** gracefully from errors

## API Reference

**GraphQL Endpoint**: `https://rickandmortyapi.com/graphql`

**Key Queries**:

- `GET_CHARACTERS` - Fetch characters with filters and pagination
- `GET_CHARACTER` - Fetch single character by ID

**Filter Options**:

- `name: string` - Search by name
- `status: "Alive" | "Dead" | "unknown"` - Filter by status
- `species: string` - Filter by species
- `type: string` - Filter by type/subspecies
- `gender: "Male" | "Female" | "Genderless" | "unknown"` - Filter by gender

## Documentation

### Main Documentation Files

- **README.md** - Complete project documentation with architecture, features, and setup
- **ARCHITECTURE.md** - Detailed architecture explanation (if exists)
- **SUMMARY.md** - Project summary (if exists)
- **USER_GUIDE.md** - User guide and features (if exists)

### Code Documentation

- **JSDoc Comments** - For complex functions and utilities
- **Type Definitions** - Self-documenting TypeScript interfaces
- **Test Cases** - Tests serve as usage documentation

## Troubleshooting

### Common Issues

**Tests Failing**:

```bash
# Clear cache and re-run
npm run test -- --clearCache
npm run test
```

**TypeScript Errors**:

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Build Errors**:

```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

**Linting Errors**:

```bash
# Run ESLint
npm run lint

# Auto-fix where possible
npm run lint -- --fix
```

## Project Statistics

- **Total Components**: 35+ React components
- **Test Files**: 21 test files
- **Total Tests**: 112 unit tests ✅
- **Test Coverage**: Comprehensive coverage across all layers
- **Lines of Code**: ~3,500+ lines (excluding tests)
- **TypeScript**: 100% TypeScript (strict mode)
- **Layers**: 4 (Domain, Application, Infrastructure, Presentation)
- **Design Patterns**: 10+ patterns implemented

## Best Practices Summary

### ✅ DO

- Follow hexagonal architecture strictly
- Write tests for all new features
- Use TypeScript interfaces for all contracts
- Apply SOLID principles
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper error handling
- Write self-documenting code
- Use meaningful variable names
- Follow Atomic Design for components

### ❌ DON'T

- Import infrastructure in domain layer
- Use `any` type in TypeScript
- Create god components (> 200 lines)
- Skip writing tests
- Violate dependency direction
- Prop drill excessively
- Ignore accessibility
- Write unclear variable names
- Mix concerns in single file
- Duplicate code (DRY principle)

## Version History

### Current Version (Latest)

- ✅ All features implemented
- ✅ 112 unit tests passing
- ✅ Full TypeScript coverage
- ✅ Hexagonal architecture complete
- ✅ Responsive design implemented
- ✅ Performance optimizations applied
- ✅ Accessibility features added

## Last Updated

December 27, 2024

---

**For any questions or clarifications, refer to README.md or check the inline code documentation.**
