# Overview

This is a submission for a technical assignment, creating a front-end employee management application that allows users to:

### Implemented Main Features:
* View all employees in a searchable and sortable table
* Create new employees
* Edit existing employee information
* View detailed employee profiles
* Delete employees with confirmation
* Validate employee information before saving
* Display employee employment and termination statuses

### Implemented Nice to have Features:
* Import employee data from JSON
* Export employee data to JSON
* Pagination for Table 
* Navigation bar (desktop and mobile)
* Unit tests for core components
* 404 page for invalid routes

### Tech Stack
* Vue 3
* TypeScript
* Pinia
* Vuetify
* VeeValidate
* Yup
* Vitest

# Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run unit tests:

```bash
npm run test:unit
```

Generate a production build:

```bash
npm run build
```

# Architecture

## State Management

Pinia is used as the single source of truth for employee data.

The store manages:

* Loading employees
* Creating employees
* Updating employees
* Deleting employees
* Importing employees
* Error state

## Validation

Validation is centralized inside a composable using Yup and VeeValidate.

Business rules are separated from UI components to keep forms simple and maintainable.

## Composables

The project contains reusable composables for:

* Employee status calculations
* Validation
* Import / Export functionality

This keeps business logic outside of Vue components whenever possible.

# Responsiveness
Responsive improvements include:

* Flexible layouts using the Vuetify system
* Responsive forms
* Adaptive navigation
* Mobile-friendly date picker
* Scrollable data table for smaller screens

# Error Handling

The application includes error handling for:

* Failed employee loading
* Invalid employee lookup
* Duplicate employee codes
* Invalid JSON imports
* Invalid employee data

A custom 404 page is also provided for invalid routes.

# Future Improvements

Given more time and different requirements these are some improvements I would have in mind:

* Backend API integration
* Authentication and authorization
* Role-based permissions
* Server-side pagination
* Virtual scrolling for larger datasets
* Persistent storage
* Implementing Translations

# Notes

Employee data is loaded from the provided JSON and managed on the client side.

Since the assignment required only front-end development, all CRUD operations are not persisted after refresh.


Thank you for taking the time to review this submission. I appreciate the opportunity to complete this technical assessment and hope it provides a clear overview of my approach to building a maintainable Vue.js application.
