#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processor_1 = require("../lib/dparser/processor")
const document_1 = require("../lib/document")
let doc = new document_1.Document();
let stdin = process.openStdin();
stdin.addListener('data', function (d) {
    doc = processor_1.processor(d.toString().trim());
    const ts = doc.tokens;
    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            let lemma = '*';
            if (ts[i].lemma != '')
                lemma = ts[i].lemma;
            let headText = '*';
            if (ts[i].head)
                headText = ts[i].head.text;
            console.info(ts[i].text +
                ',' +
                lemma +
                ',' +
                ts[i].pos +
                ',' +
                ts[i].tag +
                ',' +
                ts[i].dep +
                ',' +
                headText);
        }
    }
});
//# sourceMappingURL=app.js.map
