import {UskayUI} from "./UskayUI.js";
import {UskayImg} from "./UskayImg.js";

const COMPONENT_NAME = "uskay-global-header";
export class UskayGlobalHeader extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        const data = {
            blogTitle: "ウェブボウズ",
            profileImgSrc: "/img/headerme.png",
            profileImgWidth: "400",
            profileImgHeight: "400",
            profileImgBorderRadius: "50%",
            name: "Yusuke Utsunomiya",
            jobTitle: "Senior Mobile Solutions Consultant, Google"
        }
        super.render(data);        
    }

    getStyle() {
        return `
                :host {
                    display:table; 
                    margin:0 auto;
                    color: #FFF;
                    cursor: pointer;
                }
                .blog-title {
                    float: left;
                    padding-right:30px;
                    font-size: 48px;
                    font-family: 'Nico Moji', -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI","Noto Sans Japanese","ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
                }
                .header-profile {
                    float:left;
                    margin-top:18px;
                }
                .header-profile .profile-img {
                    float:left;
                    padding-left:30px;
                    border-left: 1px solid #FFF;
                    width:50px;
                    height:50px;
                }
                @media all and (min-width: 700px) {
                    .header-profile .profile-description {
                        float: left;
                        text-align: left;
                        padding-left:10px;
                    }
                    .header-profile .profile-description .name {
                        font-size: 120%; 
                        font-weight: 700;
                    }
                    .header-profile .profile-description .job-title {
                        font-size: 80%; 
                        margin-top:-5px;              
                    }
                }
                @media all and (max-width: 699px) {
                    .blog-title {
                        font-size: 30px;
                        padding: 0px;
                    }
                    .header-profile {
                        margin-top: 14px;
                    }
                    .header-profile .profile-img {
                        width: 30px;
                        height: 30px;
                        border: none;
                        padding-left:10px;
                    }
                    .header-profile .profile-description {
                        display:none;
                    }
                }
        `;
    }

    
    getTemplate(data) {
        const dummy = document.querySelector("#dummyHeader")
        if(dummy) dummy.style.display = "none";
        return `            
            <div class="blog-title">${data.blogTitle}</div>
            <div class="header-profile">
                <div class="profile-img">
                    <uskay-img 
                        data-src="${data.profileImgSrc}" 
                        data-width="${data.profileImgWidth}" 
                        data-height="${data.profileImgHeight}"
                        data-border-radius="${data.profileImgBorderRadius}"
                        >
                    </uskay-img>
                </div>
                <div class="profile-description">
                    <div class="name">${data.name}</div>
                    <div class="job-title">${data.jobTitle}</div>
                </div>
            </div>
        `;
    }

    addEvents() {
        Array.from(this.shadowRoot.querySelectorAll("div")).map(div => {
            div.addEventListener("click", () => {
                location.href = "/";
            });
        });
    }

}
customElements.define(COMPONENT_NAME, UskayGlobalHeader);