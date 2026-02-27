# Playwright TypeScript E2E Framework

![Playwright Tests](https://github.com/ryancrandall801/playwright-typescript-e2e-framework/actions/workflows/playwright.yml/badge.svg)

A production-style end-to-end test automation framework built with Playwright and TypeScript.

This repository demonstrates how to structure a scalable, maintainable automation framework using modern tooling and CI practices.

---

## 🚀 Running Tests

### 🖥️ Locally

```bash
npm install
npm test
```

## 🐳 With Docker

```bash
npm run docker:build
npm run docker:test
```

## ⚙️ CI

GitHub Actions pipeline:

- Runs on `pull_request` and `push` events
- Uses Ubuntu runner (`ubuntu-latest`)
- Installs dependencies with `npm ci`
- Installs Playwright browsers with system dependencies
- Executes UI and API test suites in parallel as independent jobs
- Uploads Playwright HTML reports as downloadable artifacts

## 🧠 Design Highlights

* Page Object Model for UI abstraction
* TypeScript for strong typing and maintainability
* Dockerized test execution for consistent runtime environments
* GitHub Actions CI for automated validation
* Clean, conventional commit history

## 📁 Project Structure

```text
src/
  pages/       # Page Object Model classes
  fixtures/    # Custom Playwright fixtures
tests/
  ui/          # End-to-end UI tests
  api/         # API tests using Playwright request context
Dockerfile     # Containerized test execution
playwright.config.ts
```
