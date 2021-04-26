import { AutoRc } from "auto";
/** Auto configuration */
export default function rc(): AutoRc {
  return {
    plugins: [
      "all-contributors",
      "npm",
      "conventional-commits",
      "released",
      "first-time-contributor",
      [
        "gh-pages",
        {
          "buildCommand": "yarn build:docs",
          "dir": "./docs"
        }
      ]
    ],
    prereleaseBranches: ["next", "alpha", "beta"],
    name: "sumwatshade",
    email: "lshadler13@gmail.com",
    repo: "enquirer-engine",
    owner: "sumwatshade"
  } 
}