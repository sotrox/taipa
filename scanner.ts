//------------------------------------------------------------------------------
//  Escape Characters
//------------------------------------------------------------------------------

export class Escape {
    public static readonly ENDOFFILE = "\0";
    public static readonly TAB = "\t";
    public static readonly NEWLINE = "\n";
    public static readonly WHITESPACE = " ";
}

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    
    cargo: string;
    lineIndex: number;
    colIndex: number;
    sourceIndex: number;
    sourceText: string;

    constructor(c: string, lineIndex:number, colIndex: number, sourceIndex: number, sourceText: string) {
      this.cargo = c;
      this.lineIndex = lineIndex;
      this.colIndex = colIndex;
      this.sourceIndex = sourceIndex;
      this.sourceText = sourceText;
    }

    toString() {
        let cargo = "";

        if(this.cargo == Escape.WHITESPACE) cargo = " space";
        else if(this.cargo == Escape.NEWLINE) cargo = " newline";
        else if(this.cargo == Escape.TAB) cargo = " tab";
        else if(this.cargo == Escape.ENDOFFILE) cargo = " eof";
        else cargo = this.cargo;
        
        return "   " + this.lineIndex.toString() + "      " + this.colIndex.toString() + " " + cargo;
    }
}

//------------------------------------------------------------------------------
//  Scanner
//------------------------------------------------------------------------------

export class Scanner {
    
    sourceText: string;
    sourceIndex: number;
    lastIndex: number;
    lineIndex: number;
    colIndex: number;
    char: Character;
    c: string;

    constructor(sourceText: string) {
        this.sourceText = sourceText;
        this.sourceIndex = -1;
        this.lastIndex = sourceText.length - 1;
        this.lineIndex = 0;
        this.colIndex = -1;
    }

    get() {
        this.sourceIndex += 1;

        if(this.sourceIndex > 0) {
            if(this.sourceText[this.sourceIndex - 1] == '\n') {
                this.lineIndex += 1;
                this.colIndex = -1;
            }
        }

        this.colIndex += 1;

        if(this.sourceIndex > this.lastIndex) {
            this.char = new Character(Escape.ENDOFFILE, this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        } else {
            this.c = this.sourceText[this.sourceIndex];
            this.char = new Character(this.c, this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        }
        return this.char;
    }

    lookahead(offset: number) {
        let index: number = this.sourceIndex + offset;

        if(index > this.lastIndex) {
            return Escape.ENDOFFILE;
        } else {
            return this.sourceText[index];
        }
    }
}