<h1 align="center">
  <a href="https://github.com/IhsenBouallegue/hub-one">
    <!-- Please provide path to your logo here -->
    <img src="docs/images/hubone_logo_full.svg" alt="Logo" width="500">
  </a>
</h1>

<div align="center">
  Hub One - The Heart of All Your Team’s Bookmarks.
  <br />
  <a href="#about"><strong>Explore the screenshots »</strong></a>
  <br />
  <br />
  <a href="https://github.com/IhsenBouallegue/hub-one/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/IhsenBouallegue/hub-one/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/IhsenBouallegue/hub-one/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+">Ask a Question</a>
</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support](#support)
- [Project assistance](#project-assistance)
- [Contributing](#contributing)
- [Authors & contributors](#authors--contributors)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

---

## About

Tired of keeping track of new tools and websites? Tired of having to update your
bookmarks every few weeks if not days? Access all bookmarks from this one page.
Everything is up to date. No need to clutter your life anymore!
Hub One is a self hosted web app that aims to solve the problem of syncing tools and useful links between team members. It does one thing really really well!


### Screenshots

|                                   Hero Section                                    |                                   Links Section                                    |
| :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| <img src="docs/images/hubone_screenshot_1.png" title="Hero Section" width="100%"> | <img src="docs/images/hubone_screenshot_2.png" title="Links Section" width="100%"> |

</details>

### Built With

Hub One is built with the amazing [Nextjs](https://nextjs.org/) framework that in turn is based on [React](https://reactjs.org/). The beautiful UI components are built using [Mantine UI](https://mantine.dev/). It uses [PostgresSQL](https://www.postgresql.org/) as a database for all the links and bookmarks. With the help of [Prisma](https://www.prisma.io/) -a database ORM- quereying is a breeze and totally database-agnostic.
For deployment we used [Docker](https://www.docker.com/) to create containers that are easily deployable (for development and prodcution).


## Getting Started

### Prerequisites

To run Hub One **locally** you will need:

- [Nodejs](https://nodejs.org/): A JavaScript runtime.
- [Yarn](https://yarnpkg.com/): A package manager for JavaScript.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/): For running the containers locally.

### Installation

```sh
# Clone the github repo
git clone https://github.com/IhsenBouallegue/hub-one
# Install the dependencies
yarn install
```

## Usage

We have set up yarn scripts that will use docker compose files to launch the Hub One container and the PostgreSQL Database.

```sh
# Laucnh development containers
yarn up
```
```sh
# Launch production containers
yarn up:prod
```

## Roadmap

See the [open issues](https://github.com/IhsenBouallegue/hub-one/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/IhsenBouallegue/hub-one/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/IhsenBouallegue/hub-one/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/IhsenBouallegue/hub-one/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/IhsenBouallegue/hub-one/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/IhsenBouallegue)

## Project assistance

If you want to say **thank you** or/and support active development of Hub One:

- Add a [GitHub Star](https://github.com/IhsenBouallegue/hub-one) to the project.
- [Tweet](www.twitter.com) about Hub One.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make Hub One **better**!

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Ihsen Bouallegue](https://github.com/IhsenBouallegue).

For a full list of all authors and contributors, see [the contributors page](https://github.com/IhsenBouallegue/hub-one/contributors).

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

Special thanks goes to [MaibornWolff](www.maibornwolff.de) for supporting the development of this project and being open to adopting it company-wide.
