import { exec } from "child_process";

const command = `npx typeorm migration:create ./src/shared/infra/typeorm/migrations/${process.argv[4]}`;

(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr);
    }
    console.log(stdout);
  }))();
