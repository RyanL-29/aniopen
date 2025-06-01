const version = "2.0.3"

//Smooth scroll
// document.write(`<script src="https://cdn.jsdelivr.net/gh/idiotWu/smooth-scrollbar@develop/dist/smooth-scrollbar.js"></script>`);
// document.write(`<script src="https://cdn.jsdelivr.net/gh/idiotWu/smooth-scrollbar@develop/dist/plugins/overscroll.js"></script>`);

document.write(`<link rel="icon" type="image/x-icon" href="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/favicon.ico">`)
document.write('<link rel="stylesheet" href="https://unpkg.com/mdui@1.0.2/dist/css/mdui.min.css" />');
document.write('<script src="https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js"></script>');
document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css">');
document.write(`<link rel="manifest" href="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen@${version}/manifest.json">`);
document.write('<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/pwa_icon/192x192nt.png">');
// markdown支持
document.write('<script src="https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
// DPlayer API
document.write(`<script src="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen@${version}/DPlayer.min.js"></script>`);
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');

// Cloudflare underscore function
document.write(`<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>`);


// 初始化页面，并载入必要资源
function init() {
    document.siteName = $('title').html();
    $('body').addClass("mdui-theme-primary-blue-grey mdui-theme-accent-blue mdui-color-grey-800");
    var html = `
    <style>
    /* Tooltip text */
    .tool_tip {
        visibility: hidden;
        position: absolute;
        width: auto;
        height: auto;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 3px 5px 3px 5px;
        border-radius: 4px;
        z-index: 1;
        opacity: 0;
        transition: opacity .3s;
        font-size:0.8em;
        line-height: 1pc;
    }
    .tool_tip {
        top: 80%;
        left: 0%;
    }
    /* Show the tooltip text when you mouse over the tooltip container */
    .mdui-list-item:hover .tool_tip {
    visibility: visible;
    opacity: 1;
    }

    .mdui-list-item{
        overflow:visible;
    }
    /* Subtitle */
    .dplayer-subtitle {
        display: inline-block;
        white-space: pre-wrap;
        color: #fff!important;
        font-weight: bold!important;
        text-shadow: -1px 1px 2px #000,1px 1px 2px #000,1px -1px 0 #000,-1px -1px 0 #000!important;
    }
    .dplayer-video-wrap {
        font-size: 150%;
    }
    @media only screen and (max-device-width: 1020px) {
        .dplayer-subtitle{
            font-size: 4vw!important
        }
    }
    
    @media only screen and (max-device-width: 800px) {
        .dplayer-subtitle{
            font-size: 5vw!important
        }
    }

    html {
        background-color: #424242!important;
    }

    /* Scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
    background: transparent;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: grey; 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #FBFBFB; 
    }

    ::-webkit-scrollbar-track-piece:start {
        background: transparent;
        margin-top: 56px;
    }

    // .scrollbar-track {
    //     background: transparent;
    //     width: 5px;
    //     border-radius: 10px;
    //     margin-top: 56px;
    // }

    // .scrollbar-thumb {
    //     background: grey;
    //     border-radius: 10px;
    // }


    </style>
<header class="mdui-appbar mdui-color-grey-900 mdui-theme-layout-dark"> 
   <div id="nav" class="mdui-toolbar mdui-container">
   
   </div>
</header>
<div id="content" class="mdui-container"> 
</div>
  <footer>
    <p style="line-height: 0;">Project ANi</p>
    <div style="line-height: 0;">
    <p class="footer-ele"><a onclick="topFunction(); contactus();">聯絡我們</a></p><ins></ins>
    <p class="footer-ele"><a onclick="topFunction(); dmca();">DMCA</a></p>
    </div>
    <p class="footer-ele2">本網站只用作交流學習以及試看</p>
    <p class="footer-ele2">如發現網站有任何非法資源 請立即聯絡我們移除</p>
    </footer>`;
    $('body').html(html);
}

function render(path) {
    if (path.indexOf("?") > 0) {
        path = path.substr(0, path.indexOf("?"));
    }
    nav(path);
    if (path.substr(-1) == '/') {
        list(path);
    } else {
        file(path);
    }
}

var timeout2 = null;

function timeout() {
    document.getElementById("list").innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>';
    var delay = 1500;
    if (timeout2) {
        clearTimeout(timeout2);
    }
    timeout2 = setTimeout(function () {
        globalsearch();
    }, delay);
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function globalsearch() {
    var path = window.location.pathname;
    var input, filter;
    input = document.getElementById("searchinput");
    filter = input.value;
    $.post(path, '{"inputvalue":"' + filter + '"}', function (data, status) {
        var obj = jQuery.parseJSON(data);
        if (typeof obj != 'null' && obj.hasOwnProperty('error') && obj.error.code == '401') {
            var pass = prompt("Require a private token", "");
            localStorage.setItem('password' + path, pass);
            if (pass != null && pass != "") {
                list(path);
            } else {
                history.go(-1);
            }
        } else if (typeof obj != 'null') {
            list_files(obj.foldername, obj.files);
        }
    })
}

// 渲染 DMCA
function dmca() {
    nav("/DMCA");
    window.history.pushState('DMCA', 'Open ANi', '/DMCA');
    var content = `
    <h1>網站聲明</h1>
    <p>本網站是以轉載資源的方式運作，對所有資源的真實性、完整性及立場等，不負任何法律責任。本網站亦不承擔使用者將本網站資源用於盈利和/或非法目的之任何後果和/或法律責任。
    本網站資源皆從網上搜集轉載，不承擔任何技術及版權問題。
    下載鏈接僅供寬帶測試研究用途,請下載後在24小時內刪除,請勿用於商業目的。</p>
    <hr/>
    <h1>DMCA policy</h1>
    <p>This Digital Millennium Copyright Act policy (&quot;Policy&quot;) applies to the <a target="_blank" rel="nofollow" href="https://open.ani.rip">open.ani.rip</a> website (&quot;Website&quot;), &quot;Open ANi&quot; mobile application (&quot;Mobile Application&quot;) and any of their related products and services (collectively, &quot;Services&quot;) and outlines how this Website operator and Mobile Application developer (&quot;Operator&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) addresses copyright infringement notifications and how you (&quot;you&quot; or &quot;your&quot;) may submit a copyright infringement complaint.</p>
    <p>Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act (&quot;DMCA&quot;) of 1998, the text of which can be found at the U.S. Copyright Office <a target="_blank" href="https://www.copyright.gov" rel="noopener">website</a>.</p>
    <h2>What to consider before submitting a copyright complaint</h2>
    <p>Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.</p>
    <p>Please note that if you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.</p>
    <p>The DMCA requires you to provide your personal information in the copyright infringement notification. If you are concerned about the privacy of your personal information, you may wish to <a target="_blank" href="https://www.copyrighted.com/professional-takedowns" rel="noopener">hire an agent</a> to report infringing material for you.</p>
    <h2>Notifications of infringement</h2>
    <p>Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. Our response may include the removal or restriction of access to allegedly infringing material as well as a permanent termination of repeat infringers’ accounts.</p>
    <p>If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access.</p>
    <h2>Changes and amendments</h2>
    <p>We reserve the right to modify this Policy or its terms relating to the Services at any time, effective upon posting of an updated version of this Policy on the Services. When we do, we will revise the updated date at the bottom of this page.</p>
    <h2>Reporting copyright infringement</h2>
    <p>If you would like to notify us of the infringing material or activity, you may send an email to su&#112;port&#64;ani&#46;&#114;&#105;p.</p>
    <p>This document was last updated on May 23, 2021</p>
	`;
    $('#content').html(content);
}

// 渲染 Contact Us
function contactus() {
    window.history.pushState('Contact Us', 'Open ANi', '/ContactUs');
    nav("/ContactUs");
    var content = `
    <h1>聯絡我們</h1>
    <p>Email: <a style="color:#E48E00;" href = "mailto: support@ani.rip?subject = Feedback">support@ani.rip</a></p>
    <p>Discord: <a style="color:#E48E00;" href = "https://ani.rip/discord">https://ani.rip/discord</a></p>
	`;
    $('#content').html(content);
}

// 渲染导航栏
function nav(path) {
    var html = "";
    html += `<div style="max-width:150px;"><img class="mdui-typo-headline mdui-img-fluid folder" href="/"  style = "max-width: 100%;height: auto;width: auto;"src="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/aniopen.png"></div>`;
    var arr = path.trim('/').split('/');
    let p = "/"
    if (arr.length > 0) {
        for (i in arr) {
            var n = arr[i];
            if (n == "DMCA" || n == "ContactUs") {
                p += "";
            }
            else {
                n = decodeURIComponent(n);
                p += n + '/';
            }
            if (n == '') {
                break;
            }
            html += `<style>@media only screen and (max-width: 615px){.pathlist{display:none;}}</style><i class="mdui-icon material-icons mdui-icon-dark folder pathlist" style="margin:0;">chevron_right</i><a class="folder pathlist">${n}</a>`;
        }
        if (!window.location.href.includes("?a=view") && path != '/DMCA' && path != '/ContactUs') {
            if (screen.width >= 570)
                html += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><i style="bottom: 0px;" class="mdui-icon material-icons">search</i><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="timeout()" type="search" placeholder="搜尋"/></div>`
            else
                html += `<div class="mdui-toolbar-spacer"></div>`
        }
        else {
            html += `<div class="mdui-toolbar-spacer"></div>`
        }
        html += `<a href="https://t.me/channel_ani" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Telegram'}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="100%" height="100%" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" fill="white"/></svg>
                    </svg>
                </a>
                <a href="https://ko-fi.com/anidonate" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Donate'}">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="90%" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 503.467 503.467" style="enable-background:new 0 0 503.467 503.467;" xml:space="preserve">
                    <g transform="translate(1 1)">
                        <path style="fill:#AAB1BA;" d="M3.33,498.2V276.333h51.2c9.387,0,17.067,7.68,17.067,17.067v17.067v119.467v51.2
                            c0,9.387-7.68,17.067-17.067,17.067H3.33z"/>
                        <path style="fill:#FF7474;" d="M332.716,31.427c15.36-17.067,38.4-28.16,63.147-28.16c46.933,0,85.333,38.4,85.333,85.333
                            c0,51.2-51.2,136.533-145.067,187.733C242.263,225.133,191.063,139.8,191.063,88.6c0-46.933,38.4-85.333,85.333-85.333
                            c11.947,0,23.893,2.56,34.133,6.827c0,0,15.36,8.533,21.333,19.627L332.716,31.427z"/>
                        <path style="fill:#FFD0A1;" d="M354.05,399.213c2.56-0.853,5.12-1.707,7.68-3.413l98.133-47.787
                            c11.947-6.827,28.16-2.56,34.987,9.387c6.827,11.947,2.56,28.16-9.387,34.987l-115.2,71.68c0,0-25.6,17.067-85.333,17.067
                            c-51.2,0-128-42.667-128-42.667s-17.067-8.533-51.2-8.533H71.596V310.467h102.4c25.6,0,68.267,51.2,93.867,51.2h51.2
                            c17.067,0,25.6,8.533,25.6,8.533s8.533,8.533,8.533,25.6L354.05,399.213z"/>
                    </g>
                    <path style="fill:#51565F;" d="M55.53,503.467H4.33c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h51.2
                        c6.827,0,12.8-5.973,12.8-12.8V294.4c0-6.827-5.973-12.8-12.8-12.8H4.33c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267
                        h51.2c11.947,0,21.333,9.387,21.333,21.333v187.733C76.863,494.08,67.476,503.467,55.53,503.467z M285.93,486.4
                        c-52.053,0-127.147-41.813-129.707-43.52l0,0c0,0-17.067-7.68-49.493-7.68c-2.56,0-4.267-1.707-4.267-4.267
                        c0-2.56,1.707-4.267,4.267-4.267c34.987,0,52.053,8.533,52.907,9.387c0.853,0.853,76.8,41.813,126.293,41.813
                        c57.173,0,82.773-16.213,82.773-16.213l115.2-71.68c10.24-5.973,13.653-18.773,7.68-29.013c-5.973-10.24-18.773-13.653-29.013-7.68
                        l-98.133,47.787c-17.92,9.387-34.987,9.387-69.973,9.387c-34.133,0-83.627-8.533-86.187-8.533s-4.267-2.56-3.413-5.12
                        c0-2.56,2.56-4.267,5.12-3.413c0.853,0,51.2,8.533,84.48,8.533s50.347,0,66.56-7.68l98.133-47.787
                        c13.653-7.68,32.427-3.413,40.107,11.093c8.533,14.507,3.413,32.427-11.093,40.96l-115.2,71.68
                        C372.116,469.333,346.516,486.4,285.93,486.4z M25.663,460.8c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533
                        s8.533,3.413,8.533,8.533S30.783,460.8,25.663,460.8z M345.663,375.467c-0.853,0-2.56,0-3.413-0.853l0,0c0,0-7.68-7.68-22.187-7.68
                        h-51.2c-14.507,0-31.573-12.8-49.493-26.453c-16.213-11.947-33.28-24.747-44.373-24.747H106.73c-2.56,0-4.267-1.707-4.267-4.267
                        c0-2.56,1.707-4.267,4.267-4.267h68.267c14.507,0,31.573,12.8,49.493,26.453c16.213,11.947,33.28,24.747,44.373,24.747h51.2
                        c18.773,0,28.16,9.387,29.013,9.387c1.707,1.707,1.707,4.267,0,5.973C348.223,375.467,346.516,375.467,345.663,375.467z
                            M337.13,281.6c-0.853,0-1.707,0-1.707-0.853C243.263,230.4,187.796,144.213,187.796,89.6c0-49.493,40.107-89.6,89.6-89.6
                        c12.8,0,24.747,2.56,35.84,7.68c2.56,0.853,3.413,3.413,2.56,5.973c-0.853,2.56-3.413,3.413-5.973,2.56
                        c-10.24-4.267-21.333-6.827-32.427-6.827c-44.373,0-81.067,36.693-81.067,81.067c0,52.053,52.907,133.973,140.8,182.613
                        c87.893-48.64,140.8-131.413,140.8-182.613c0-44.373-36.693-81.067-81.067-81.067c-31.573,0-60.587,18.773-73.387,46.933
                        c-0.853,2.56-3.413,3.413-5.973,1.707c-2.56-0.853-3.413-3.413-1.707-5.973C330.303,20.48,362.73,0,396.863,0
                        c49.493,0,89.6,40.107,89.6,89.6c0,54.613-55.467,140.8-147.627,191.147C338.836,281.6,337.983,281.6,337.13,281.6z M445.503,76.8
                        c-1.707,0-3.413-0.853-4.267-2.56c-5.12-13.653-15.36-23.893-28.16-28.16c-2.56-0.853-3.413-3.413-2.56-5.12
                        c0.853-2.56,3.413-3.413,5.12-2.56c16.213,5.973,28.16,17.92,34.133,34.133c0.853,2.56,0,4.267-2.56,5.12
                        C446.356,76.8,445.503,76.8,445.503,76.8z"/>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                </svg>
                </a>`;
    }
    $('#nav').html(html);
}

// 渲染文件列表
function list(path) {
    var searchbar = "";
    if (!window.location.href.includes("?a=view") && path != '/DMCA' && path != '/ContactUs') {
        if (screen.width < 570)
            searchbar += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="timeout()" type="search" placeholder="搜尋"/></div>`
    }
    else {
        searchbar += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="timeout()" type="search" placeholder="搜尋" disabled/></div>`
    }
    var content = `
    ${searchbar}
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>
	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7" onclick="sortFileList('sortname')">
	     文件
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right" onclick="sortFileList('sortdate')">
	     更新時間
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right" onclick="sortFileList('sortsize')">
	     檔案大小
	<i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
	    </div>
        <div class="mdui-col-sm-2 mdui-text-right">
       </div>
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
    $('#content').html(content);

    var password = localStorage.getItem('password' + path);
    $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');
    $.post(path, '{"password":"' + password + '"}', function (data, status) {
        var obj = jQuery.parseJSON(data);
        if (typeof obj != 'null' && obj.hasOwnProperty('error') && obj.error.code == '401') {
            var pass = prompt("Require a private token", "");
            localStorage.setItem('password' + path, pass);
            if (pass != null && pass != "") {
                list(path);
            } else {
                history.go(-1);
            }
        } else if (typeof obj != 'null') {
            list_files(path, obj.files);
        }
    });
}

function list_files(path, files) {
    html = "";
    for (i in files) {
        var item = files[i];
        if (Array.isArray(path)) {
            var p = path[i] + item.name;
        }
        else {
            var p = path + item.name;
        }
        pProg = p.split('/')
        pProg.forEach((ps, index) => {
            ps = decodeURIComponent(ps)
            pProg[index] = encodeURIComponent(ps)
        })
        if (item['size'] == undefined) {
            item['size'] = "";
        }
        item['createdTime'] = utc2HK(item['createdTime']);
        item['size'] = formatFileSize(item['size']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            p = pProg.join('/') + '/'
            html += `<li class="mdui-list-item mdui-ripple"><span class="tool_tip">${item.name}</span><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['createdTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                <div class="mdui-col-sm-2 mdui-text-right"><a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"></a></div>
	            </a>
	        </li>`;
        } else {
            p = pProg.join('/')
            var k = p;
            var c = "file";
            if (item.name == "README.md") {
                get_file(p, item, function (data) {
                    markdown("#readme_md", data);
                });
            }
            if (item.name == "HEAD.md") {
                get_file(p, item, function (data) {
                    markdown("#head_md", data);
                });
            }
            var ext = p.split('.').pop();
            if ("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|m4a|mp3|wav|ogg|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext.toLowerCase()}|`) >= 0) {
                p += "?a=view";
                c += " view";
            }
            if (item.name == "sw.js" || item.name.includes(".vtt") || item.name.includes(".srt")) {

            }
            else {
                if ("|html|php|css|go|java|js|json|txt|sh|md|bmp|jpg|jpeg|png|gif|m4a|mp3|wav|ogg|".indexOf(`|${ext.toLowerCase()}|`) >= 0) {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}"><span class="tool_tip">${item.name}</span>
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">insert_drive_file</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['createdTime']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right"><a href="${k}" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"><i class="mdui-icon material-icons">cloud_download</i></a></div>
                    </a>
                </li>`;
                }
                else if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}"><span class="tool_tip">${item.name}</span>
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">video_library</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['createdTime']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right"><a href="${k}" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"><i class="mdui-icon material-icons">cloud_download</i></a></div>
                    </a>
                </li>`;
                }
                else if ("|nfo|".indexOf(`|${ext}|`) >= 0) {

                }
                else {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}"><span class="tool_tip">${item.name}</span>
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">insert_drive_file</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['createdTime']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right"><a href="${k}" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"><i class="mdui-icon material-icons">cloud_download</i></a></div>
                    </a>
                </li>`;
                }

            }
        }
    }
    $('#list').html(html);
}


function get_file(path, file, callback) {
    var key = "file_path_" + path + file['createdTime'];
    var data = localStorage.getItem(key);
    if (data != undefined) {
        return callback(data);
    } else {
        $.get(path, function (d) {
            localStorage.setItem(key, d);
            callback(d);
        });
    }
}



// 文件展示 ?a=view
function file(path) {
    var dir = path.split('/').slice(0, -1).join('/');;
    var name = path.split('/').pop();
    var encodedPath = dir + '/' + name
    var ext = name.split('.').pop().toLowerCase().replace(`?a=view`, "");
    if ("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0) {
        return file_code(encodedPath);
    }

    if ("|mp4|webm|avi|".indexOf(`|${ext}|`) >= 0) {
        return file_video(encodedPath);
    }

    if ("|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
        return file_video(encodedPath);
    }

    if ("|mp3|wav|ogg|m4a|".indexOf(`|${ext}|`) >= 0) {
        return file_audio(encodedPath);
    }

    if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
        return file_image(encodedPath);
    }
}

// 文件展示 |html|php|css|go|java|js|json|txt|sh|md|
function file_code(path) {
    var type = {
        "html": "html",
        "php": "php",
        "css": "css",
        "go": "golang",
        "java": "java",
        "js": "javascript",
        "json": "json",
        "txt": "Text",
        "sh": "sh",
        "md": "Markdown",
    };
    var name = path.split('/').pop();
    var ext = name.split('.').pop();
    var href = window.location.origin + path;
    var encodedLink = window.location.origin;
    var linkComp = path.split('/');
    for (i = 1; i < linkComp.length; i++) {
        var pathcomp = decodeURIComponent(linkComp[i])
        pathcomp = encodeURIComponent(pathcomp);
        encodedLink = encodedLink + '/' + pathcomp;
    }
    encodedLink = encodedLink.replaceAll(/%25/g, "%");
    let fileName_mobile = ``
    if (screen.width < 570) {
        fileName_mobile = `<p style="overflow-wrap: break-word;">${decodeURIComponent(linkComp.at(-1).replace(/.html|.php|.css|.go|.java|.js|.json|.txt|.sh|.md/g, ""))}</p>`
    }
    var share = encodedLink + "?a=view";
    var content = `
<div class="mdui-container">
<pre id="editor"></pre>
</div>
<br>
${fileName_mobile}
<div class="mdui-textfield">
	<label class="mdui-textfield-label">下載地址</label>
	<input class="mdui-textfield-input" type="text" value="${encodedLink}"/>
</div>
<button href="${share}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
<button onclick="javascript:location.href='${encodedLink}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
<script src="https://cdn.staticfile.org/ace/1.4.7/ace.js"></script>
<script src="https://cdn.staticfile.org/ace/1.4.7/ext-language_tools.js"></script>
	`;
    $('#content').html(content);

    $.get(path, function (data) {
        $('#editor').html($('<div/>').text(data).html());
        var code_type = "Text";
        if (type[ext] != undefined) {
            code_type = type[ext];
        }
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/ambiance");
        editor.setFontSize(18);
        editor.session.setMode("ace/mode/" + code_type);

        //Autocompletion
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            maxLines: Infinity
        });
    });
}

// 文件展示 视频 |mp4|webm|avi|
function file_video(path) {
    var linkComp = path.split('/');
    var encodedLink = window.location.origin;
    let fileName_mobile = ""
    if (screen.width < 570) {
        fileName_mobile = `<p style="overflow-wrap: break-word;">${decodeURIComponent(linkComp.at(-1).replace(/.mp4|.webm|.avi/g, ""))}</p>`
    }
    for (i = 1; i < linkComp.length; i++) {
        var pathcomp = decodeURIComponent(linkComp[i])
        pathcomp = encodeURIComponent(pathcomp);
        encodedLink = encodedLink + '/' + pathcomp;
    }
    encodedLink = encodedLink.replaceAll(/%25/g, "%");
    var subtitle = encodedLink.split(/(.mp4)|(.webm)|(.avi)/)[0] + '.vtt'
    var vlc = 'vlc://' + encodedLink;
    var share = encodedLink + "?a=view";
    var playBtn = `<a href="${vlc}"><button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900"><i class="mdui-icon material-icons">&#xe038;</i> 在 VLC media player 中播放</button></a>`;
    var content = `
<div class="mdui-container-fluid">
	<br>
    <div class="mdui-video-fluid mdui-center" id="dplayer"></div>
    <br>
    ${fileName_mobile}
    <br> 如果以上片段無法播放，可使用以下 VLC 播放連結 (請使用 Google Chrome)
	<br>
	<br>${playBtn}
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${encodedLink}"/>
	</div>
    <button href="${share}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${encodedLink}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
    //DP Player implement
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: false,
        screenshot: false,
        airplay: true,
        theme: '#FF7DCC',
        preload: 'auto',
        autoplay: false,
        hotkey: true,
        video: {
            url: encodedLink,
            pic: 'https://raw.githubusercontent.com/RyanL-29/aniopen/master/background.png',
            type: 'auto',
        },
        subtitle: {
            url: subtitle,
            type: 'webvtt',
            fontSize: '1.6em',
            bottom: '13px',
            color: '#fff',
        }
    });
}

// 文件展示 音频 |mp3|m4a|wav|ogg|
function file_audio(path) {
    var linkComp = path.split('/');
    var encodedLink = window.location.origin;
    let fileName_mobile = ``
    if (screen.width < 570) {
        fileName_mobile = `<p style="overflow-wrap: break-word;">${decodeURIComponent(linkComp.at(-1).replace(/.mp3|.m4a|.wav|.ogg/g, ""))}</p>`
    }
    for (i = 1; i < linkComp.length; i++) {
        var pathcomp = decodeURIComponent(linkComp[i])
        pathcomp = encodeURIComponent(pathcomp);
        encodedLink = encodedLink + '/' + pathcomp;
    }
    encodedLink = encodedLink.replaceAll(/%25/g, "%");
    var share = encodedLink + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<audio class="mdui-center" preload controls>
	  <source src="${encodedLink}"">
	</audio>
	<br>
    ${fileName_mobile}
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${encodedLink}"/>
	</div>
    <button href="${share}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${encodedLink}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
}


// 图片展示 bmp|jpg|jpeg|png|gif
function file_image(path) {
    var linkComp = path.split('/');
    var encodedLink = window.location.origin;
    let fileName_mobile = ""
    if (screen.width < 570) {
        fileName_mobile = `<p style="overflow-wrap: break-word;">${decodeURIComponent(rawshare.at(-1).replace(/.bmp|.jpg|.jpeg|.png|.gif/g, ""))}</p>`
    }
    for (i = 1; i < linkComp.length; i++) {
        var pathcomp = decodeURIComponent(linkComp[i])
        pathcomp = encodeURIComponent(pathcomp);
        encodedLink = encodedLink + '/' + pathcomp;
    }
    encodedLink = encodedLink.replaceAll(/%25/g, "%");
    var share = encodedLink + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<img class="mdui-img-fluid" src="${encodedLink}"/>
	<br>
    ${fileName_mobile}
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">下載地址</label>
	  <input class="mdui-textfield-input" type="text" value="${encodedLink}"/>
	</div>
    <button href="${share}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${encodedLink}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
}


//时间转换
function utc2HK(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，HK时间比utc时间多八个时区
    var unixtimestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
        + " " + hour.substring(hour.length - 2, hour.length) + ":"
        + minute.substring(minute.length - 2, minute.length) + ":"
        + second.substring(second.length - 2, second.length);
}

// bytes自适应转换到KB,MB,GB
function formatFileSize(bytes) {
    if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + ' GB'; }
    else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + ' MB'; }
    else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + ' KB'; }
    else if (bytes > 1) { bytes = bytes + ' bytes'; }
    else if (bytes == 1) { bytes = bytes + ' byte'; }
    else { bytes = ''; }
    return bytes;
}

function covertSizeStringToBytes(fileSize) {
    if (fileSize.includes('GB')) {
        return parseInt(fileSize.split("GB")[0]) * 1073741824
    } else if (fileSize.includes('MB')) {
        return parseInt(fileSize.split("MB")[0]) * 1048576
    } else if (fileSize.includes('KB')) {
        return parseInt(fileSize.split("KB")[0]) * 1024
    }
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};


// README.md HEAD.md 支持
function markdown(el, data) {
    if (window.md == undefined) {
        //$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',function(){
        window.md = window.markdownit();
        markdown(el, data);
        //});
    } else {
        var html = md.render(data);
        $(el).show().html(html);
    }
}

// 监听回退事件
window.onpopstate = function () {
    var path = window.location.pathname;
    render(path);
}

//Sorting List
function sortFileList(sortTarget) {
    var list, switching, listEle, dir, listArr, tempListELe;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        listEle = list.getElementsByTagName("LI");
        tempListELe = [...listEle]
        listArr = document.getElementsByClassName(sortTarget);
        let tempEle = [...listArr]
        let mapped = tempEle.map((el, i) => { return { index: i, value: el } })
        let orgArr = [...mapped]

        if (dir == "asc") {
            mapped.sort((x, y) => {
                if (sortTarget === "sortsize") {
                    if (covertSizeStringToBytes(x.value.innerHTML) > covertSizeStringToBytes(y.value.innerHTML)) { return 1; }
                    if (covertSizeStringToBytes(x.value.innerHTML) < covertSizeStringToBytes(y.value.innerHTML)) { return -1; }
                } else {
                    if (x.value.innerHTML > y.value.innerHTML) { return 1; }
                    if (x.value.innerHTML < y.value.innerHTML) { return -1; }
                }
                return 0;
            })
        } else if (dir == "desc") {
            mapped.sort((x, y) => {
                if (sortTarget === "sortsize") {
                    if (covertSizeStringToBytes(x.value.innerHTML) > covertSizeStringToBytes(y.value.innerHTML)) { return -1; }
                    if (covertSizeStringToBytes(x.value.innerHTML) < covertSizeStringToBytes(y.value.innerHTML)) { return 1; }
                } else {
                    if (x.value.innerHTML > y.value.innerHTML) { return -1; }
                    if (x.value.innerHTML < y.value.innerHTML) { return 1; }
                }

                return 0;
            })
        }


        if (_.isEqual(mapped, orgArr) && dir == "asc") {
            dir = "desc"
            switching = true
        } else {
            switching = false
            for (var i = 0; i < mapped.length; i++) {
                list.appendChild(tempListELe[mapped[i].index])
            }
        }
    }
}

/*Easter egg */
function printlogo() {
    var k = "\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMmmmmmmmmmmmmNMMMMMMMMMMMMMMNmmmmmmmmmmmMMMMMMMMMMMMmmmmmmmmmNMMMMMd::::::::::+MMMMM\nMMMMMMMMMMMMMMMMs````````````/MMMMMMMMMMMMMMd```````````+NMMMMMMMMMm`````````yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMMN`             yMMMMMMMMMMMMMh            :mMMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMM/              .NMMMMMMMMMMMMh             .dMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMd                oMMMMMMMMMMMMh              `yMMMMMMm         yMMMMMh----------/MMMMM\nMMMMMMMMMMMMMM-                `dMMMMMMMMMMMh                oNMMMMm         yMMMMMNmmmmmmmmmmmMMMMM\nMMMMMMMMMMMMMs        `         :MMMMMMMMMMMh                 :NMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMm`       +o          yMMMMMMMMMMh                  .dMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMM/       `NN.         `NMMMMMMMMMh        -.         `yMN         yMMMMMy          .MMMMM\nMMMMMMMMMMMh        oMMs          +MMMMMMMMMh         d`          sM.        yMMMMMy          .MMMMM\nMMMMMMMMMMM.       .NMMM.          dMMMMMMMMh         dm.          o/        yMMMMMy          .MMMMM\nMMMMMMMMMMo        yMMMMh          -MMMMMMMMh         dMm-          .        yMMMMMy          .MMMMM\nMMMMMMMMMm`        ::::::           sMMMMMMMh         dMMN/                  yMMMMMy          .MMMMM\nMMMMMMMMM:                          `mMMMMMMh         dMMMMo                 yMMMMMy          .MMMMM\nMMMMMMMMh                            /MMMMMMh         dMMMMMy`               yMMMMMy          .MMMMM\nMMMMMMMN.                             hMMMMMh         dMMMMMMd.              yMMMMMy          .MMMMM\nMMMMMMMo        `++++++++++.          .NMMMMh         dMMMMMMMm:             yMMMMMy          .MMMMM\nMMMMMMm`        yMMMMMMMMMMh           oMMMMh         dMMMMMMMMN+            yMMMMMy          .MMMMM\nMMMMMM:        :MMMMMMMMMMMM:          `dMMMh         dMMMMMMMMMMs`          yMMMMMy          .MMMMM\nMMMMMy         dMMMMMMMMMMMMm           :MMMh         dMMMMMMMMMMMh`         yMMMMMy          .MMMMM\nMMMMMdyyyyyyyyhMMMMMMMMMMMMMMhyyyyyyyyyyyNMMNyyyyyyyyyNMMMMMMMMMMMMmyyyyyyyyymMMMMMmyyyyyyyyyyhMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      PowerBy: GoIndex      MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      Theme Design: ANi     MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"
    console.log(k);
}

/*Share Copy */
function copyURI(evt) {
    evt.preventDefault();
    /* clipboard successfully set */
    // navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {
    //     /* clipboard successfully set */
    //     evt.target.innerHTML = `<i class="mdui-icon material-icons">done</i> Copied`
    //     setTimeout(()=> {
    //         evt.target.innerHTML = `<i class="mdui-icon material-icons">share</i> Share`
    //     }, 1500)
    // }, () => {
    //     /* clipboard write failed */
    //     evt.target.innerHTML = `<i class="mdui-icon material-icons">clear</i> Error`
    //     setTimeout(()=> {
    //         evt.target.innerHTML = `<i class="mdui-icon material-icons">share</i> Share`
    //     }, 1500)
    // });
    navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {
        /* clipboard successfully set */
        mdui.snackbar({
            message: '已複製連結 - Link Copied',
            position: 'right-top'
        });
    }, () => {
        /* clipboard write failed */
            mdui.snackbar({
            message: '複製連結失敗 - Link Copy failed',
            position: 'right-top'
        });
    });
}



$(function () {
    init();
    printlogo();
    // const Scrollbar = window.Scrollbar;
    // const overscroll = window.OverscrollPlugin;
    // Scrollbar.use(overscroll)
    // Scrollbar.init(document.querySelector('html'),
    //     {
    //         damping: 0.06,
    //         renderByPixels: true,
    //         plugins: {
    //             overscroll:
    //             {
    //                 effect: 'glow',
    //                 damping: 0.09,
    //                 glowColor: "rgba(0, 0, 0, 0.29)",
    //                 maxOverscroll: 1000
    //             }
    //         }
    //     }
    // );


    var path = window.location.pathname;
    $("body").on("click", '.folder', function () {
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    $("body").on("click", '.view', function () {
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    render(path);
});
