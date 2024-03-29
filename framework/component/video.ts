import { Component } from './component.js';
export class Video extends Component {
  src: string;
  width: number;
  height: number;
  constructor(src: string, width: number, height: number) {
    super();
    this.src = src;
    this.width = width;
    this.height = height;
  }
  getCss(): Set<string> {
    return this.css/* css */`
      .video-wrapper {
        width: 100%;
        position: relative;
        margin-bottom: 15px;
      }
      .video-wrapper > iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    `;
  }
  getHtml(): string {
    return this.html/* html */`
      <div class="video-wrapper" style="padding-top: ${(this.height / this.width * 100).toString()}%;">
        <iframe class="video" loading="lazy" src=${this.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
      </div>
    `;
  }
}
