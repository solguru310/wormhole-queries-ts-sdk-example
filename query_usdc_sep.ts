import {
    EthCallQueryRequest,
    EthCallQueryResponse,
    PerChainQueryRequest,
    QueryRequest,
    QueryResponse,
  } from "@wormhole-foundation/wormhole-query-sdk";
  import axios from "axios";
  import { eth } from "web3";
  
  const QUERY_URL = "https://testnet.query.wormhole.com/v1/query";
  const API_KEY = process.env.API_KEY;
  // https://docs.wormhole.com/wormhole/reference/constants
  const CHAIN_ID = 10002;
  const RPC = "https://ethereum-sepolia-rpc.publicnode.com";
  // https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
  const to = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
  
  if (!API_KEY) {
    throw new Error("API_KEY is required!");
  }
  
  (async () => {
    console.log("\n\nFetching latest block...");
    const latestBlock = (
      await axios.post(RPC, {
        method: "eth_getBlockByNumber",
        params: ["latest", false],
        id: 1,
        jsonrpc: "2.0",
      })
    ).data?.result?.number;
    console.log("\n\nIssuing query...");
    const nonce = 1;
    const request = new QueryRequest(nonce, [
      new PerChainQueryRequest(
        CHAIN_ID,
        new EthCallQueryRequest(latestBlock, [{ to, data: eth.abi.encodeFunctionSignature("name()") }])
      ),
    ]);
    const serialized = request.serialize();
    const response = await axios.post(
      QUERY_URL,
      {
        bytes: Buffer.from(serialized).toString("hex"),
      },
      { headers: { "X-API-Key": API_KEY } }
    );
  
    const queryResponse = QueryResponse.from(response.data.bytes);
    const chainResponse = queryResponse.responses[0]
      .response as EthCallQueryResponse;
    console.log("\n\nParsed chain response:");
    console.log(chainResponse);
  
    const name = eth.abi.decodeParameter("string", chainResponse.results[0]);
    console.log("\n\nName:", name, "\n\n🙌\n");
  })();