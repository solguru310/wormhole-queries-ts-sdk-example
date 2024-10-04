
# Solana Wormhole Queries TS-SDK Example

## Overview

This project showcases how the Wormhole Queries TS-SDK provides on-demand, attested, and on-chain verifiable RPC results across blockchain networks via a user-friendly REST API call. Before running the scripts, ensure that the required configurations are in place and the QUERIES_API_KEY environment variable is set.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js & TypeScript
- npm or yarn 
- A Wormhole Queries API Key
  - Request your API key through [this form](https://forms.clickup.com/45049775/f/1aytxf-10244/JKYWRUQ70AUI99F32Q)

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/solguru310/wormhole-queries-ts-sdk-example.git
   cd /wormhole-queries-ts-sdk-example
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
- 500 - future failed to reach consensus (e.g. received 14 responses but 7 with one result and 7 with another)
- 504 - did not reach consensus in < 1m. The network drops malformed requests, so a persistent 504 is likely due to an invalid query request.

If you encounter any of these errors, double-check your API key, ensure your input is correctly formatted, and verify your network connection.

## Further Reading
For a deeper insight into Wormhole Queries and its foundational concepts, we recommend reviewing the detailed [whitepaper](https://github.com/wormhole-foundation/wormhole/blob/main/whitepapers/0013_ccq.md#cross-chain-queries-ccq). 
It offers extensive information on the architecture, security considerations, and implementation details of Wormhole Cross-chain Queries.

## Contact me
If you need more technical support and development inquires, you can contact below.

Telegram: [@dwlee918](https://t.me/@dwlee918)

Twitter: [@derricklee918](https://x.com/derricklee918)
