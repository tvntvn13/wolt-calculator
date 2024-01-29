## [LINK TO THE GOOGLE DRIVE](https://drive.google.com/drive/folders/123h34h3CrxZuU6je84Upcfhbi3JHFu0i?usp=sharing)

## Delivery Fee Calculator

This project is a pre-assignment for Software Developer Internship at Wolt. The
project is the frontend implementation of the
[requirements](https://github.com/woltapp/engineering-internship-2024?tab=readme-ov-file#delivery-fee-calculator),
made with Typescript and React.

<br>
<div align="center">
    <img src="./public/iphone-preview.png" alt="iphone preview of the app" width="auto" height="600"/>
</div>

#### Installation

- download the archive, extract the files and install dependencies with your
  preferred Node package manager:

```bash
unzip wolt-calculator.zip -d wolt-calculator
cd wolt-calculator
npm install
```

- you can build the project and host it with Vite:

```bash
npm run build && npm run preview
```

#### Project structure

The project is build with Vite and organised in the following way:

```bash
 src
├──  App.css
├──  App.tsx
├──  assets
│   └──  fonts
│       ├──  OmnesBold.woff
│       ├──  OmnesMedium.woff
│       └──  OmnesSemiBold.woff
├──  components
│   ├──  FormActionButton.tsx
│   ├──  InputForm.tsx
│   └──  ResultDisplay.tsx
├──  environments
│   └──  environment.ts
├──  interfaces
│   └──  formValue.ts
├──  main.tsx
├──  services
│   ├──  calculateDeliveryFee.ts
│   ├──  formatDateTime.ts
│   └──  parseInputValue.ts
├──  styles
│   ├──  FormActionButton.css
│   ├──  InputForm.css
│   └──  ResultDisplay.css
└──  tests
    ├──  App.spec.tsx
    ├──  calculateDeliveryFee.spec.ts
    ├──  data
    │   └──  testCases.ts
    ├──  FormActionButton.spec.tsx
    ├──  formatInputValue.spec.ts
    ├──  InputForm.spec.tsx
    └──  ResultDisplay.spec.tsx
```

- The entry point for the app is **main.tsx**. It renders the **App** component
- App component manages the state of the app, and passes the state and callback
  functions as props to **InputForm**, **ResultDisplay** and
  **FormActionButton**
- InputForm is responsible for taking and validating the user input
- **calculateDeliveryFee.ts** is the main function of the app, that does all the
  calculations
- Interfaces for the props are contained in the component that uses them, but
  because multiple components use **FormValue**, it has it's own file
- The current values/thresholds for the calculations are all stored in
  **environment.ts** for easy access and modification

#### Accessibility

- The app can be navigated and interacted with using the Tab, Enter and
  Arrow-keys
- All the fields have labels, placeholders, aria-required and aria-describedby
  attributes, combined by visually hidden span elements for screen-readers
- The form can be submitted using the Enter key. If some required fields are
  missing, they will be highlighted and hints will be provided by using the
  browsers built-in functionality
  - Decision to use the browsers built-in systems, instead of writing custom
    implementation, was done to provide a clear and safe experience that the
    users are already familiar with
- The project is tested for accessibility using axe DevTools browser extension

#### UI/UX

- Main focus was to provide a clear, simple and easy-to-use interface
- The fonts and the colors are chosen to resemble the original branding
- The app is responsive and works on most common devices and screen-sizes
- The input fields don't accept invalid inputs, and there are hints in place if
  required inputs are missing
- The project uses standard css files, grouped in their own styles directory and
  split by the respective component
  - The decision to go with plain css files was made because of the scope of the
    project, and to keep the dependencies minimal and bundle size small

#### Testing

- There are unit and integration tests included in the project
- All the input fields and the calculated delivery fee have a matching
  data-test-id attributes
- The tests are written using Vitest and React Testing Library
- To run the full test suite, run:

```bash
npm run test
```

- To run the full suite and check for code coverage, run:

```bash
npm run test:coverage
```

- To open the results in a browser run:

```bash
open coverage/index.html
```

- To run individual tests, you can run the test command in watch mode and follow
  the instructions on the commandline:

```bash
npm run test:dev
```

#### Code quality

- The project uses ESLint, Stylelint and Prettier to enforce code quality and
  style
- To run the ESLint and Stylelint checks, run:

```bash
npm run lint
```

#### Dependencies

- To keep the dependencies minimal and the bundle size small, I opted not to use
  any additional libraries
- The only dependencies are React and React-DOM. All other dependencies are for
  development only e.g. linting and testing
- For the scope of the project, I believe working with just the core features of
  React, TS/JS, HTML and CSS helps to demonstrate my understanding of these
  tools
