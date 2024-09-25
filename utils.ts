import {
    QueryResponse,
    SolanaAccountQueryRequest,
    SolanaAccountQueryResponse,
  } from "@wormhole-foundation/wormhole-query-sdk";
  import bs58 from "bs58";
import { FIRST_FIELD_BYTE_IDX, SIZE_OF_U64 } from "./query_solana_stake_pool";
  
  export function logQueryResponseInfo(bytes: string) {
    const queryResponse = QueryResponse.from(Buffer.from(bytes, "hex"));
    const solRequest = queryResponse.request.requests[0]
      .query as SolanaAccountQueryRequest;
    const solResponse = queryResponse.responses[0]
      .response as SolanaAccountQueryResponse;
    const blockTime = new Date(
      Number(solResponse.blockTime / BigInt(1000))
    ).toISOString();
    const totalActiveStake = Buffer.from(
      solResponse.results[0].data
    ).readBigUInt64LE(FIRST_FIELD_BYTE_IDX);
    const poolTokenSupply = Buffer.from(
      solResponse.results[0].data
    ).readBigUInt64LE(FIRST_FIELD_BYTE_IDX + SIZE_OF_U64);
    const lastUpdateEpoch = Buffer.from(
      solResponse.results[0].data
    ).readBigUInt64LE(FIRST_FIELD_BYTE_IDX + SIZE_OF_U64 * 2);
    const clockEpoch = Buffer.from(solResponse.results[1].data).readBigUInt64LE(
      SIZE_OF_U64 * 2
    );
    const poolTokenValue = Number(totalActiveStake) / Number(poolTokenSupply);
    console.log("slotNumber      ", solResponse.slotNumber.toString());
    console.log("blockTime       ", blockTime);
    console.log("blockHash       ", bs58.encode(solResponse.blockHash));
    for (let idx = 0; idx < solRequest.accounts.length; idx++) {
      console.log(`\nAccount ${idx}`);
      console.log("account (base58)", bs58.encode(solRequest.accounts[idx]));
      console.log(
        "account (hex)   ",
        Buffer.from(solRequest.accounts[idx]).toString("hex")
      );
      console.log(
        "owner (base58)  ",
        bs58.encode(solResponse.results[idx].owner)
      );
      console.log(
        "owner (hex)     ",
        Buffer.from(solResponse.results[idx].owner).toString("hex")
      );
      console.log(
        "data            ",
        Buffer.from(solResponse.results[idx].data).toString("hex")
      );
    }
    console.log("");
    console.log("totalActiveStake", totalActiveStake.toString());
    console.log("poolTokenSupply ", poolTokenSupply.toString());
    console.log("poolTokenValue  ", poolTokenValue);
    console.log("lastUpdateEpoch ", lastUpdateEpoch.toString());
    console.log("clockEpoch      ", clockEpoch.toString());
    return {
      slotNumber: solResponse.slotNumber,
      blockTime: solResponse.blockTime,
      totalActiveStake,
      poolTokenSupply,
      clockEpoch,
    };
  }