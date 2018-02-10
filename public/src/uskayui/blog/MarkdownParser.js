/**
 * Parses markdown to innerHTML String
 */
export class MarkdownParser {

    constructor(md) {
        this.md = md.replace(/</g, "&lt;").replace(/>/g,"&gt;");
        this.previouseRow;
        this.Row = class Row {
            constructor(row, isOl, isUl, isBlock) {
                this.row = row;
                this.isOl = isOl === undefined ? false : isOl;
                this.isUl = isUl === undefined ? false : isUl;
                this.isBlock = isBlock;
            }
            getInnerHTML() {
                if(this.isOl === true || this.isUl === true || this.isBlock === true) {
                    return this.row;
                }
                return `${this.row}<br>`;
            }
            createNewRow(regex, replace) {
                return new Row(this.row.replace(regex, replace), this.isOl, this.isUl, this.isBlock)
            }

            /**
             * Block elements
             */
            parseArticleHeader() {
                const regex = /^{"header":(.+)}$/;
                let result = this.row.match(regex);
                if(result) {
                    this.isBlock = true;
                    let metaData = JSON.parse(result[1]);
                    return new Row(`<uskay-article-header data-title="${metaData.title}" data-subtitle="${metaData.subtitle}" data-date="${metaData.date}"></uskay-article-header>`)
                }
                return this;
            }
            parseArticleFooter() {
                const regex = /^{"footer":(.+)}$/;
                let result = this.row.match(regex);
                if(result) {
                    this.isBlock = true;
                    let metaData = JSON.parse(result[1]);
                    return new Row(`<uskay-article-footer data-title="${metaData.title}" data-text="${metaData.text}" data-url="${metaData.url}"></uskay-article-footer>`)
                }
                return this;
            }
            parseH1() {
                const regex = /^#\s(.+)/;
                const replace = `<h1>$1</h1>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseH2() {
                const regex = /^##\s(.+)/;
                const replace = `<h2>$1</h2>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseH3() {
                const regex = /^###\s(.+)/;
                const replace = `<h3>$1</h3>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseHR() {
                const regex = /^----$/;
                const replace = `<hr>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseShowMore() {
                const regex = /^====$/;
                const replace = `<div id="show-more">
                                    <div style="text-align:center;margin-top:50px;">
                                        Loading...
                                    </div>
                                </div>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseBlockQuote() {
                const regex = /^>(.+)/;
                const replace = `<blockquote>$1</blockquote>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseGist() {
                const regex = /^```gist\s(.+)```$/;
                const replace = `<uskay-gist data-gistId=$1></uskay-gist>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }
            parseImg() {
                const regex = /^!\[.+\]\((.+)\s(\d+)x(\d+)\)$/;
                const replace = `<uskay-img data-src=$1 data-width=$2 data-height=$3></uskay-img>`;
                if(this.row.match(regex)) {
                    this.isBlock = true;
                    return this.createNewRow(regex, replace);
                }
                return this;
            }

            /**
             * Inline elements
             */
            parseStrong() {
                return this.createNewRow(/\*\*(.+?)\*\*/g, `<b>$1</b>`);
            }
            parseEmphasis() {
                return this.createNewRow(/\*(.+?)\*/g, `<em>$1</em>`);
            }
            parseLink() {
                return this.createNewRow(/\[(.+?)\]\((https?:\/\/.+?)\)/g, `<a href="$2" target="_blank">$1</a>`);
            }
            parseCode() {
                return this.createNewRow(/`(.+?)`/g, `<code>$1</code>`);
            }

            /**
             * Ol / Ul lists
             */
            parseList() {
                const regexOl = /^[00-99]\.\s(.+)$/;
                const regexUl = /^-\s(.+)$/;
                const replace = `<li>$1</li>`;
                if(this.row.match(regexOl)) {
                    if(this.isOl === false) {
                        this.isOl = true;
                        return this.createNewRow(regexOl, `<ol>${replace}`);        
                    } 
                    return this.createNewRow(regexOl, replace);        
                } else if (this.row.match(regexUl)){
                    if(this.isUl === false) {
                        this.isUl = true;
                        return this.createNewRow(regexUl, `<ul>${replace}`);        
                    } 
                    return this.createNewRow(regexUl, replace);        
                } else {
                    if(this.isOl === true){
                        this.isOl = false;
                        return this.createNewRow(/^/, `</ul>`);        
                    } else if (this.isUl === true){
                        this.isUl = false;
                        return this.createNewRow(/^/, `</ul>`);        
                    }
                    else return this;
                }
            }
        }
    }

    getMarkUp() {
        let markUp = [];
        this.md.split("\n").forEach(
            line => {
                let row = this.createRow(line);
                markUp.push(row.getInnerHTML());
                this.previouseRow = row;
            }
        );
        return markUp.join("");
    }

    createRow(row) {
        let isOl = false;
        let isUl = false;
        let isBlock = false;
        if(this.previouseRow){
            isOl = this.previouseRow.isOl;
            isUl = this.previouseRow.isUl;
        }
        return new this.Row(row, isOl, isUl, isBlock)
            /** Try block elements first **/
            .parseArticleHeader()
            .parseArticleFooter()
            .parseH1()
            .parseH2()
            .parseH3()
            .parseHR()
            .parseShowMore()
            .parseGist()
            .parseBlockQuote()
            .parseImg()
            /** Try inline elements next **/
            .parseStrong()
            .parseLink()
            .parseEmphasis()
            .parseCode()
            /** Lastly, parse Ol Ul lists **/
            .parseList();
    }

}

