
# Wormhole Queries TS-SDK Demo

## Overview

This project demonstrates the use of the Wormhole Queries TS-SDK, which enables on-demand, attested, on-chain verifiable RPC results across blockchain networks through an easy to use REST API call. Before running the scripts, you need to set up the necessary configurations and set the `QUERIES_API_KEY` environment variable.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js & TypeScript
- npm or yarn 
- A Wormhole Queries API Key
  - Request your API key through [this form](https://forms.clickup.com/45049775/f/1aytxf-10244/JKYWRUQ70AUI99F32Q)

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/wormhole-foundation/demo-queries-ts.git
   cd /demo-queries-ts
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn 
   ```


## Running one of the Scripts

   ```bash
   QUERIES_API_KEY=<YOUR_QUERIES_API_KEY> npx tsx query_usdc_sep.ts
   ```

## Error Handling
When using the Wormhole Queries TS-SDK, you may encounter various error codes. Here's what they mean:
- 400 - bad request (malformed input or bytes)
- 401 - authorization required (missing API key)
- 403 - forbidden (invalid API key)
- 500 - [future] failed to reach consensus (e.g. received 14 responses but 7 with one result and 7 with another)
- 504 - did not reach consensus in < 1m. The network drops malformed requests, so a persistent 504 is likely due to an invalid query request.

If you encounter any of these errors, double-check your API key, ensure your input is correctly formatted, and verify your network connection.

## Further Reading
To gain a deeper understanding of Wormhole Queries and its underlying concepts, we recommend reading the comprehensive [whitepaper](https://github.com/wormhole-foundation/wormhole/blob/main/whitepapers/0013_ccq.md#cross-chain-queries-ccq).
This whitepaper provides in-depth information about the architecture, security considerations, and implementation details of Wormhole Cross-chain Queries.
