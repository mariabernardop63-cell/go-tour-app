# Architecture Guide

## Front-End Architecture

### Component Hierarchy
- **App.jsx**: Main router and layout container.
- **Pages**:
  - `Welcome`: Landing page with hero section.
  - `Login`: Authentication form.
  - `Signup`: Registration with country selection.
- **Components** (Atomic Design approach):
  - `Button`: Reusable styled buttons.
  - `Input`: Form fields with validation states.
  - `SocialButton`: OAuth entry points.
  - `CountryDropdown`: specialized selection component.
  - `LoadingSpinner`: Global loading state indicator.

### State Management
- Local `useState` for form handling.
- React Router `useNavigate` for flow control.

### Styling Strategy
- `index.css`: Global variables (colors, spacing) and resets.
- `[Component].css`: Scoped styles for individual components.
