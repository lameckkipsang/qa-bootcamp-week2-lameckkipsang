# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI and API testing)
- Postman (API testing)
- The Toolshop REST API

This repo contains Week 2 TypeScript exercises in `src/`, Gherkin specifications in `features/`, Page Object Models in `pages/`, and Playwright UI and API tests for Toolshop in `tests/`.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup

After cloning the repository and opening the folder, run these three steps in order from a terminal:

1. Install the dependencies and the Chromium browser for Playwright:

   ```bash
   npm install && npx playwright install chromium
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` already contains the Toolshop website URL (`TOOLSHOP_URL`) and the Toolshop API URL (`TOOLSHOP_API_URL`). Only change them if your trainer gives you different URLs.

3. Run the full Playwright UI and API test suite:

   ```bash
   npm test
   ```

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Folders

| Folder | What it is for |
| --- | --- |
| `features/` | Gherkin feature specification (`cart.feature`). |
| `pages/` | Page Object Model classes (`HomePage.ts`). |
| `src/` | TypeScript fundamentals exercises (`ts-basics/`) and `profile-validator.ts`. |
| `tests/` | Playwright UI and API tests for Toolshop. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm test`: runs all Playwright UI and API tests in `tests/`.
- `npm run check`: checks your `.env` and that you can reach the Toolshop API.

## Week 2 Day 6 – TypeScript Basics & Profile Validator

- **`src/ts-basics/`**: TypeScript fundamentals practice covering basic types (`index.ts`), tuples (`tuples.ts`), typed functions (`functions.ts`), object type aliases (`objects.ts`), and union types (`uniontypes.ts`).
- **`src/profile-validator.ts`**: Validates nested user notification settings using optional properties (`?`), optional chaining (`?.`), and nullish coalescing (`??`) so missing fields safely default to `false` without runtime errors.
- **How to run Day 6 files:** Run `npx tsx src/profile-validator.ts` from the project root. Any file in `src/ts-basics/` runs the same way (for example, `npx tsx src/ts-basics/index.ts`).

## Week 2 Day 7 – Playwright UI Tests

- **`tests/home.spec.ts`**: Verifies the Toolshop home page loads with the expected title (`Practice Software Testing - Toolshop - v5.0`).
- **`tests/search.spec.ts`**: Searches for `"pliers"` and verifies all returned products include `"pliers"` in their name.
- **`tests/login.spec.ts`**: Submits invalid login credentials and verifies the `"Invalid email or password"` error message is displayed.

## Week 2 Day 8 – Page Object Model, Feature File & Products API

- **`pages/HomePage.ts` & `tests/search-pom.spec.ts`**: Encapsulates home page search locators and actions into a Page Object Model and verifies product search results.
- **`tests/products-api.spec.ts`**: Sends a `GET /products` request and verifies HTTP `200` and a non-empty product list.
- **`features/cart.feature`**: Gherkin scenarios describing the Toolshop shopping cart flow.

## Week 2 Day 9 – Cart API Tests with Cleanup

- **`tests/cart-create-api.spec.ts`**: Dynamically fetches a product, creates a cart, adds the product, checks the response fields, and deletes the cart in `test.afterEach`.
- **`tests/cart-not-found-api.spec.ts`**: Requests a non-existent cart ID and checks for a `404` status response.

## Notes

- **Cucumber-js (Optional):** Step definitions for `features/cart.feature` were left out to prioritize full Playwright UI and API suite stability and trace verification.

## Week 2 Capstone – Search UI, Cart API & Flakiness Drill

- **`tests/c1-search.spec.ts`**: Capstone Case C1 UI test using `pages/HomePage.ts` to search for `"pliers"`, verify the search heading, and assert every returned product title matches the query.
- **`tests/c4-cart-api.spec.ts`**: Capstone Case C4 API test that fetches a live product from `GET /products`, creates a cart with `POST /carts`, adds the item with `POST /carts/{id}`, verifies the saved product ID and quantity via `GET /carts/{id}`, and cleans up with `DELETE /carts/{id}` in `test.afterEach`.
- **`tests/drill/flaky-save.spec.ts` & `tests/drill/index.html`**: Flakiness drill page and stabilized Playwright test using web-first `toHaveText('Saved')` assertions instead of fixed waits (`npx playwright test tests/drill/flaky-save.spec.ts --repeat-each=20`).