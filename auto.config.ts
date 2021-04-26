import { AutoRc } from "auto";
/** Auto configuration */
export default function rc(): AutoRc {
  return {
    plugins: [
      "all-contributors",
      "npm",
      "released",
      "first-time-contributor",
    ],
    prereleaseBranches: ["next", "alpha", "beta"],
    name: "sumwatshade",
    email: "lshadler13@gmail.com",
    repo: "enquirer-engine",
    owner: "sumwatshade"
  } 
}