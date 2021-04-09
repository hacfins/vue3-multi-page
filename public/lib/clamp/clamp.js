;(function(){
    function clamp(element, options) {
        options = options || {};
        var opt = {
            clamp:              options.clamp || 2,
            truncationHTML:     options.truncationHTML,
            max_class:options.max_class,
            callback:options.callback || ''
        }
        var element_arr = document.querySelectorAll(element);
        var trun_count = 0;
        truncate(element_arr[0])

        function truncate(){
            if(trun_count == element_arr.length){
                return
            }
            getHeight(element_arr[trun_count])
            trun_count++
            truncate()

        }

        function getHeight(ele){

            ele.style.wordBreak = 'break-all';
            var origin_text = ele.innerHTML;

            var wareNameText = ele.innerHTML;
            var fontcss = computeStyle(ele,'font-family')
            var fontsize = computeStyle(ele,'font-size')
            var fontweight = computeStyle(ele,'font-weight')
            var lh = computeStyle(ele,'line-height')
            var fontcolor = computeStyle(ele,'color')
            var span = createElementByString('<span></span>')[0]
            span.innerHTML = ele.innerHTML;
            span.style.cssText = 'word-break:break-all;width:'+ele.clientWidth+'px;display:block;position:absolute;z-index:-1';
            span.style.fontFamily = fontcss
            span.style.fontSize = fontsize
            span.style.fontWeight = fontweight;
            span.style.lineHeight = lh;
            span.style.color = fontcolor;
            if(computeStyle(ele,'padding-left')){
                span.style.paddingLeft = computeStyle(ele,'padding-left')

            }
            if(computeStyle(ele,'padding-right')){
                span.style.paddingRight = computeStyle(ele,'padding-right')
            }
            if(computeStyle(ele,'padding-top')){
                span.style.paddingTop = computeStyle(ele,'padding-top')
            }
            if(computeStyle(ele,'padding-bottom')){
                span.style.paddingBottom = computeStyle(ele,'padding-bottom')
            }
            document.body.appendChild(span)
            var heightSome = span.clientHeight
            var maxHeight = getMaxHeight(ele,opt.clamp);
            if(heightSome > maxHeight){

                for(var i=0;heightSome > maxHeight;i++){


                    wareNameText = wareNameText.substring(0,wareNameText.length-1);
                    if(opt.truncationHTML){
                        span.innerHTML = wareNameText + '...'+opt.truncationHTML;
                    }else{
                        span.innerHTML = wareNameText+'...';
                    }


                    heightSome = span.clientHeight
                }

                var newText = wareNameText.substring(0,wareNameText.length-1)+'...';
                if(opt.truncationHTML){
                    ele.innerHTML = newText;
                    var readmore_ele = createElementByString(opt.truncationHTML)[0];
                    readmore_ele.setAttribute('origin_text',origin_text);
                    readmore_ele.setAttribute('clamped_text',newText)
                    readmore_ele.setAttribute('is_expend',2);
                    readmore_ele.style.color = 'rgb(0,0,238)';
                    readmore_ele.style.cursor = 'pointer'
                    ele.appendChild(readmore_ele);
                    readmore_ele.addEventListener("click", function(){
                        if(this.getAttribute('is_expend') == 2){
                            ele.innerHTML = this.getAttribute('origin_text');
                            readmore_ele.setAttribute('is_expend',1);
                            readmore_ele.innerHTML = '收起'
                            ele.className = ele.className.replace(opt.max_class,'')
                        }else{
                            ele.innerHTML = this.getAttribute('clamped_text');
                            readmore_ele.setAttribute('is_expend',2);
                            readmore_ele.innerHTML = '展开';
                            ele.className += ' '+opt.max_class
                        }
                        ele.appendChild(readmore_ele);
                    });

                }else{
                    ele.innerHTML = newText;
                }



            }
            document.body.removeChild(span)
            opt.callback && opt.callback(ele)
        }
        function createElementByString(str) {
            var div = document.createElement('div');
            div.innerHTML = str;

            return div.childNodes;
        }

        function getMaxHeight(ele,clmp) {
            var lineHeight = getLineHeight(ele);
            return lineHeight * clmp;
        }

        /**
         * Returns the line-height of an element as an integer.
         */
        function getLineHeight(elem) {
            var lh = computeStyle(elem, 'line-height');
            if (lh == 'normal') {
                // Normal line heights vary from browser to browser. The spec recommends
                // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
                lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
            }
            return parseInt(lh);
        }

        function computeStyle(elem, prop) {
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


    }

    window.$clamp = clamp;
})();