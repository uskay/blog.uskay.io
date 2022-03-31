# blog.uskay.io v2

🧨 Experimental Node.js based Static Site Generator for https://blog.uskay.io

## Background
I built v1 in 2018 to test out bunch of new web platform features and best practices (see blog post [here](https://blog.uskay.io/article/001-pwa-blog-loading) and the [snapshot branch](https://github.com/uskay/blog.uskay.io/tree/uskay-ui)) but ended up not maintainig things. Time passed and now in 2022, I thought of posting a new blog post and found out that many of the Node.js related libraries I was using were deprecated and/or needed update... and was stuck in an endless loop of fixing dependencies 🤮 

![node meme](https://cdn.glitch.global/d1d49b49-541b-4e26-8cd5-f7fa3a45e1aa/nodememe.jpg?v=1648655364487)

I'm now like, nah, let's just build another one 🤣 and here's the v2. The concepts of this new system are:
- To build a Node.js Static Site Generator, do not use 3P libraries (or at least try not to because I'm fed up with this dependency hell). The only library I ended up using was the one related to image optimization b/c I was not smart enough to build an image processor myself.
- But being able to build components as a "single file component" - having HTML, CSS and JavaScript (if needed) in a single file (really, w/o using any libraries like `htm`) and use it to make templates...
- but only using pure ES6 syntax, no jsx and such...
- with the ablity to have all scripts and styles inlined, treeshaked, minified...
- but for simplicity w/o using any 3P bundlers (b/c that does add on 3P dependencies!)...
- and can be maitaned and publishing new articles by just writing markdowns.

This time, I'm not that much pickie in the Lighthouse scores, the best practices and thriving in making it work in all the browsers (i.e. the site doesn't transpile scripts and uses flex/grid styles w/o polyfil so it's basically for modern browsers that supports ES6 and such but I did test in IE11😛). I know things are not beautiful and far from perfection, but let's face it, that's life. Just make it work and I'm happy 🙌

## For my own sake
### Build
The default buld destination is `./public`. There are several options

- Build everything
```
npm run build
```
- Build articles only (since image optimization is not instant)
```
npm run build-article
```
- Build images only
```
npm run build-image
```

### Testing & deploying
Still using Firebase but now only using hosting and getting rid of functions.

- Testing (should open up http://localhost:5001/)
```
npm run dev
```
- Deploy
```
npm run prod
```

### How the Static Site Generator is built (Super high level summary)
The core implementation is under `./framework`
  - `/component`: "single file component"s. You can extend `Component` (from `component.js`) to build your own component. Override `getHtml()`, `getCss()` and `getJs()`. For `getHTML()` return a String. For `getCss()` and `getJs()`, always use `this.css.add()` and `this.js.add()` to remove all the duplicates (they are `Set`s). Similary, there's `getMeta()` and `this.meta.add()`. If you'd like to include other components to build a new component, use `this.use(new SomeComponentYouWantToUse())` to get the html string and include that directly in the `getHtml()`'s template literal. I recommend to use VSCode extensions like [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) and [es6-string-javascript](https://marketplace.visualstudio.com/items?itemName=zjcompt.es6-string-javascript) to make the component readable.
```javascript
import { Component } from './component.js';
export class Example extends Component {
  getCss() {
    return this.css.add(/* css */`
      .example {
        width: 100%;
        height: 50px;
        display: none;
    }
    `);
  }
  getJs() {
    return this.js.add(/* javascript */`
      window.addEventListener('load', _ => {
        document.querySelector('.example').style = 'block';
      });
    `);
  }
  getHtml() {
    const name = 'uskay';
    return /* html */`
      <div class="example">
        My name is ${name}
      </div>
  `;
  }
}
```
  - `/route`: everything related to page templates
  - `/build`: build scripts are there. Extend the `Task` class (from `task.js`) to add build related scripts and remember to add them to the `task-runner.js`.

`./blog` is the directory to write & store your blog post. There should be individual folders per each article and add a markdown file and `img/` for images to publish a post. `settings.json` is for the settings (obviously).

## License
Codes are Apache 2.0
