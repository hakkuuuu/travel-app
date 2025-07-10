This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Design System & Component Usage

### Button Component
- All buttons (login, profile, actions) use the unified `Button` component in `components/Button.tsx`.
- Supports variants: `primary` (green), `secondary` (white), `outline` (bordered).
- Supports icon placement (left/right), sizes (`sm`, `md`, `lg`), and full width.
- Example:
  ```tsx
  <Button variant="primary" size="md" icon={<UserIcon />} iconPosition="left">Profile</Button>
  ```

### ProfileDropdown
- Uses the `Button` component for the profile trigger, passing avatar and username as props.
- Dropdown menu for profile actions (view, settings, logout).

### Theme Handling
- Uses Tailwind's `dark:` variant for all color adaptation.
- Theme is toggled via the `ThemeSwitch` component and stored in localStorage.
- The `dark` class is applied to `<html>` for dark mode.

### Global Styles
- Only project-wide utility classes are kept in `app/globals.css` (e.g., `.max-container`, `.padding-container`, `.navlink`, `.travel-logo`, `.hide-scrollbar`).
- All other styling is handled by Tailwind utility classes or config.

### Image & Asset Management
- All images in `public/` are referenced in the codebase. Unused images are regularly removed.
- Use `next/image` for all images for optimization.

### Best Practices
- Use Tailwind utility classes for layout, color, and spacing.
- Keep components small, focused, and reusable.
- Document new components and utilities in this README for team onboarding.

---
