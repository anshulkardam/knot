# Knot — Modern Link Management Platform

Knot is a modern link management platform that lets users shorten links, generate QR codes, build link-in-bio pages, and track analytics, all from a single dashboard.

It’s designed with performance, scalability, and clean UX in mind.
## Run Locally

Clone the project

```bash
  git clone https://github.com/anshulkardam/knot.git
```

Go to the project directory

```bash
  cd knot
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

`ANOTHER_API_KEY`


## Tech Stack

Next.js 16, Fastify, MongoDB, Mongoose, Tanstack Query, Zod


## Issues to Fix

[ ] chaining short URLs
[ ] Redirect loops max 3
[ ] qr for short link