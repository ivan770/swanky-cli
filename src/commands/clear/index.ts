import { remove } from "fs-extra/esm";
import { SwankyCommand } from "../../lib/swankyCommand.js";
import { ARTIFACTS_PATH, TARGET_PATH, TESTS_PATH, TYPED_CONTRACTS_PATH } from "../../lib/consts.js";
import path from "node:path";

export default class Clear extends SwankyCommand<typeof Clear> {
  static description = "Remove build artifacts and cache";

  public async run(): Promise<void> {
    const testDir = path.resolve(TESTS_PATH);

    const contractPaths = Object.keys(this.swankyConfig.contracts)
      .flatMap((contractName) => [
        remove(path.resolve(testDir, contractName, "artifacts")),
        remove(path.resolve(testDir, contractName, "testReports"))
      ])

    await Promise.all([
      remove(ARTIFACTS_PATH),
      remove(TARGET_PATH),
      remove(TYPED_CONTRACTS_PATH)
    ].concat(contractPaths))
  }
}

