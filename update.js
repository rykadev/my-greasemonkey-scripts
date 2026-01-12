import fs from "fs";
import path from "path";

const github_url = "https://github.com/rykadev/my-greasemonkey-scripts/raw/refs/heads/main/scripts/";

const date_version_string = new Date()
    .toISOString()
    .split(":")
    .join("-")
    .split("T")
    .join("___")
    .split(".")[0];

const modified_ats_filename = "modified_ats.json";
const modified_ats = fs.existsSync(modified_ats_filename)
    ? JSON.parse(fs.readFileSync(modified_ats_filename, "utf-8"))
    : {};

const scriptList = fs
    .readdirSync("scripts")
    .filter((script) => script.endsWith(".user.js"));

await Promise.all(scriptList.map(async (script_filename) => {
    console.log(script_filename)
    const last_modified_at = modified_ats[script_filename];
    const script_path = path.join("scripts", script_filename);
    if (last_modified_at) {
        const {mtime} = await fs.promises.stat(script_path);
        if (mtime.toISOString() == last_modified_at){
            console.log(`Skipped "${script_filename}" -> mtime is the same.`)
            return;
        }else{
            console.log(`Setting new @version for "${script_filename}" -> ${date_version_string}`);
        }
    }

    let script_text = await fs.promises.readFile(script_path, "utf-8");
    script_text = script_text.replace(/^(\/\/\s+@version\s+).*$/gm, `$1${date_version_string}`);
    script_text = script_text.replace(/^(\/\/\s+@(?:(?:updateURL)|(?:downloadURL))\s+).*$/gm, `$1${github_url+script_filename}`);
    await fs.promises.writeFile(script_path, script_text, "utf-8");

    const new_modified_at = await fs.promises.stat(script_path);
    modified_ats[script_filename] = new_modified_at.mtime.toISOString();
    console.log(modified_ats)
}));

await fs.promises.writeFile(
    modified_ats_filename,
    JSON.stringify(modified_ats, null, 4),
    "utf-8"
);

const separator = "-".repeat(3);

const readme_filename = "README.md";
let readme_text = await fs.readFileSync(readme_filename, "utf-8");
readme_text =
    (readme_text ?? "\r\n").split(separator)[0] +
    [
        separator,
        ...scriptList.map(
            (s) =>
                `- [${s}](${github_url}${s})`
        ),
    ].join("\r\n");
await fs.promises.writeFile(readme_filename, readme_text, "utf-8");
