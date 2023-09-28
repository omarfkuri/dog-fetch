import express from "express";
import { exec } from "child_process";
import { existsSync, watch } from "fs";
import { promisify } from "util";
import { join, resolve } from "path";

const run = promisify(exec);

const app = express();
const CMD = 'rollup --config rollup.config.js';
const STYLE = 'lessc src/styles.less public/styles.css';

async function build() {
	const start = Date.now();
	console.log("Building...");

	const {stderr, stdout} = await run(CMD);

	if (stdout) console.log(stdout)
	if (stderr) console.log(stderr)

	latest.ui = Date.now();
	console.log("Built in", (latest.ui - start) + "ms");
}

async function buildStyles() {
	const start = Date.now();
	console.log("Building styles...");

	const {stderr, stdout} = await run(STYLE);

	if (stdout) console.log(stdout)
	if (stderr) console.log(stderr)

	latest.css = Date.now();
	console.log("Built styles in", (latest.css - start) + "ms");
}


let latest = {
	css: 0,
	ui: 0
};

let changing = false;

app.get("/*", (req, res) => {

	if (req.url.includes(".")) {

		const filePath = join("public", req.url);

		if (!existsSync(filePath)) {
			res.sendStatus(404);
		}
		else {
			res.sendFile(resolve(join("public", req.url)))
		}

	}
	else if (req.url.endsWith("/reload")) {
		res.send({latest})
	}
	else {
		res.sendFile(resolve("public/index.html"))
	}
})

try {
	await build();
	await buildStyles();
}
catch(err) {
	console.log(err)
	console.log("Build failed")
	process.exit(0);
}

await new Promise(res => 
	app.listen(3040, () => {
		console.log("Live at 3040");
		res()
	})
)

watch("src", {recursive: true}, async (ch, f) => {
	if (changing || ch == "rename") return;
	changing = true;
	
	try {
		if (f.endsWith(".less")) {
			await buildStyles();
		}
		else {
			await build();
		}
	}
	catch(err) {
		console.log(err)
		console.log("Build failed")
	}
	changing = false;

})

console.log("Watching...");