# CNB Exchange Rates

A React Native application that fetches daily exchange rates from the Czech National Bank (ČNB) and allows conversion from CZK to other currencies.

## Tech Stack

  React Native (Expo), TypeScript, Styled Components, React Query

## Project Structure

I organized the codebase by separating the data layer from the UI:

  * `src/api`: API integration and the specific ČNB text parser.
  * `src/hooks`: Custom hooks (fetching rates, conversion logic).
  * `src/components`: Reusable UI elements.
  * `src/screens`: Main application screens.

## Implementation Notes

  * **Data Parsing:** The ČNB API returns a text file. I implemented a custom parser that handles the specific format,
  * **Currency Amounts:** The logic accounts for the "Amount" column (e.g., 100 JPY vs. 1 USD) to ensure accurate conversion calculations.
  * **Input Handling:** The input field sanitizes user input to handle both dot `.` and comma `,` decimal separators.

## How to Run
1. **Clone the repository:**

    ```bash
    git clone https://github.com/krystofcelba/cnb-exchange-rates.git
    cd cnb-exchange-rates
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

    *Note: If you encounter peer dependency issues with Styled Components, use `npm install --legacy-peer-deps`.*

3. **Start the app:**

    ```bash
    npx expo start
    ```

4. **Run tests:**

    ```bash
    npm test
    ```

    *Tests cover the data parser logic and currency calculations.*