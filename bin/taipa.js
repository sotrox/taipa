#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/client")
const document_1 = require("../lib/document")
let cli = new client_1.Client();
let doc = new document_1.Document();
let stdin = process.openStdin();
stdin.addListener('data', function (d) {
    doc = cli.process(d.toString().trim());
    const ts = doc.tokens;
    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            //console.log(cli.getTonalLemmas(ts[i].text))
            console.info(ts[i].text + ',' + ts[i].pos + ',' + ts[i].tag + ',' + ts[i].dep + ',' + ts[i].head.text);
        }
    }
});
//# sourceMappingURL=taipa.js.map
