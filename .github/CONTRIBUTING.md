# Contributing to CareerPath AI

Thank you for your interest in contributing to **CareerPath AI**! We welcome bug reports, model benchmark contributions, and documentation improvements.

## 🚀 How to Contribute

1. **Fork the Repository** and clone your fork locally.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Set Up Development Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. **Run Tests**: Ensure all 18 automated tests pass:
   ```bash
   python -m unittest discover tests
   ```
5. **Commit Your Changes**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add new classifier evaluation`
   - `fix: resolve O*NET parser edge case`
   - `docs: update system architecture diagram`
6. **Submit a Pull Request**: Provide a clear description of the problem solved and test results.
