import { AptosClient } from "aptos";

async function main() {
  const lavaGatewayRPCURL =
    "https://g.w.lavanet.xyz:443/gateway/apt1/rest/b7afb21cf559e5665c165f152202f6a3";
  const client = new AptosClient(lavaGatewayRPCURL, {}, true);

  let validRequestsCount = 0;
  let errorsCount = 0;
  let totalTime = 0;
  let minTime = Number.MAX_VALUE;
  let maxTime = 0;

  for (let i = 0; i < 100; i++) {
    const account =
      "0x1d8727df513fa2a8785d0834e40b34223daff1affc079574082baadb74b66ee4";

    const startTime = Date.now();

    try {
      const resources = await client.getAccountResources(account);
      validRequestsCount++;
      console.clear();
      console.log("successfull iteration", i + 1);
    } catch (error) {
      errorsCount++;
      console.clear();
      console.error("Error fetching account resources:", error);
    } finally {
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      console.log("elapsed", elapsed, "ms");
      totalTime += elapsed;
      minTime = Math.min(minTime, elapsed);
      maxTime = Math.max(maxTime, elapsed);
    }
  }

  const meanTime = totalTime / (validRequestsCount + errorsCount);

  console.clear();
  console.log("Valid Requests:", validRequestsCount);
  console.log("Errors:", errorsCount);
  console.log("Mean Request Time:", meanTime, "ms");
  console.log("Max Request Time:", maxTime, "ms");
  console.log("Min Request Time:", minTime, "ms");
  console.log("Total Request Time:", totalTime, "ms");
}

main().catch(console.error);
