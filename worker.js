var authConfig = {
    "siteName": "", // 网站名称
    "root_pass": "",  // 根目录密码，优先于.password
    "version": "1.4.7", // 程序版本
    "theme": "material", // material  classic 
    "client_id": "",
    "client_secret": "",
    "refresh_token": "", // 授权 token
    "root": "", // 根目录ID
    "searchShareEmail": "" // 檔案分享者 email -- 用於搜尋功能
};

var gd;

var html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
  <title>ANi Open</title>
  <link rel="apple-touch-icon" href="//cdn.jsdelivr.net/gh/RyanL-29/aniopen/pwa_icon/192x192nt.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="ANi Open Test">
  <meta name="msapplication-TileColor" content="#000000">
  <meta name="theme-color" content ="#000000">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://open.ani.rip/">
  <meta property="og:site_name" content="Open ANi Test">
  <meta property="og:title" content="ANi Open | 新番下載 & 線上看 ">
  <meta property="og:description" content="ANi Open 全自動新番更新系統">
  <meta property="og:image" content="https://raw.githubusercontent.com/RyanL-29/aniopen/master/aniiconw.png">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
  <script src="//cdn.jsdelivr.net/gh/RyanL-29/aniopen@${this.authConfig.version}/app.min.js"></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-27M1C0HVFG"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-27M1C0HVFG');
  </script>
  <script>
  /*Share Copy */
    function copyURI(evt) {
        evt.preventDefault();
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
/* Google Cast*/
    var cast = {}
            var castNow = function(source) {
            var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
            chrome.cast.requestSession(function onRequestSessionSuccess(session) {
            cast.session = session
            loadNow(source);
            }, function onLaunchError(er) {
                console.log('onLaunchError', er)
            }, sessionRequest);
        }


        var loadNow = function(source) {

                var mediaURL = source.video.currentSrc;
                //console.log (mediaURL);
                var mediaType = null;
                var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, mediaType);
                var request = new chrome.cast.media.LoadRequest(mediaInfo);
                cast.session.loadMedia(request,
                    onMediaDiscovered.bind(this, 'loadMedia'),
                    function(er) {
                    console.log('onMediaError', er)
                    });

                function onMediaDiscovered(how, media) {
                    //console.log('got media!', media)
                    cast.currentMedia = media;
                    var activeTrackIds = [1];
                    var tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(activeTrackIds);
                    media.editTracksInfo(tracksInfoRequest, function succCB(){
                }, function errorCallback(){
                    console.log('Error CB!')
                    });
                }
        }

        var initializeCastApi = function() {
        //console.log('initializing cast api')
        var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            function(session) {
            //console.log('got session', session)
            cast.session = session
            },
            function receiverListener(e) {
            if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
            }
            })
        chrome.cast.initialize(apiConfig, function() {
            },
            function(gotError) {
            console.log('gotError', gotError)
            });
        };


        window.onload = function() {
            initializeCastApi()
        }


  </script>
  <style>
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

body {overflow: overlay;}

footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  color: #ABABAB;
  text-align: center;
  line-height: 0.35;
}

.footer-ele:hover {
  text-decoration: underline;
}

.footer-ele{
  display: inline-block;
  cursor: pointer;
}

.footer-ele2{
  font-size: 12px;
  line-height: 0.35;
}

html, body{
  height:100%;
}

ins{
  border-radius: 50%;
  background: #ABABAB;
  display: inline-block;
  height: 3px;
  margin: .2rem .4rem;
  width: 3px;
}
  </style>
</head>
<body>
<script src="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen@${this.authConfig.version}/index.js"></script>
</body>
</html>
`;


/**
 * global functions
 */
const FUNCS = {
    /**
     * 转换成针对谷歌搜索词法相对安全的搜索关键词
     */
    formatSearchKeyword: function (keyword) {
        let nothing = "";
        let space = " ";
        if (!keyword) return nothing;
        return keyword.replace(/(!=)|['"=<>/\\:]/g, nothing)
            .replace(/[,，|(){}]/g, space)
            .trim()
    }

};


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});


async function handleRequest(request) {
    if (gd == undefined) {
        gd = new googleDrive(authConfig);
    }

    let url = new URL(request.url);
    let path = url.pathname;
    let action = url.searchParams.get('a');
    // 搜索
    if (request.method == 'POST') {
        var obj = await request.json();
        if (obj.inputvalue != null) {
            return search(request, obj.inputvalue);
        }
        else {
            return apiRequest(request);
        }
    }

    if (path.substr(-1) == '/') {
        try {
            await gd.list(path);
        } catch (e) {
            return new Response("", { status: 404 }); // if path: /notexist/
        }
        return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } else if (action != null) {
        if (await gd.file(path) == undefined) {
            return new Response(html404, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } else {
        if (path.split('/').pop().toLowerCase() == ".password") {
            return new Response("", { status: 404 });
        }
        try {
            await gd.file(path);
        } catch (e) {
            return new Response("", { status: 404 }); // if path: /notexist/notexist
        }
        let file = await gd.file(path);
        if (file == undefined) {
            return new Response("", { status: 404 }); // if path: /exist/notexist
        }

        let range = request.headers.get('Range');
        return gd.down(file.id, range);
    }
}


async function apiRequest(request) {
    let url = new URL(request.url);
    let path = url.pathname;
    let option = { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }

    if (path.substr(-1) == '/') {
        // check password
        let password = await gd.password(path);
        //console.log("dir password", password);
        if (password != undefined && password != null && password != "") {
            try {
                var obj = await request.json();
            } catch (e) {
                var obj = {};
            }
            //console.log(password,obj);
            if (password.replace("\n", "") != obj.password) {
                let html = `{"error": {"code": 401,"message": "password error."}}`;
                return new Response(html, option);
            }
        }
        let list = await gd.list(path);
        return new Response(JSON.stringify(list), option);
    } else {
        let file = await gd.file(path);
        let range = request.headers.get('Range');
        return new Response(JSON.stringify(file));
    }
}

async function search(request, searchname) {
    let url = new URL(request.url);
    let path = url.pathname;
    let option = { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }

    if (path.substr(-1) == '/') {
        // check password
        let password = await gd.password(path);
        //console.log("dir password", password);
        if (password != undefined && password != null && password != "") {
            try {
                var obj = await request.json();
            } catch (e) {
                var obj = {};
            }
            //console.log(password,obj);
            if (password.replace("\n", "") != obj.password) {
                let html = `{"error": {"code": 401,"message": "password error."}}`;
                return new Response(html, option);
            }
        }
        let list = await gd.search(path, searchname);
        return new Response(JSON.stringify(list), option);
    } else {
        let file = await gd.file(path);
        let range = request.headers.get('Range');
        return new Response(JSON.stringify(file));
    }
}

class googleDrive {
    constructor(authConfig) {
        this.authConfig = authConfig;
        this.paths = [];
        this.files = [];
        this.passwords = [];
        this.paths["/"] = authConfig.root;
        if (authConfig.root_pass != "") {
            this.passwords["/"] = authConfig.root_pass;
        }
        this.accessToken();
    }

    async down(id, range = '') {
        let url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
        let requestOption = await this.requestOption();
        requestOption.headers['Range'] = range;
        return await fetch(url, requestOption);
    }

    async file(path) {
        if (typeof this.files[path] == 'undefined') {
            this.files[path] = await this._file(path);
        }
        return this.files[path];
    }

    async _file(path) {
        let arr = path.split('/');
        let name = arr.pop();
        name = decodeURIComponent(name).replace(/\'/g, "\\'");
        let dir = arr.join('/') + '/';
        //console.log(name, dir);
        let parent = await this.findPathId(dir);
        //console.log(parent);
        let url = 'https://www.googleapis.com/drive/v3/files';
        let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
        params.q = `'${parent}' in parents and name = '${name}' andtrashed = false`;
        params.fields = "files(id, name, mimeType, size ,createdTime, modifiedTime, iconLink, thumbnailLink, shortcutDetails)";
        url += '?' + this.enQuery(params);
        let requestOption = await this.requestOption();
        let response = await fetch(url, requestOption);
        let obj = await response.json();
        if (obj.files && obj.files[0] && obj.files[0].mimeType == 'application/vnd.google-apps.shortcut') {
            obj.files[0].id = obj.files[0].shortcutDetails.targetId;
            obj.files[0].mimeType = obj.files[0].shortcutDetails.targetMimeType;
        }
        //console.log(obj);
        return obj.files[0];
    }

    // 通过reqeust cache 来缓存
    async list(path) {
        if (gd.cache == undefined) {
            gd.cache = {};
        }

        if (gd.cache[path]) {
            return gd.cache[path];
        }

        let id = await this.findPathId(path);
        var obj = await this._ls(id);
        if (obj.files && obj.files.length > 1000) {
            gd.cache[path] = obj;
        }

        return obj
    }

    async password(path) {
        if (this.passwords[path] !== undefined) {
            return this.passwords[path];
        }

        //console.log("load",path,".password",this.passwords[path]);

        let file = await gd.file(path + '.password');
        if (file == undefined) {
            this.passwords[path] = null;
        } else {
            let url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
            let requestOption = await this.requestOption();
            let response = await this.fetch200(url, requestOption);
            this.passwords[path] = await response.text();
        }

        return this.passwords[path];
    }

    async _ls(parent) {
        //console.log("_ls",parent);

        if (parent == undefined) {
            return null;
        }
        const files = [];
        let pageToken;
        let obj;
        let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
        params.q = `'${parent}' in parents and trashed = false AND name !='.password'`;
        params.orderBy = 'modifiedTime desc';
        params.fields = "nextPageToken, files(id, name, mimeType, size , modifiedTime, shortcutDetails)";
        params.pageSize = 1000;

        do {
            if (pageToken) {
                params.pageToken = pageToken;
            }
            let url = 'https://www.googleapis.com/drive/v3/files';
            url += '?' + this.enQuery(params);
            let requestOption = await this.requestOption();
            let response = await fetch(url, requestOption);
            obj = await response.json();
            obj.files.forEach(file => {
                if (file && file.mimeType == 'application/vnd.google-apps.shortcut') {
                    file.id = file.shortcutDetails.targetId;
                    file.mimeType = file.shortcutDetails.targetMimeType;
                }
            });
            files.push(...obj.files);
            pageToken = obj.nextPageToken;
        } while (pageToken);

        obj.files = files;
        return obj;
    }

    /**
 * 一层一层的向上获取这个文件或文件夹的上级文件夹的 file 对象。注意：会很慢！！！
 * 最多向上寻找到当前 gd 对象的根目录 (root id)
 * 只考虑一条单独的向上链。
 * 【注意】如果此id代表的项目不在目标gd盘下，那么此函数会返回null
 *
 * @param child_id
 * @param contain_myself
 * @returns {Promise<[]>}
 */
    async findParentFilesRecursion(child_id, contain_myself = true) {
        const gd = this;
        const user_drive_real_root_id = authConfig.root;

        // 自下向上查询的终点目标id
        const target_top_id = user_drive_real_root_id;

        // [{},{},...]
        const parent_files = [];
        let meet_top = false;

        async function addItsFirstParent(file_obj) {
            if (!file_obj) return;
            if (!file_obj.parents) return;
            if (file_obj.parents.length < 1) return;

            // ['','',...]
            let p_ids = file_obj.parents;
            if (p_ids && p_ids.length > 0) {
                // its first parent
                const first_p_id = p_ids[0];
                if (first_p_id === target_top_id) {
                    meet_top = true;
                    return;
                }
                const p_file_obj = await gd.findItemById(first_p_id);
                if (p_file_obj && p_file_obj.id) {
                    parent_files.push(p_file_obj);
                    await addItsFirstParent(p_file_obj);
                }
            }
        }

        const child_obj = await gd.findItemById(child_id);
        if (contain_myself) {
            parent_files.push(child_obj);
        }
        await addItsFirstParent(child_obj);

        return meet_top ? parent_files : null
    }

    async findItemById(id) {
        let url = `https://www.googleapis.com/drive/v3/files/${id}?fields=parents,id,name,mimeType,modifiedTime,createdTime,fileExtension,size&supportsAllDrives=true`;
        let requestOption = await this.requestOption();
        let res = await fetch(url, requestOption);
        return await res.json()
    }
    async search(path, searchInput) {
        let id = await this.findPathId(path);
        var obj = await this._search(id, searchInput);
        return obj;
    }

    /**
     * 搜索
     * @returns {Promise<{data: null, nextPageToken: null, curPageIndex: number}>}
     */
    async _search(parent, origin_keyword, page_token = null, page_index = 0) {
        //console.log("search",parent);
        if (parent == undefined) {
            return null;
        }
        let keyword = FUNCS.formatSearchKeyword(origin_keyword);
        if (!keyword) {
            // 关键词为空，返回
            return null;
        }
        let words = keyword.split(/\s+/);
        let name_search_str = `name contains '${words.join("' AND name contains '")}'`;
        let option = { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
        const files = [];
        let pageToken;
        let obj;
        let params = {};
        console.log(this.authConfig.searchShareEmail)
        params.corpora = 'user'
        params.q = `'${this.authConfig.searchShareEmail}' in writers and trashed = false AND name !='.password' AND (${name_search_str}) AND mimeType = 'application/vnd.google-apps.folder'`;
        params.orderBy = 'modifiedTime desc';
        params.fields = "nextPageToken, files(id, name, mimeType, size , modifiedTime, shortcutDetails, parents)";
        params.pageSize = 25;

        do {
            if (pageToken) {
                params.pageToken = pageToken;
            }
            let url = 'https://www.googleapis.com/drive/v3/files';
            url += '?' + this.enQuery(params);
            let requestOption = await this.requestOption();
            let response = await fetch(url, requestOption);
            obj = await response.json();
            obj.files.forEach(file => {
                if (file && file.mimeType == 'application/vnd.google-apps.shortcut') {
                    file.id = file.shortcutDetails.targetId;
                    file.mimeType = file.shortcutDetails.targetMimeType;
                }
            });
            files.push(...obj.files);
            pageToken = obj.nextPageToken;
        } while (pageToken);
        obj.files = files;
        if (obj.files[0] != null) {
            let foldername = [];
            for (var i in obj.files) {
                foldername[i] = await gd.findPathById(obj.files[i].parents);
            }
            obj.foldername = foldername;
            return obj;
        }
        else {
            params.corpora = 'user'
            params.q = `'${this.authConfig.searchShareEmail}' in writers and trashed = false AND name !='.password' AND (${name_search_str}) AND 	mimeType != 'application/vnd.google-apps.folder'`;
            params.orderBy = 'modifiedTime desc';
            params.fields = "nextPageToken, files(id, name, mimeType, size , modifiedTime, shortcutDetails, parents)";
            params.pageSize = 25;

            do {
                if (pageToken) {
                    params.pageToken = pageToken;
                }
                let url = 'https://www.googleapis.com/drive/v3/files';
                url += '?' + this.enQuery(params);
                let requestOption = await this.requestOption();
                let response = await fetch(url, requestOption);
                obj = await response.json();
                obj.files.forEach(file => {
                    if (file && file.mimeType == 'application/vnd.google-apps.shortcut') {
                        file.id = file.shortcutDetails.targetId;
                        file.mimeType = file.shortcutDetails.targetMimeType;
                    }
                });
                files.push(...obj.files);
                pageToken = obj.nextPageToken;
            } while (pageToken);
            obj.files = files;
            if (obj.files[0] != null) {
                let foldername = [];
                for (var i in obj.files) {
                    foldername[i] = await gd.findPathById(obj.files[i].parents);
                }
                obj.foldername = foldername;
                return obj;
            }
            else {
                let html = `{"error": {"code": 404,"message": "No keyword match"}}`;
                return new Response(html, option);
            }
        }
    }

    /**
     * 获取相对于本盘根目录的path
     * @param child_id
     * @returns {Promise<string>} 【注意】如果此id代表的项目不在目标gd盘下，那么此方法会返回空字符串""
     */
    async findPathById(child_id) {

        const p_files = await this.findParentFilesRecursion(child_id);
        if (!p_files || p_files.length < 1) return '';

        let cache = [];
        // 把查出来的每一级的path和id都缓存一下
        p_files.forEach((value, idx) => {
            const is_folder = idx === 0 ? (p_files[idx].mimeType === "application/vnd.google-apps.folder") : true;
            let path = '/' + p_files.slice(idx).map(it => it.name).reverse().join('/');
            if (is_folder) path += '/';
            cache.push({ id: p_files[idx].id, path: path })
        });

        /*const is_folder = p_files[0].mimeType === CONSTS.folder_mime_type;
        let path = '/' + p_files.map(it => it.name).reverse().join('/');
        if (is_folder) path += '/';*/

        return cache[0].path;
    }

    async findPathId(path) {
        let c_path = '/';
        let c_id = this.paths[c_path];

        let arr = path.trim('/').split('/');
        for (let name of arr) {
            c_path += name + '/';

            if (typeof this.paths[c_path] == 'undefined') {
                let id = await this._findDirId(c_id, name);
                this.paths[c_path] = id;
            }

            c_id = this.paths[c_path];
            if (c_id == undefined || c_id == null) {
                break;
            }
        }
        //console.log(this.paths);
        return this.paths[path];
    }

    async _findDirId(parent, name) {
        name = decodeURIComponent(name).replace(/\'/g, "\\'");

        //console.log("_findDirId",parent,name);

        if (parent == undefined) {
            return null;
        }

        let url = 'https://www.googleapis.com/drive/v3/files';
        let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
        params.q = `'${parent}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.shortcut') and name = '${name}'  and trashed = false`;
        params.fields = "nextPageToken, files(id, name, mimeType, shortcutDetails)";
        url += '?' + this.enQuery(params);
        let requestOption = await this.requestOption();
        let response = await fetch(url, requestOption);
        let obj = await response.json();
        if (obj.files[0] == undefined) {
            return null;
        }
        if (obj.files[0].mimeType == 'application/vnd.google-apps.shortcut' && obj.files[0].shortcutDetails.targetMimeType == 'application/vnd.google-apps.folder') {
            obj.files[0].id = obj.files[0].shortcutDetails.targetId;
        } else if (obj.files[0].mimeType == 'application/vnd.google-apps.shortcut' && obj.files[0].shortcutDetails.targetMimeType != 'application/vnd.google-apps.folder') {
            return null;
        }
        return obj.files[0].id;
    }

    async accessToken() {
        //console.log("accessToken");
        if (this.authConfig.expires == undefined || this.authConfig.expires < Date.now()) {
            const obj = await this.fetchAccessToken();
            if (obj.access_token != undefined) {
                this.authConfig.accessToken = obj.access_token;
                this.authConfig.expires = Date.now() + 3500 * 1000;
            }
        }
        return this.authConfig.accessToken;
    }

    async fetchAccessToken() {
        //console.log("fetchAccessToken");
        const url = "https://www.googleapis.com/oauth2/v4/token";
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const post_data = {
            'client_id': this.authConfig.client_id,
            'client_secret': this.authConfig.client_secret,
            'refresh_token': this.authConfig.refresh_token,
            'grant_type': 'refresh_token'
        }

        let requestOption = {
            'method': 'POST',
            'headers': headers,
            'body': this.enQuery(post_data)
        };

        const response = await fetch(url, requestOption);
        return await response.json();
    }

    async fetch200(url, requestOption) {
        let response;
        for (let i = 0; i < 3; i++) {
            response = await fetch(url, requestOption);
            //console.log(response.status);
            if (response.status != 403) {
                break;
            }
            await this.sleep(800 * (i + 1));
        }
        return response;
    }

    async requestOption(headers = {}, method = 'GET') {
        const accessToken = await this.accessToken();
        headers['authorization'] = 'Bearer ' + accessToken;
        return { 'method': method, 'headers': headers };
    }

    enQuery(data) {
        const ret = [];
        for (let d in data) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
        return ret.join('&');
    }

    sleep(ms) {
        return new Promise(function (resolve, reject) {
            let i = 0;
            setTimeout(function () {
                //console.log('sleep' + ms);
                i++;
                if (i >= 2) reject(new Error('i>=2'));
                else resolve(i);
            }, ms);
        })
    }
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};
