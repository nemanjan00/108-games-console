const fs = require("fs");

const data = fs.readFileSync("./dump.bin");

const table = data.slice(0x6846e);

let name = "";

const names = [];

let found = false;
let foundAt;

table.forEach((el, key) => {
	if(found) {
		return;
	}

	if(el == 0xff) {
		names.push(name);
		name = "";
		return;
	}

	if(el == 0x03) {
		foundAt = key;
		found = true;
	}

	name += String.fromCharCode(el);
});

console.log(JSON.stringify(names, null, 4), names.length);
