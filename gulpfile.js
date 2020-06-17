const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");
const uglify = require('gulp-uglify-es').default;
const through = require('through2');
const path = require('path');
const File = require('vinyl');
const fs = require('fs');

gulp.task("splitMd", function() {
    return gulp.src("./public/md/raw/*.md")
        .pipe(through.obj(function (file, enc, cb) {
            const base = "./public/md/";
            const name = path.basename(file.path);
            console.log(name);
            const splitContents = file.contents.toString().split("====\n");
            const createNewFile = (base, name, content) => {
                var file = new File({
                    base: base,
                    path: path.join(base, name),
                    contents: new Buffer(content)
                });
                this.push(file);
            }
            createNewFile(base, `${name.match(/(.+)\.md/)[1]}.md`, `${splitContents[0]}====`);
            createNewFile(base, `${name.match(/(.+)\.md/)[1]}-all.md`, splitContents[1]);
            cb();
        }))
        .pipe(gulp.dest("./public/md/"));
})

gulp.task("uglify", function () {
    return gulp.src("./public/src/uskayui/blog/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./public/src/uskayui/blog/min"));
});

gulp.task('webpack', () =>
    webpackStream(webpackConfig, webpack).pipe(gulp.dest("./public/src/uskayui/blog/bundle/"))
);

gulp.task('imgMin', () =>
	gulp.src('./public/img/raw/**/*.png', {base: './public/img/raw/'})
		.pipe(imagemin())
		.pipe(gulp.dest('./public/img/'))
);

gulp.task('imgMinArticle', () =>
	gulp.src('./public/img/article/raw/*.{jpg,png}', {base: './public/img/article/raw/'})
		.pipe(imagemin())
		.pipe(gulp.dest('./public/img/article/'))
);

gulp.task('imgResize', () => {
    gulp.src('./public/img/article/raw/*.{jpg,png}')
        .pipe(imageResize({
            width : 700,
            upscale : false
        }))
        .pipe(gulp.dest('./public/img/article/'));
});

gulp.task('generateIcon', () => {
    [16, 192, 512].map(size => {
        gulp.src("./public/img/icon-raw.png")
            .pipe(imageResize({ width : size }))
            .pipe(rename(`./public/img/icon-${size}.png`))
            .pipe(gulp.dest("./"));
    })
});

gulp.task("validPath", ()=>{
    fs.readFile('./public/json/articlelist.json', function(err, data) {
        const articleList = JSON.parse(data.toString()).articles;
        const render = (strings, articleList) => {
            const urlSet = new Set();
            articleList.map(data => urlSet.add(data.link));
            const operations = [];
            Array.from(urlSet.values()).map(url => operations.push(`this.urlSet.add("${url}");`));
            return `${strings[0]}${operations.join(" ")}${strings[1]}`
        }
        const scriptTemplate = render`
            /** Auto generated module */
            class ArticlePathValidator {
                constructor(path){
                    this.urlSet = new Set();
                    ${articleList}
                    this.path = path;
                }
                isValid() {
                    return this.urlSet.has(this.path);
                }
                getAllPathSet() {
                    return this.urlSet;
                }
            }
            module.exports = ArticlePathValidator;
        `
        fs.writeFileSync( "./functions/ArticlePathValidator.js" , scriptTemplate)
    });
})

gulp.task("versioning", ()=>{
    const version = `v${Date.now()}`;
    const scriptTemplate = `
            /** Auto generated module */
            class BuildVersion {
                getVersion() {
                    return '${version}';
                }
            }
            module.exports = BuildVersion;
        `
    fs.writeFileSync( "./functions/BuildVersion.js" , scriptTemplate)
})

gulp.task("metaTag", ()=>{
    fs.readFile('./public/json/articlelist.json', function(err, data) {
        const articleList = JSON.parse(data.toString()).articles;
        const render = (strings, articleList) => {
            const operations = [];
            articleList.map(data => {
                operations.push(`this.metaMap.set("${data.link}", {title:'${data.title}',subtitle:'${data.subtitle}',imgsrc:'${data.imgsrc}'});`)
            });
            return `${strings[0]}${operations.join("")}${strings[1]}`
        }

        const scriptTemplate = render`
            /** Auto generated module */
            class MetaTagUtil {
                constructor() {
                    this.metaMap = new Map();
                    ${articleList}
                }
                
                getMetaTag(path) {
                    return \`
                        <title>\$\{this.metaMap.get(path).title\} | ウェブボウズ</title>
                        <meta property="og:title" content="\$\{this.metaMap.get(path).title\}" />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content="\$\{path\}" />
                        <meta property="og:image" content="https://blog.uskay.io\$\{this.metaMap.get(path).imgsrc\}" />
                        <meta property="og:site_name" content="ウェブボウズ" />
                        <meta property="og:description" content="\$\{this.metaMap.get(path).subtitle\}" />
                        <meta property="fb:app_id" content="1786319984995103" />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:site" content="@uskay" />
                        <meta name="twitter:creator" content="@uskay" />
                        <link rel="apple-touch-icon" href="/img/icon-192.png">
                        \`
                }
            }
            module.exports = MetaTagUtil;
        `
        fs.writeFileSync( "./functions/MetaTagUtil.js" , scriptTemplate)
    });
})

gulp.task('default', [
    　　"webpack", 
        "imgResize", 
        "generateIcon", 
        'imgMin', 
        'imgMinArticle', 
        "validPath", 
        "versioning", 
        "metaTag", 
        "splitMd"
    ]);