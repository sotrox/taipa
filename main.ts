#!/usr/bin/env node

import { Client, Document } from './client'
import { Metadata } from './metadata'
import { STOP_WORDS } from  './stopwords'
import { MORPH_RULES } from './morphrules'
import { TAG_MAP } from './tagmap'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let clt = new Client();
    let doc = clt.processOneToken(input);
    for(let i in doc.inputingLexemes) {
        let wl = clt.lookup(doc.inputingLexemes[i].word.literal);
        // when the word can be found in the dictionary
        if(wl != null) {
            console.log(wl)
        }
        for(let j in doc.inputingLexemes[i].lemmata) {
            let bfl = clt.lookup(doc.inputingLexemes[i].lemmata[j].literal);
            // if the base form of the word can be found in the dictionary
            if(bfl != null) {
                console.log(bfl)
            }
        }
    }

    process.exit(1);
} else if(argc.length > 1) {
    console.error(`Too many arguments for input method: ${argc}`);
    process.exit(1);
}

let clt = new Client();
let doc = clt.process("uannw gua zurw");
