# Contributing to Game2EZ

Thank you for your interest in contributing to Game2EZ! We welcome contributions from the community and are pleased to have you join us.

## License Agreement

By contributing to Game2EZ, you agree that your contributions will be licensed under the [GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)](LICENSE).

This means:
- Your contributions become part of the free software
- You retain copyright to your contributions
- Your contributions must be compatible with AGPL-3.0-or-later
- Anyone who receives the software gets the same freedoms you have

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (OS, browser, Node.js version)
- Screenshots if applicable

### Suggesting Features

We love new ideas! When suggesting a feature:
- Check if it has already been suggested
- Provide a clear use case
- Explain how it benefits users
- Consider backward compatibility

### Code Contributions

#### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/game2ez.git
   cd game2ez
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

#### Code Standards

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all tests pass: `npm run type-check` and `npm run lint`
- Keep your code focused on a single concern per commit

#### Pull Request Process

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our code standards

3. Test your changes thoroughly:
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

4. Add copyright notices to any new files you create:
   ```javascript
   /*
    * Copyright (C) 2025 Game2EZ Project
    *
    * This program is free software: you can redistribute it and/or modify
    * it under the terms of the GNU Affero General Public License as published
    * by the Free Software Foundation, either version 3 of the License, or
    * (at your option) any later version.
    *
    * This program is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    * GNU Affero General Public License for more details.
    *
    * You should have received a copy of the GNU Affero General Public License
    * along with this program. If not, see <https://www.gnu.org/licenses/>.
    */
   ```

5. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: brief description"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots for UI changes
   - Details about testing performed

#### Code Review

- All contributions require review before merging
- Reviewers may request changes
- Be responsive to feedback
- Keep discussions professional and constructive

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members
- Accept constructive criticism gracefully

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Project Structure

For detailed information about the project architecture and conventions, see:
- [README.md](README.md) - Project overview
- [architecture.md](architecture.md) - Development guidelines
- [CLAUDE.md](CLAUDE.md) - Project conventions and patterns

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Review existing documentation
- Check closed issues for similar questions

## Attribution

Contributors will be recognized in the project. Thank you for helping make Game2EZ better!

## Free Software

Game2EZ is free software, and we are committed to keeping it that way. All contributions must respect the freedoms granted by the AGPL-3.0-or-later license.

For more information about free software, visit:
- Free Software Foundation: https://www.fsf.org/
- GNU Project: https://www.gnu.org/
- AGPL-3.0 License: https://www.gnu.org/licenses/agpl-3.0.html
