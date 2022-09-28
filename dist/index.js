/* 
1. facebook
2. twitter
3. linkedin
4. messenger
5. blogger
6. gmail
7. whatsapp
8. viber
9. skype
10. telegram
11. pinterest
12. print
*/

let l = (w) => console.log(w);
class ShareMe {
    // static initialized = false;
    constructor(selector, customSettings) {
        if (!document.querySelector(selector))
            throw (': Invalid Selector Provided.');
        this.selector = selector;
        this.localSelector = document.querySelector(selector);
        this.modalId = Math.floor(Math.random() * 10000);

        this.defaultSettings = {
            style: "inline",
            modalBgColor: "white",
            modalTextColor: "black",
            modalOverlayColor: "rgba(0, 0, 0, 0.4)",
            modalAccentColor: "black",
            fontFamily: "",
            primaryButtons: "facebook,twitter,linkedin,gmail",
            modalButtons: "blogger,facebook,gmail,linkedin,messenger,pinterest,print,skype,telegram,twitter,viber,whatsapp",
            showClipboardLink: true,
            buttonBorderRadius: "12px",
        }

        this.settings = {};

        if (!ShareMe.initialized) {
            this._init();
            ShareMe.initialized = true;
        }

        this.configureSettings(customSettings);

        let t = "";
        switch (this.settings.style) {
            case 'inline':
                t = document.createElement('div');
                t.setAttribute('class', 'shareMeInline');
                this.localSelector.appendChild(t);
                this.localSelector = document.querySelector('.shareMeInline');
                this.localSelector.classList.add('hidden-print');
                break;

            case 'desktop':
                t = document.createElement('div');
                t.setAttribute('class', 'shareMeDesktop');
                this.localSelector.appendChild(t);
                this.localSelector = document.querySelector('.shareMeDesktop');
                this.localSelector.classList.add('hidden-print');
                break;

            case 'mobile':
                t = document.createElement('div');
                t.setAttribute('class', 'shareMeMobile');
                this.localSelector.appendChild(t);
                this.localSelector = document.querySelector('.shareMeMobile');
                this.localSelector.classList.add('hidden-print');
                break;

            default:
                // "Inline" by default 
                t = document.createElement('div');
                t.setAttribute('class', 'shareMeInline');
                this.localSelector.appendChild(t);
                this.localSelector = document.querySelector('.shareMeInline');
                this.localSelector.classList.add('hidden-print');
                break;
        }
        this.pageUrl = window.location.href;
        this.title = document.title || this.pageUrl;

        this.availableNetworks = ['blogger', 'facebook', 'gmail', 'linkedin', 'messenger', 'pinterest', 'print', 'skype', 'telegram', 'twitter', 'viber', 'whatsapp'];

        this.network = JSON.parse('{"blogger":{"shareUrl":"https://www.blogger.com/blog-this.g?n={{title}}&t=&u={{url}}","iconClass":"fa-brands fa-blogger","_blank":true,"popup":true},"facebook":{"shareUrl":"https://www.facebook.com/sharer.php?t={{title}}&u={{url}}","iconClass":"fa-brands fa-facebook-f","_blank":true,"popup":true},"gmail":{"shareUrl":"https://mail.google.com/mail/u/0/?to&su={{title}}&body={{url}}&bcc&cc&fs=1&tf=cm","iconClass":"fa-solid fa-inbox","_blank":true,"popup":true},"linkedin":{"shareUrl":"https://www.linkedin.com/shareArticle?title={{title}}&url={{url}}","iconClass":"fa-brands fa-linkedin-in","_blank":true,"popup":true},"messenger":{"shareUrl":"https://www.facebook.com/dialog/send?link={{url}}&app_id={{appId}}&redirect_uri={{url}}","iconClass":"fa-brands fa-facebook-messenger","_blank":true,"popup":true},"pinterest":{"shareUrl":"https://www.pinterest.com/pin/create/button/?url={{url}}","iconClass":"fa-brands fa-pinterest","_blank":true,"popup":true},"print":{"shareUrl":"null","iconClass":"fa-solid fa-print","_blank":false,"popup":false},"share":{"shareUrl":null,"iconClass":"fa-solid fa-share-nodes","_blank":false,"popup":false},"skype":{"shareUrl":"https://web.skype.com/share?url={{url}}&text={{title}}","iconClass":"fa-brands fa-skype","_blank":true,"popup":true},"telegram":{"shareUrl":"https://t.me/share/url?url={{url}}&text={{title}}&to=","iconClass":"fa-brands fa-telegram","_blank":true,"popup":true},"twitter":{"shareUrl":"https://twitter.com/intent/tweet?text={{title}}&url={{url}}","iconClass":"fa-brands fa-twitter","_blank":true,"popup":true},"viber":{"shareUrl":"viber://forward?text={{url}}","iconClass":"fa-brands fa-viber","_blank":false,"popup":false},"whatsapp":{"shareUrl":"https://web.whatsapp.com/send?text={{url}}","iconClass":"fa-brands fa-whatsapp","_blank":true,"popup":true}}');

        this.renderElementByAppend(this.prepareModal(this.prepareModalButtons(), this.pageUrl), false);
        this.renderElementByAppend(this.preparePrimaryButtons());
        this.modalOpenDismiss();
        this.clipboard();
        this.coreShare();

    }
    // Init function
    _init() {
        this.injectFontawesome();
    }


    // Inject FontAwesome Icons
    injectFontawesome() {
        var headHTML = document.getElementsByTagName('head')[0].innerHTML;
        headHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"         integrity = "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin = "anonymous" referrerpolicy = "no-referrer" /> ';
        document.getElementsByTagName('head')[0].innerHTML = headHTML;
    }

    // Configure Settings
    configureSettings(customSettings) {
        this.settings = Object.assign({}, this.defaultSettings, customSettings)
    }

    // Preapre Primary Buttons
    preparePrimaryButtons() {
        const pButtons = this.settings.primaryButtons.replace(/\s/g, '').split(',');
        let innerWrapper = document.createElement('div');
        innerWrapper.classList.add('innerWrapper');

        pButtons.forEach(item => {
            if (this.availableNetworks.includes(item)) {
                // Start :: ============================================
                // <span class="bgFacebook textWhite">
                //     <i class="fa-brands fa-facebook-f"></i>
                // </span>
                // ============================================
                let span = document.createElement('span');
                span.classList.add(`bg${item.charAt(0).toUpperCase() + item.slice(1)}`);
                span.classList.add('textWhite');
                span.dataset[`network_${this.modalId}`] = item;

                let icon = document.createElement('i');
                let iconClasses = this.network[item].iconClass.split(' ');
                iconClasses.forEach(c => icon.classList.add(c));

                span.appendChild(icon);
                // End :: ============================================
                innerWrapper.appendChild(span);
            } else {
                l('Invalid option encountered')
            }
        });
        // Start :: ============================================
        // <span class="bgShare" onclick="toggleModal()">
        //     <i class="fa-solid fa-share-nodes"></i>
        // </span>
        // ============================================
        let span = document.createElement('span');
        span.classList.add(`bgShare`);
        span.dataset.modal = this.modalId;
        let icon = document.createElement('i');
        let iconClasses = this.network['share'].iconClass.split(' ');
        iconClasses.forEach(c => icon.classList.add(c));
        // End :: ============================================

        span.appendChild(icon);
        innerWrapper.appendChild(span);
        return innerWrapper;
    }

    // Prepare Modal 
    prepareModal(shareBtns, url) {
        let modalTemplete =
            `<div class="shareMeModal shareMeModal-${this.modalId} hide" style=" background-color: ${this.settings.modalOverlayColor};">
            <div class="modalContent" style="background-color:${this.settings.modalBgColor}">
                <div class="modalHeader">
                    <p style="color:${this.settings.modalTextColor};">Share on</p>
                    <span class="modal-dismiss" data-dismiss=".shareMeModal-${this.modalId}" style="color:${this.settings.modalTextColor};">&times;</span>
                </div>
                {{shareBtns}}
                <hr>
                <div class="modalFooter">
                    <p style="color:${this.settings.modalTextColor};">Directly share the link</p>
                    <div class="shareLinkWrapper">
                        <input type="url" style="background-color:${this.settings.modalBgColor};color:${this.settings.modalTextColor};border-color:${this.settings.modalAccentColor}" value="{{url}}" readonly>
                        <button style="background-color:${this.settings.modalAccentColor}">
                            <i class="fa-solid fa-clipboard"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`

        modalTemplete = modalTemplete.replace('{{shareBtns}}', shareBtns.outerHTML);
        modalTemplete = modalTemplete.replace('{{url}}', url);
        return modalTemplete;
    }
    // Prepare Modal Buttons
    prepareModalButtons() {
        const pButtons = this.settings.modalButtons.replace(/\s/g, '').split(',');
        let shareBtns = document.createElement('div');
        shareBtns.classList.add('shareBtns');

        pButtons.forEach(item => {
            if (this.availableNetworks.includes(item)) {
                // Start :: ============================================
                // <button class="bgBlogger textWhite" data-network="blogger">
                //     <i class="fa-brands fa-blogger"></i>
                //     Blogger
                // </button>
                // ============================================
                let button = document.createElement('button');
                button.classList.add(`bg${item.charAt(0).toUpperCase() + item.slice(1)}`);
                button.classList.add('textWhite');
                button.dataset[`network_${this.modalId}`] = item;

                let icon = document.createElement('i');
                let iconClasses = this.network[item].iconClass.split(' ');
                iconClasses.forEach(c => icon.classList.add(c));

                button.appendChild(icon);

                let spann = document.createElement('span');
                spann.innerHTML = item.charAt(0).toUpperCase() + item.slice(1);
                button.appendChild(spann)
                // End :: ============================================

                shareBtns.appendChild(button);
            } else {
                l('Invalid option encountered')
            }
        });
        return shareBtns;
    }
    // Render the Primary Buttons
    renderElementByAppend(content, isNodeList = true) {
        (isNodeList) ?
            this.localSelector.appendChild(content) :
            this.localSelector.innerHTML += content;
    }

    // Modal Open and Dismiss
    modalOpenDismiss() {
        document.querySelectorAll('[data-modal]').forEach(e => {
            e.addEventListener('click', () => {
                document.querySelector('.shareMeModal-' + e.dataset.modal).classList.add('show');
            });
        });

        let modalDissmissBtn = this.localSelector.querySelectorAll('[data-dismiss]');
        modalDissmissBtn.forEach((d) => {
            d.addEventListener('click', () => document.querySelector(d.dataset.dismiss).classList.remove('show'));
        })
    }

    // Copy To Clipboard
    clipboard() {
        const clipboardCopyBtn = this.localSelector.querySelector('.shareLinkWrapper button');
        clipboardCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this.pageUrl).then(function () {
                alert('Link copied to your clipboard');
            }, function (err) {
                alert('Unable to copy link to your clipboard');
            });
        })
    }

    // Open Share Window
    openShareWindow(url, _blank, popup) {
        window.open(url, _blank ? '_blank' : '', popup ? 'popup' : '').focus();
    }

    // Handle Core Share
    coreShare() {
        let networks = document.querySelectorAll(`[data-network_${this.modalId}]`);
        networks.forEach((network) => {
            network.addEventListener('click', () => {
                let networkUrl = "",
                    title = encodeURI(this.title),
                    url = encodeURI(this.pageUrl),
                    net = network.dataset[`network_${this.modalId}`];
                switch (net) {
                    case 'print':
                        window.print();
                        break;
                    default:
                        networkUrl = this.network[net].shareUrl;
                        networkUrl = networkUrl.replaceAll('{{title}}', title);
                        networkUrl = networkUrl.replaceAll('{{appId}}', 291494419107518);
                        networkUrl = networkUrl.replaceAll('{{url}}', url);
                        this.openShareWindow(networkUrl, this.network[net]._blank, this.network[net].popup);
                        break;
                }
            });
        })
    }
}