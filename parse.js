const fs = require("fs");

const data = fs.readFileSync("./dump.bin");

const table = data.slice(0x76000);

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

	if(el == 0x02) {
		foundAt = key;
		found = true;
	}

	name += String.fromCharCode(el);
});

console.log(names);

const nextTable = table.slice(foundAt);

Array(21)
	.fill(true)
	.map((_, row) => {
		const rowData = nextTable.slice(row * 12, row * 12 + 12);

		console.log(rowData);
	});

const afterThat = nextTable.slice(252);

Array(232)
	.fill(true)
	.map((_, row) => {
		const rowData = afterThat.slice(row * 11, row * 11 + 11);

		console.log(rowData);
	});

//console.log(JSON.stringify(names, null, 4));
