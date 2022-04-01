import { Component } from './component.js';
export class Image extends Component {
  constructor(src, width, height, shouldLoadLazy) {
    super();
    this.src = src;
    this.width = width;
    this.height = height;
    this.shouldLoadLazy = true;
    if (shouldLoadLazy === false) {
      this.shouldLoadLazy = false;
    }
  }
  getCss() {
    return this.css/* css */`
      .img-wrapper {
        width: 100%;
        position: relative;
        margin-bottom: 15px;
      }
      .img-wrapper > img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    `;
  }
  getHtml() {
    return this.html/* html */`
      <div class="img-wrapper" style="padding-top: ${this.height / this.width * 100}%;">
        ${(_ => {
        if (this.shouldLoadLazy) {
          return `<img data-src="${this.src}" alt="todo-add-alt" loading="lazy" style="display: none">`;
        } else {
          return `<img src="${this.src}" alt="todo-add-alt" loading="lazy">`;
        }
      })()}
      </div>
    `;
  }
  getJs() {
    return this.js/* javascript */`
      const lazyLoadImg = _ => {
        const callback = (entries, observer) => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              const imgElm = entry.target.querySelector('img');
              const src = imgElm.getAttribute('src');
              const dataSrc = imgElm.getAttribute('data-src');
              if (!src && dataSrc) {
                imgElm.setAttribute('src', dataSrc);
                imgElm.style.display = 'block';
              };
              observer.unobserve(entry.target);
            };
          });
        };
        const observer = new IntersectionObserver(callback);
        document.querySelectorAll('.img-wrapper').forEach(elm => {
          observer.observe(elm);
        });        
      };
      window.addEventListener('DOMContentLoaded', _ => {
        lazyLoadImg();
      });      
    `;
  }
}