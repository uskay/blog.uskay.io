import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-profile"
export class UskayProfile extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        super.render();
    }

    getStyle() {
        return `
            :host {
                display: block;
                width:100%;
                margin: 0px auto;
                padding-top:10px;
                padding-bottom:40px;
                color: #333;
                background-color: #f5f5f5;
            }
            h2 {
                padding: 10px 0px;    
                margin: 0px;
            }
            .profile-wrapper {
                max-width:800px;
                margin: 0 auto;
                padding-right: 10px;
                padding-left: 10px;
            }
            a:link { color: #2b546d; }
            a:visited { color: #2b546d; }
            a:hover { color: #2b546d; }
            a:active { color: #2b546d; }
            ul {
                font-size: 80%;
                padding-right:25px;
            }
            .profile-wrapper .profile-img {
                width:100px;
                height:100px;
                float:left;
                margin-right:20px;
                margin-bottom:5px;
            }
        `;
    }

    getTemplate(data) {
        return `
            <div class="profile-wrapper">
                <h2><code>$whoami</code></h2>
                <uskay-img class="profile-img" data-src="/img/footerme.png" data-width="100" data-height="100"></uskay-img>          
                <div style="font-size: 85%;">
                    宇都宮 佑亮（うつのみや　ゆうすけ）。Google シニア モバイル ソリューションズ コンサルタント。大学では政治学を専攻するも途中でWeb制作が楽しくなってしまい、卒業後日本IBMでアプリケーションエンジニアとしてエンタープライズシステム開発な世界に潜り込む。
                    Java 1.4.2の亡霊に長らく囚われつつも、2012年ごろのHTML5ブームですっかりWebテクノロジー中毒になり、2015年よりGoogleに入社。今は日本およびAPACのProgressive Web AppsとAMPの布教活動をさせて頂いておりますが、ただただ毎日トレンドに追いつくのに必死こいてます。
                    実際はウェブ『ボウズ』ではなく『スキンヘッド』なのですが、怖い人ではないのでご質問・ご指摘等はTwitterまでお気軽にお問い合わせください。
                    当サイトにおけるすべてのコンテンツは私の個人的見解によるものであり私の雇用者の意見を代弁するものではありません。
                </div>
                <h3>恐れ多くも人前に立たせてもらったりしてます</h3>
                <hr>
                <ul>
                    <li>Google Developers Japan | <a href="https://www.youtube.com/watch?v=iVvQUOOhBuU" target="_blank">AMP最新情報: ECでも使える！インタラクティブなAMPの作り方</a></li>
                    <li>Google Developers Korea | <a href="https://www.youtube.com/watch?v=o09oKq1K1Zs" target="_blank">Building beautiful, interactive AMP pages for e-commerce & beyond</a></li>
                    <li>Web Directors Forum | <a href="http://wdf.jp/report/report-wdf28.html" target="_blank">WDF Vol.28 モバイルUX向上のためのAMPとPWA</a></li>
                    <li>HTML5j Webプラットフォーム部 | <a href="https://codeiq.jp/magazine/2018/01/56804/" target="_blank">今からでも遅くない！Progressive Web Apps超入門！</a></li>
                </ul>
                <h3>たまに記事も書いたりしてます</h3>
                <hr>
                <ul>
                    <li>Think with Google Japan | <a href="https://apac.thinkwithgoogle.com/intl/ja_ALL/collections/optimize-to-mobile.html" target="_blank">モバイルに最適化されたユーザー体験</a></li>
                    <li>Think with Google APAC | <a href="https://apac.thinkwithgoogle.com/intl/en/case-studies/japanese-retailer-belluna-mobile-experience-leads-impressive-sales-lift.html" target="_blank">Japanese Retailer’s Smoother Mobile Experience Leads To Impressive Sales Lift</a></li>
                    <li>AdWords Blog | <a href="https://www.ja.advertisercommunity.com/t5/%E3%83%96%E3%83%AD%E3%82%B0%E8%A8%98%E4%BA%8B/Google-%E3%81%8C%E6%B3%A8%E5%8A%9B%E3%81%99%E3%82%8BAMP-%E3%81%A8-PWA-%E3%81%AE%E6%8E%A1%E7%94%A8%E3%81%A7%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%82%B3%E3%83%B3%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%92%E3%81%95%E3%82%89%E3%81%AB%E5%8A%A0%E9%80%9F%E3%81%95%E3%81%9B%E3%81%9F%E3%83%99%E3%83%AB%E3%83%BC%E3%83%8A%E3%81%AE%E4%BA%8B%E4%BE%8B/ba-p/45989#" target="_blank">AMP と PWA の採用でモバイルコンバージョンをさらに加速させたベルーナの事例</a></li>
                </ul>
                <h3>ソーシャル</h3>
                <hr>
                <ul>
                    <li>Twitter | <a href="https://twitter.com/uskay" target="_blank">@uskay</a></li>
                    <li>Github | <a href="https://github.com/uskay/blog.uskay.io" target="_blank">このブログのソース</a></li>
                </ul>
            </div>
        `;
    }

}
customElements.define(COMPONENT_NAME, UskayProfile);