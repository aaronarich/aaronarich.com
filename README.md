# Aaron A. Rich

Personal website of Aaron A. Rich, a Front-End Developer based in Atlanta, GA.

Hosted at [aaronarich.com](https://aaronarich.com).

## Tech Stack

*   **Static Site Generator:** [Jekyll](https://jekyllrb.com/)
*   **Language:** Ruby 3.2.3

## Local Development

### Prerequisites

*   Ruby 3.2.3
*   Bundler 2.4.19

### Installation

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    bundle install
    ```

    *Note: If you encounter permission errors, you may need to configure a local path for gems:*
    ```bash
    bundle config set path 'vendor/bundle'
    bundle install
    ```

### Usage

To start the local development server:

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

### Building

To build the site for production:

```bash
bundle exec jekyll build
```
