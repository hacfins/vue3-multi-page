/**
 * Created by hacfin005 on 2019/10/16.
 */
/**
 * 原生方法
 */

var _class2type = {};

var _type_name_arr = "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " )

_type_name_arr.forEach(function(name){
    _class2type[ "[object " + name + "]" ] = name.toLowerCase();
})

var _toString = _class2type.toString;

var _hasOwn = _class2type.hasOwnProperty;

var _fnToString = _hasOwn.toString;

var _ObjectFunctionString = _fnToString.call( Object );

function _dom(str) {
    if(_toString.call( str ) == "[object String]"){
        return document.querySelectorAll(str)
    }else{
        if(_toString.call( str ) == "[object NodeList]" || _toString.call( str ) == "[object Array]"){
            return str
        }else{
            return [str]
        }
    }

}
function _find(el,find_str){
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    return el.querySelectorAll(find_str)

}

function _attr(element_str,attr_key,attr_value) {
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    if(typeof attr_value != 'undefined'){
        for(var i = 0; i < elementArr.length; i++){
            elementArr[i].setAttribute(attr_key,attr_value)
        }
    }else{
        if(elementArr.length > 0){
            return elementArr[0].getAttribute(attr_key)
        }else{
            return ''
        }

    }

}
function _removeAttr(element_str,attr_key){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    var remove_attr_key_arr = attr_key.split(' ');

    for(var i = 0; i < elementArr.length; i++){

        remove_attr_key_arr.forEach(function(rkey){
            elementArr[i].removeAttribute(rkey)
        })


    }
}

function _event(element_str,eventname,callback){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].addEventListener(eventname,function(event){
            var event = event || window.event;
            callback && callback.bind(this)(event)
        })
    }

}

function _click(element_str){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].click()
    }

}

function _creat(tagName,tagAttrObj,stylestr){
    var tagEle = document.createElement(tagName);
    tagEle.style.cssText = stylestr;
    for(var attr in tagAttrObj){
        tagEle.setAttribute(attr,tagAttrObj[attr])
    }
    return tagEle
}

function _append(element_str,append_obj){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].appendChild(append_obj)
    }

}

function _type (obj) {
    if ( obj == null ) {
        return obj + "";
    }
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
    _class2type[ _toString.call( obj ) ] || "object" :
        typeof obj;
}

function _extendObj() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !_isFunction( target ) ) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                copy = options[ name ];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if ( name === "__proto__" || target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( _isPlainObject( copy ) ||
                    ( copyIsArray = _isArray( copy ) ) ) ) {
                    src = target[ name ];

                    // Ensure proper type for the source value
                    if ( copyIsArray && !_isArray( src ) ) {
                        clone = [];
                    } else if ( !copyIsArray && !_isPlainObject( src ) ) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    target[ name ] = _extendObj( deep, clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

function _isArray(obj){
    if(Array.isArray){
        return Array.isArray(obj)
    }else{
        return "array" === _type(obj)
    }
}

function _isFunction( obj ) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

function _isPlainObject( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || _toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    proto = Object.getPrototypeOf( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = _hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && _fnToString.call( Ctor ) === _ObjectFunctionString;
}

function _isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function _isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}

function _hasClass(elem, cls) {
    if(!elem){
        return false
    }
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    var elementArr = []
    if(_toString.call( elem ) == "[object NodeList]"){
        elementArr = elem
    }else if(_toString.call( elem ) == "[object HTMLDivElement]"){
        elementArr = [elem]
    }else{
        elementArr = _dom(elem)
    }
    var flag = false;

    for(var i = 0; i < elementArr.length; i++){
        if(new RegExp(' ' + cls + ' ').test(' ' + elementArr[i].className + ' ')){
            flag = true;
            break;
        }
    }
    return flag



}

function _getParentNode(ele,classname,isid,is_biao){
    var result = []
    if(!ele){
        return result
    }

    while (ele && ele.tagName != 'BODY') {
        if(typeof classname == 'string'){
            if(isid){
                if(_attr(ele,'id') == classname){
                    result.push(ele);
                }
            }else{
                if(is_biao){
                    if(ele.tagName == classname){
                        result.push(ele);
                    }
                }else{
                    if(_hasClass(ele,classname)){
                        result.push(ele);
                    }
                }

            }

        }else{
            if(ele == classname){
                result.push(ele);
            }
        }

        ele = ele.parentNode;
    }

    return result

}
function _removeClass(element_str, cls){
    if(!element_str){
        return
    }

    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        var obj_class = ' '+elementArr[i].className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
        var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        elementArr[i].className = removed;//替换原来的 class.
    }

}

function _addClass(element_str,cls){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        if(!_hasClass(elementArr[i],cls)){
            elementArr[i].className += ' '+ cls
        }
    }
}

function _getIndex(element_str){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    var index = -1;
    if(elementArr.length > 0){
        var ch_arr = elementArr[0].parentNode.children;
        var pur_child = []
        for(var i = 0;i < ch_arr.length ; i++){
            if(ch_arr[i].nodeType == 1 ){
                pur_child.push(ch_arr[i])
            }
        }
        for(var j=0;j< pur_child.length; j++){
            if(elementArr[0] == pur_child[j]){
                index = j
                break
            }
        }
    }

    return index

}

function _computeStyle(elem, prop) {
    if (!window.getComputedStyle) {
        window.getComputedStyle = function(el, pseudo) {
            this.getPropertyValue = function(prop) {
                var re = /(\-([a-z]){1})/g;
                if (prop == 'float') prop = 'styleFloat';
                if (re.test(prop)) {
                    prop = prop.replace(re, function () {
                        return arguments[2].toUpperCase();
                    });
                }
                return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
            }
            return this;
        }
    }

    return window.getComputedStyle(elem, null).getPropertyValue(prop);
}

function _trigger(type, element) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(type, false, true);
    element.dispatchEvent(event);
}

function _hide(element_str){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].style.display = 'none'
    }

}

function _show(element_str){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].style.display = 'block'
    }

}

function _createElementByString(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes;
}

function _remove(element_str){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        elementArr[i].parentNode.removeChild(elementArr[i])
    }

}

function _css(element_str,cssobj){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        for (var csskey in cssobj){
            elementArr[i].style[csskey] = cssobj[csskey]
        }
    }

}

function _computeAllStyle(elem) {
    if (!window.getComputedStyle) {
        window.getComputedStyle = function(el) {
            return el.currentStyle
        }
    }
    return window.getComputedStyle(elem);
}

function _height(el) {
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    var styles = _computeAllStyle(el);
    var height = el.offsetHeight;
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderBottomWidth = parseFloat(styles.borderBottomWidth);
    var paddingTop = parseFloat(styles.paddingTop);
    var paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

function _width(el) {
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    var styles = _computeAllStyle(el);
    var width = el.offsetWidth;
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);
    var borderRightWidth = parseFloat(styles.borderRightWidth);
    var paddingLeft = parseFloat(styles.paddingLeft);
    var paddingRight = parseFloat(styles.paddingRight);
    return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
}

function _outerWidth(el) {
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    var styles = _computeAllStyle(el);
    var width = el.offsetWidth;
    var marginLeft = parseFloat(styles.marginLeft);
    var marginRight = parseFloat(styles.marginRight);
    return width + marginLeft + marginRight;
}

function _outerHeight(el) {
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    var styles = _computeAllStyle(el);
    var height = el.offsetHeight;
    var marginTop = parseFloat(styles.marginTop);
    var marginBottom = parseFloat(styles.marginBottom);
    return height + marginTop + marginBottom;
}
var _scroll_timer;
function _scrollPosition(el,target,duration,fn){

    var scrollT;

    if(_scroll_timer){
        clearInterval(_scroll_timer);
    }
    if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
        scrollT = document.documentElement.scrollTop||document.body.scrollTop
    }else{
        scrollT = _dom(el)[0].scrollTop;
    }
    var loopAllCount = Math.ceil(duration / 20);
    var loopCount = 0
    var step = Math.ceil(Math.abs(scrollT - target) / loopAllCount);
    var isStop = false;
    function stopScroll(){
        if(isStop){
            if(_scroll_timer){
                clearInterval(_scroll_timer);
                if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                    window.onscroll = null;
                }else{
                    _dom(el)[0].onscroll = null
                }
            }
        }
        isStop = true;
    }
    if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
        window.onscroll = null;
        window.onscroll = stopScroll
    }else{
        _dom(el)[0].onscroll = null
        _dom(el)[0].onscroll = stopScroll
    }





    if (scrollT > target) {
        _scroll_timer = setInterval(function(){
            if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                scrollT = document.documentElement.scrollTop||document.body.scrollTop
            }else{
                scrollT = _dom(el)[0].scrollTop;
            }

            if(scrollT <= target || loopCount >= loopAllCount){
                clearInterval(_scroll_timer);
                fn && fn()
                if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                    window.onscroll = null;
                }else{
                    _dom(el)[0].onscroll = null
                }
            }
            loopCount++;
            var speed = -1 * step;
            var rs = (scrollT + speed) <=  target ? target : scrollT + speed

            if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                document.documentElement.scrollTop = document.body.scrollTop = rs
            }else{
                _dom(el)[0].scrollTop = rs
            }
            isStop = false;

        },20)
    }else if(scrollT < target){
        _scroll_timer = setInterval(function(){
            if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                scrollT = document.documentElement.scrollTop||document.body.scrollTop
            }else{
                scrollT = _dom(el)[0].scrollTop;
            }

            if(scrollT >= target || loopCount >= loopAllCount){
                clearInterval(_scroll_timer);
                fn && fn()
                if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                    window.onscroll = null;
                }else{
                    _dom(el)[0].onscroll = null
                }

            }
            loopCount++;
            var speed = step;
            var rs = (scrollT + speed) >=  target ? target : scrollT + speed
            if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
                document.documentElement.scrollTop = document.body.scrollTop = rs
            }else{
                _dom(el)[0].scrollTop = rs
            }
            isStop = false;
        },20)


    }else if(target == scrollT){
        if(el.nodeType == 1 && (el.tagName == 'BODY' || el.tagName == 'HTML')){
            window.onscroll = null;
        }else{
            _dom(el)[0].onscroll = null
        }
        return false;
    }

}

function _offset(el){
    if(_toString.call( el ) == "[object String]"){
        if(_dom(el).length == 0) {
            return
        }
        el = _dom(el)[0]
    }else{
        if(!el){
            return
        }
    }
    var box = el.getBoundingClientRect()
    var offset = {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
    return offset

}

function _setOffset(elem, options){
    if(_toString.call( elem ) == "[object String]"){
        if(_dom(elem).length == 0) {
            return
        }
        elem = _dom(elem)[0]
    }else{
        if(!elem){
            return
        }
    }
    var curLeft, curCSSTop, curTop, curOffset, curCSSLeft,
        position = _computeStyle(elem,'position'),
        props = {};


    // set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
        elem.style.position = "relative";
    }

    curOffset = _offset(elem);

    curCSSTop = elem.style.top;
    curCSSLeft = elem.style.left;
    curTop = parseFloat( curCSSTop ) || 0;
    curLeft = parseFloat( curCSSLeft ) || 0;

    if ( options.top != null ) {
        props.top = ( options.top - curOffset.top ) + curTop +'px';
    }
    if ( options.left != null ) {
        props.left = ( options.left - curOffset.left ) + curLeft + 'px';
    }
    _css( elem, props);
}

function _after(element_str,new_ele){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){

        var parent = elementArr[i].parentNode;　　//得到父节点
        if (parent.lastChild === elementArr[i]) { //如果最后一个子节点是当前元素，那么直接添加即可
            parent.appendChild(new_ele);
        }else{ //否则，当前节点的下一个节点之前添加
            parent.insertBefore(new_ele,elementArr[i].nextSibling)
        }
    }

}

function _siblings(element_str){


    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }

    var allSiblings = [];    //保存所有兄弟节点

    for(var i = 0; i < elementArr.length; i++){
        var p = elementArr[i].parentNode.children; //获取父级的所有子节点
        for(var j = 0; j < p.length; j++){  //循环
            if(p[j].nodeType == 1 && p[j] != elementArr[i]){  //如果该节点是元素节点与不是这个节点本身
                allSiblings.push(p[j]);      // 添加到兄弟节点里
            }
        }


    }
    return allSiblings;

}

function _each(element_str,fn){
    if(!element_str){
        return
    }
    var elementArr = []
    if(_toString.call( element_str ) == "[object NodeList]"){
        elementArr = element_str
    }else if(_toString.call( element_str ) == "[object HTMLDivElement]"){
        elementArr = [element_str]
    }else{
        elementArr = _dom(element_str)
    }
    for(var i = 0; i < elementArr.length; i++){
        fn && fn.bind(elementArr[i])(i,elementArr[i])
    }

}


var bind_list = {} // 绑定事件列表

HTMLElement.prototype.on = function(eventName, selector, callback) {

    // 预处理参数
    if (!eventName || !selector) {
        console.log('Arguments is require!')
        return false
    } else {

        eventName = eventName == 'DOMMouseScroll' ? eventName : eventName.toLowerCase()

        if (typeof selector == 'function') {
            callback = selector
            selector = null
        }
    }

    // 事件绑定逻辑

    if (!bind_list.eventName) bind_list.eventName = []

    bind_list.eventName.push({
        event:eventName,
        selector: selector,
        fn: function(event) {


            var ev = event || window.event,
                target = ev.target || ev.srcElement,
                targets, sSets, i = j = 0
            if (!selector) {

                // 当前元素绑定
                callback.apply(this, [ev])

            } else {

                targets = selector.split(',')


                for (; i < targets.length; i++) {

                    // 删除前后空格
                    targets[i] = targets[i].trim()

                    // 遍历集合
                    sSets = this.querySelectorAll(targets[i])

                    // 如果集合为空则说明不存在这种委托元素，不做处理
                    if (sSets.length > 0) {
                        // 关系拆分
                        // targets[i] = targets[i].split(/\s+/g).reverse()

                        // 事件委托
                        for (var j = 0; j < sSets.length; j++) {
                            if (sSets[j].style.display != 'none' && (target === sSets[j] || _getParentNode(target,sSets[j]).length > 0)) {

                                callback.apply(sSets[j], [ev])

                                break;
                            }
                        }

                    } else {
                        return false
                    }

                }

            }
        }
    })

    // 所有事件，包括委托事件都绑定到目标元素本身
    if (this.addEventListener) {
        var is_capture = false
        if(eventName == 'focus' || eventName == 'blur'){
            is_capture = true
        }
        this.addEventListener(eventName, bind_list.eventName[bind_list.eventName.length - 1].fn,is_capture);
    } else if (this.attachEvent) {
        this.attachEvent("on" + eventName, bind_list.eventName[bind_list.eventName.length - 1].fn);
    }

}

// 移除全部事件
HTMLElement.prototype.off = function(eventName, selector) {

    if (!selector) selector = null

    // 预处理参数
    if (!eventName) {
        return false
    } else {

        eventName = eventName == 'DOMMouseScroll' ? eventName : eventName.toLowerCase()

    }

    if(!bind_list.eventName){
        return

    }


    // 遍历已添加列表
    for (var k = 0; k < bind_list.eventName.length; k++) {
        // 仅移除相关的事件，分目标元素和委托元素绑定的事件
        if (bind_list.eventName[k] && selector == bind_list.eventName[k].selector && eventName == bind_list.eventName[k].event) {
            if (this.removeEventListener) {
                var is_capture = false
                if(eventName == 'focus' || eventName == 'blur'){
                    is_capture = true
                }
                this.removeEventListener(eventName, bind_list.eventName[k].fn, is_capture);
            } else if (this.detachEvent) {
                this.detachEvent("on" + eventName, bind_list.eventName[k].fn);
            }
            // 移除
            bind_list.eventName[k] = null
        }
    }


}