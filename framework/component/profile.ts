import { Component } from './component.js';
export class Profile extends Component {
  getCss(): Set<string> {
    return this.css/* css */`
      .profile {
        width: 100%;
        color: #a3a2a2;
        font-size: 0.8em;
    }
    `;
  }
  getHtml(): string {
    return this.html/* html */`
      <div class="profile">
        <h2 id="whoami">$whoami</h2>
        <div>
        Yusuke Utsunomiya (宇都宮 佑亮). Working on the Web Platform but mostly just a big fan of the web and its ecosystem. APAC Manager & Staff Partner Solutions Engineer 
        @Google. Ex Systems Engineer @IBM. Opinions are my own.
        </div>
        <div>
          <ul>
            <li><a href="https://github.com/uskay/blog.uskay.io">GitHub</a></li>    
            <li><a href="https://twitter.com/uskay">Twitter (Inactive)</a></li>
            <li><a href="https://www.linkedin.com/in/yusuke-utsunomiya-99948434/">LinkedIn</a></li>
          </ul>
        </div>
        <h2>Presentation</h2>
        <div>
          <ul>
            <li>Chrome Dev Summit | <a href="https://www.youtube.com/watch?v=X2zqwMBBvIs">In which we make loading disappear with 'portal' and friends</a></li>    
            <li>INEVITABLE TV | <a href="https://www.youtube.com/watch?v=_V7Q7liFtew">PWA (Progressive Web Apps) への不可避な流れ</a></li>
            <li>AMP Conf | <a href="https://youtu.be/W7T5tMgrrFs?t=2431">Opening & Moderation</a></li>
            <li>Google Developers Korea | <a href="https://www.youtube.com/watch?v=o09oKq1K1Zs">Building beautiful, interactive AMP pages for e-commerce & beyond</a></li>
            <li>など</li>
          </ul>
          </div>
        <h2>Article</h2>
        <div>
          <ul>
            <li>web.dev | <a href="https://web.dev/web-bundles/">Get started with Web Bundles</a></li>    
            <li>web.dev | <a href="https://web.dev/five-ways-airshift-improved-their-react-app/">Five ways AirSHIFT improved their React app's runtime performance</a></li>
            <li>web.dev | <a href="https://web.dev/hands-on-portals/">Hands-on with Portals: seamless navigation on the Web</a></li>
            <li>HTML5 Experts.jp | <a href="https://html5experts.jp/uskay/25391/">「改めまして、Progressive Web Appsと申します」── Web UXの新たな基準を考える</a></li>
            <li>など</li>
          </ul>
        </div>
      </div>
  `;
  }
}