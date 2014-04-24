/**
 * 阿里上传通用接口
 */
KISSY.add(function (S ,UA,Uploader) {
    /**
     * 获取domain
     * @return {String}
     */
    function getDomain(){
        var host = arguments[1] || location.hostname;
        var da = host.split('.'), len = da.length;
        var deep = arguments[0]|| (len<3?0:1);
        if (deep>=len || len-deep<2)
            deep = len-2;
        return da.slice(deep).join('.');
    }

    /**
     * iframe强制设置domain
     * @param uploader
     */
    function iframeHack(uploader,domain,redirect){
        var type = uploader.get('type');
        var setDomain = type == 'iframe';
        if(!setDomain) return false;
        var data = uploader.get('data');
        if(redirect){

        }else{
            //不存在域名设置, 强制截取域名后二个段
            if(!domain){
                domain = getDomain(-2);
            }
            document.domain = domain;
            data.domain = domain;
            S.log('[AliUploader] auto set domain when cross domain: '+domain);
        }
        if(data.type){
            delete data.type;
            S.log('invalid upload parameter name: "type", please change it.');
        }
        var uploadType = uploader.get('uploadType');
        uploadType.set('domain',domain);
        return data;
    }

    /**
     * 保存服务器返回的文件name而不是url
     * @param uploader
     */
    function urlUseName(uploader){
        var isSet = false;
        uploader.on('add',function(){
            if(!isSet){
                var urlsInput = uploader.getPlugin('urlsInput');
                if(urlsInput){
                    urlsInput.set('useName',true);
                    isSet = true;
                    S.log('[UrlsInput] the useName value set to true: Save the picture name returned from server');
                }
            }
        })
    }

    function AliUploader(target,config){
        if(!config) config = {};
        config.CORS = true;

        if(!config.action){
			S.log('setting config.action first please.');
		}
        if(!config.data) config.data = {};
        config.data['_input_charset'] = 'utf-8';
        if(UA.ie <= 6){
            config.type = 'iframe';
            S.log('IE6, using iframe.');
        }
        //实例化uploader
        var uploader = new Uploader(target,config);
        iframeHack(uploader,config.domain);
        //url使用文件名而不是完整路径
        if(config.useName) urlUseName(uploader);

        return uploader;
    }
    AliUploader.Uploader = Uploader;
    return AliUploader;
},{requires:['ua','./index']});