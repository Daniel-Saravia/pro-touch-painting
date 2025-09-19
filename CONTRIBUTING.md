# Contributing to Pro Touch Painting & Drywall Website

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/protouch.git
   cd protouch
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper type definitions
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Components**: Use functional components with hooks
- **Styling**: Use CSS Modules for component-specific styles

### File Structure

- Place new components in `src/components/`
- Add component tests in `src/components/__tests__/`
- Use CSS Modules for styling (`ComponentName.module.css`)
- Follow the existing project structure

### Testing

- Write tests for all new components
- Use React Testing Library for component testing
- Aim for good test coverage
- Run tests before submitting: `npm test`

### Commits

- Use clear, descriptive commit messages
- Follow conventional commits format:
  ```
  feat: add new component
  fix: resolve styling issue
  docs: update README
  test: add component tests
  ```

## 🧪 Testing Your Changes

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Run linting**:
   ```bash
   npm run lint
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Add/update tests** for your changes
3. **Ensure all tests pass**
4. **Run linting and fix any issues**
5. **Create a pull request** with:
   - Clear title and description
   - Link to any related issues
   - Screenshots if UI changes
   - Test coverage information

## 🎨 Design Guidelines

### Color Palette
- Primary Orange: `#D2691E`
- Deep Maroon: `#8B2635`
- Charcoal: `#2C3E50`
- Navy Blue: `#1E3A8A`
- Success Green: `#059669`
- Light Orange: `#F4A460`

### Typography
- Headings: Poppins font family
- Body: Roboto font family
- Maintain consistent spacing and hierarchy

### Responsive Design
- Mobile-first approach
- Test on multiple screen sizes
- Use CSS Grid and Flexbox appropriately

## 🔧 Technical Requirements

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Performance
- Maintain Lighthouse score above 90
- Optimize images and assets
- Use lazy loading where appropriate
- Keep bundle size reasonable

## 🌐 Internationalization

- All user-facing text should use i18next
- Add translations for both English and Spanish
- Test language switching functionality

## 📧 Contact Form Features

- Validate all form inputs
- Provide clear error messages
- Test email and SMS functionality
- Handle API errors gracefully

## 🚫 What Not to Do

- Don't commit environment variables or secrets
- Don't break existing functionality
- Don't ignore TypeScript errors
- Don't skip writing tests
- Don't hardcode text strings (use i18next)

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Description** of the problem
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Browser and OS information**
6. **Screenshots** if applicable

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** first
2. **Describe the feature** clearly
3. **Explain the use case**
4. **Consider the impact** on existing functionality

## ❓ Questions

If you have questions about contributing:

1. Check the README.md first
2. Look through existing issues
3. Create a new issue with the "question" label
4. Join our discussions in the repository

## 📄 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a professional environment

## 🎯 Areas for Contribution

We especially welcome contributions in:

- **Testing**: Improve test coverage
- **Performance**: Optimize loading and rendering
- **Accessibility**: Improve screen reader support
- **Mobile**: Enhance mobile experience
- **3D Models**: Optimize 3D rendering
- **Documentation**: Improve guides and examples

Thank you for contributing to Pro Touch Painting & Drywall website! 🎨