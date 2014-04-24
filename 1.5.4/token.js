/**
 * _get token
 */
KISSY.add(function (S ,io) {
    /**
     * $获取domain
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
     * $是否是daily
     * @return {boolean}
     */
    function isDaily(){
        return false;
    }

    /**
     * $设置token
     */
    function setToken(uploader,callback){
        if(!uploader) return false;
    }

    return setToken;
},{requires:['ajax']});