document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css">');
document.write('<script src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"></script>');
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css">');
document.write('<link rel="manifest" href="//cdn.jsdelivr.net/gh/RyanL-29/aniopen@1.5.3/manifest.json">');
document.write('<link rel="apple-touch-icon" href="//cdn.jsdelivr.net/gh/RyanL-29/aniopen/pwa_icon/192x192nt.png">');
// markdown支持
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
// DPlayer API
document.write('<script src="//cdn.jsdelivr.net/gh/RyanL-29/aniopen@1.5.3/DPlayer.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');

// 初始化页面，并载入必要资源
function init() {
    document.siteName = $('title').html();
    $('body').addClass("mdui-theme-primary-blue-grey mdui-theme-accent-blue mdui-color-grey-800");
    var html = `
<header class="mdui-appbar mdui-color-grey-900 mdui-theme-layout-dark"> 
   <div id="nav" class="mdui-toolbar mdui-container">
   
   </div>
</header>
<div id="content" class="mdui-container" style="min-height: 100%;"> 
</div>
<div class="mdui-dialog" id="dialog">
    <div class="mdui-dialog-title">New Update Available</div>
    <div class="mdui-dialog-content">Please close and restart the app</div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>OK</button>
    </div>
  </div>
  <footer>
    <p style="line-height: 0;">ani.rip</p>
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
    title(path);
    nav(path);
    if (path.substr(-1) == '/') {
        list(path);
    } else {
        file(path);
    }
}

function timeout() {
    document.getElementById("list").innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>';
    var timeout;
    var delay = 1500;
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        globalsearch()
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


// 渲染 title
function title(path) {
    path = decodeURI(path);
    //$('title').html(document.siteName+' - '+path);
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
    <p>Email: <a href = "mailto: support@ani.rip?subject = Feedback">support@ani.rip</a></p>
    <p>Discord: https://ani.rip/discord</p>
	`;
    $('#content').html(content);
}

// 渲染导航栏
function nav(path) {
    var html = "";
    html += `<div style="max-width:150px;"><img class="mdui-typo-headline mdui-img-fluid folder" href="/"  style = "max-width: 100%;height: auto;width: auto;"src="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/aniopen.png"></div>`;
    var arr = path.trim('/').split('/');
    var p = '/';
    if (arr.length > 0) {
        for (i in arr) {
            var n = arr[i];
            if (n == "DMCA" || n == "ContactUs") {
                p += "";
            }
            else {
                n = decodeURI(n);
                p += n + '/';
            }
            if (n == '') {
                break;
            }
            html += `<style>@media only screen and (max-width: 615px){.pathlist{display:none;}}</style><i class="mdui-icon material-icons mdui-icon-dark folder pathlist" style="margin:0;">chevron_right</i><a class="folder pathlist" href="${p}">${n}</a>`;
        }
        if (!window.location.href.includes("?a=view")) {
            html += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><i style="top:0.5px;"class="mdui-icon material-icons">search</i><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="timeout()" type="text" placeholder="搜尋"/></div>`
        }
        else {
            html += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><i style="top:0.5px;"class="mdui-icon material-icons">search</i><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="timeout()" type="text" placeholder="搜尋" disabled/></div>`
        }
    html += `<a href="https://t.me/channel_ani" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Telegram'}">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="100%" height="100%" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" fill="white"/></svg>
      </svg>
    </a>
    <a href="https://ani.rip/discord" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Discord'}">
<svg width="100%" height="100%" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="71" height="55" fill="white"/>
        </clipPath>
        </defs>
    </svg>
    </a>`;
    }
    $('#nav').html(html);
}

// 渲染文件列表
function list(path) {
    var content = `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>
	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7" onclick="sortListDirName()">
	     文件
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right" onclick="sortListDirDate()">
	     修改時間
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right" onclick="sortListDirSize()">
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
            var p = path[i] + item.name + '/';
        }
        else {
            var p = path + item.name + '/';
        }
        if (item['size'] == undefined) {
            item['size'] = "";
        }

        item['modifiedTime'] = utc2HK(item['modifiedTime']);
        item['size'] = formatFileSize(item['size']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            html += `<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                <div class="mdui-col-sm-2 mdui-text-right"><a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"></a></div>
	            </a>
	        </li>`;
        } else {
            if (Array.isArray(path)) {
                var p = path[i] + item.name;
            }
            else {
                var p = path + item.name;
            }
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
            if (item.name == "sw.js") {

            }
            else {
                if ("|html|php|css|go|java|js|json|txt|sh|md|bmp|jpg|jpeg|png|gif|m4a|mp3|wav|ogg|".indexOf(`|${ext.toLowerCase()}|`) >= 0) {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">insert_drive_file</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right"><a href="${k}" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"><i class="mdui-icon material-icons">cloud_download</i></a></div>
                    </a>
                </li>`;
                }
                else if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">video_library</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
                    <div class="mdui-col-sm-2 mdui-text-right"><a href="${k}" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"><i class="mdui-icon material-icons">cloud_download</i></a></div>
                    </a>
                </li>`;
                }
                else if ("|nfo|".indexOf(`|${ext}|`) >= 0) {

                }
                else {
                    html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
                    <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
                    <i class="mdui-icon material-icons">insert_drive_file</i>
                      ${item.name}
                    </div>
                    <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
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
    var key = "file_path_" + path + file['modifiedTime'];
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
    var name = path.split('/').pop();
    var ext = name.split('.').pop().toLowerCase().replace(`?a=view`, "");
    if ("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0) {
        return file_code(path);
    }

    if ("|mp4|webm|avi|".indexOf(`|${ext}|`) >= 0) {
        return file_video(path);
    }

    if ("|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
        return file_video(path);
    }

    if ("|mp3|wav|ogg|m4a|".indexOf(`|${ext}|`) >= 0) {
        return file_audio(path);
    }

    if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
        return file_image(path);
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
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container">
<pre id="editor" ></pre>
</div>
<div class="mdui-textfield">
	<label class="mdui-textfield-label">下載地址</label>
	<input class="mdui-textfield-input" type="text" value="${href}"/>
</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${href}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
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
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    var vlc = 'vlc:' + share2;
    share2 = 'https:' + share2 + "?a=view";
    var playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900" href="vlc://${share2}" target="_blank"><i class="mdui-icon material-icons">&#xe038;</i> 在 VLC media player 中播放</button>`;
    if (/(Android)/i.test(navigator.userAgent)) { //Android
        var playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900 onclick="javascript:location.href='${vlc}'"><i class="mdui-icon material-icons">&#xe039;</i> 在 VLC media player 中播放</button>`;
    }
    else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //Apple
        var playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900 onclick="javascript:location.href='${vlc}'");><i class="mdui-icon material-icons">&#xe039;</i> 在 VLC media player 中播放</button>`;
    }
    var content = `
<div class="mdui-container-fluid">
	<br>
    <div class="mdui-video-fluid mdui-center" id="dplayer"></div>
    <br> 如果以上片段無法播放，可使用以下 VLC 播放連結 (請使用 Google Chrome)
	<br>
	<br>${playBtn}
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
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
            url: url,
            pic: 'https://raw.githubusercontent.com/RyanL-29/aniopen/master/background.png',
            type: 'auto',
        },
    });
}

// 文件展示 音频 |mp3|m4a|wav|ogg|
function file_audio(path) {
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<audio class="mdui-center" preload controls>
	  <source src="${url}"">
	</audio>
	<br>
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
}


// 图片展示
function file_image(path) {
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<img class="mdui-img-fluid" src="${url}"/>
	<br>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">下載地址</label>
	  <input class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
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


//Sorting for list date
function sortListDirDate() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortdate");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Sorting for list size
function sortListDirSize() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortsize");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Sorting for list size
function sortListDirName() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortname");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/*Easter egg */
function printlogo() {
    var k = "\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMmmmmmmmmmmmmNMMMMMMMMMMMMMMNmmmmmmmmmmmMMMMMMMMMMMMmmmmmmmmmNMMMMMd::::::::::+MMMMM\nMMMMMMMMMMMMMMMMs````````````/MMMMMMMMMMMMMMd```````````+NMMMMMMMMMm`````````yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMMN`             yMMMMMMMMMMMMMh            :mMMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMM/              .NMMMMMMMMMMMMh             .dMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMd                oMMMMMMMMMMMMh              `yMMMMMMm         yMMMMMh----------/MMMMM\nMMMMMMMMMMMMMM-                `dMMMMMMMMMMMh                oNMMMMm         yMMMMMNmmmmmmmmmmmMMMMM\nMMMMMMMMMMMMMs        `         :MMMMMMMMMMMh                 :NMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMm`       +o          yMMMMMMMMMMh                  .dMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMM/       `NN.         `NMMMMMMMMMh        -.         `yMN         yMMMMMy          .MMMMM\nMMMMMMMMMMMh        oMMs          +MMMMMMMMMh         d`          sM.        yMMMMMy          .MMMMM\nMMMMMMMMMMM.       .NMMM.          dMMMMMMMMh         dm.          o/        yMMMMMy          .MMMMM\nMMMMMMMMMMo        yMMMMh          -MMMMMMMMh         dMm-          .        yMMMMMy          .MMMMM\nMMMMMMMMMm`        ::::::           sMMMMMMMh         dMMN/                  yMMMMMy          .MMMMM\nMMMMMMMMM:                          `mMMMMMMh         dMMMMo                 yMMMMMy          .MMMMM\nMMMMMMMMh                            /MMMMMMh         dMMMMMy`               yMMMMMy          .MMMMM\nMMMMMMMN.                             hMMMMMh         dMMMMMMd.              yMMMMMy          .MMMMM\nMMMMMMMo        `++++++++++.          .NMMMMh         dMMMMMMMm:             yMMMMMy          .MMMMM\nMMMMMMm`        yMMMMMMMMMMh           oMMMMh         dMMMMMMMMN+            yMMMMMy          .MMMMM\nMMMMMM:        :MMMMMMMMMMMM:          `dMMMh         dMMMMMMMMMMs`          yMMMMMy          .MMMMM\nMMMMMy         dMMMMMMMMMMMMm           :MMMh         dMMMMMMMMMMMh`         yMMMMMy          .MMMMM\nMMMMMdyyyyyyyyhMMMMMMMMMMMMMMhyyyyyyyyyyyNMMNyyyyyyyyyNMMMMMMMMMMMMmyyyyyyyyymMMMMMmyyyyyyyyyyhMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      PowerBy: GoIndex      MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      Theme Design: ANi     MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"
    console.log(k);
}



$(function () {
    init();
    printlogo();
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

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    render(path);
});
