export { deepclone, initObject, initArray, findEventPathDOM, findChildDOM, findParentDOM, rgbToHsl, randomStr, waitUntil, getStringWidth, waitTime, copyObj }


const getStringWidth = (str) => {
    // console.log(str)
    if (!str) return
    let d = document.createElement('text')
    d.innerText = str
    d.style.fontSize = '14px'
    d.style.visibility = 'hidden'
    document.body.appendChild(d)
    let len = d.offsetWidth
    document.body.removeChild(d)
    return len
}
const copyObj = (source, target) => {
    if (source == target) {
        console.log("对象同源")
        return
    }
    if (typeof source == "object" && Array.isArray(source) && typeof target == "object" && Array.isArray(target)) {
        console.log("皆为 Array")
        //source target 皆为 Array
        initArray(target);
        target.length = source.length;
        for (let i = 0; i < source.length; i++) {
            target[i] = source[i];
        }
    } else if (typeof source == "object" && !Array.isArray(source) && typeof target == "object" && !Array.isArray(target)) {
        console.log("皆非 Array")
        //source target 皆非 Array
        initObject(target);
        for (const key in source) {
            target[key] = source[key];
        }
    } else {
        console.error("copy类型不统一");
    }
    console.log(target)
};
const deepclone = (obj, targetObj) => {
    let res
    if (typeof obj == 'object') {
        // console.log("object", obj)
        // console.log("targetObj", targetObj)
        if (targetObj) {
            Array.isArray(targetObj) ? initArray(targetObj) : initObject(targetObj);
            res = targetObj
        } else {
            res = Array.isArray(obj) ? [] : {};
        }
        // console.log(obj)
        // console.log(res)
        for (const key in obj) {
            // console.log("obj", obj[key])
            if (obj[key] instanceof Object) {
                res[key] = deepclone(obj[key]);
                // console.log("res", res[key])
            } else {
                res[key] = obj[key];
                // console.log("res", res[key])
            }
        }
    } else {
        // console.log("not object", obj)
        res = obj
    }
    return res;
};
const findEventPathDOM = (event, regString) => {
    console.log(event)
    const pathlist = event.path
    const targetDOM = event.target
    regString = "\\b" + regString + "\\b"
    const reg = new RegExp(regString);
    // console.log(targetDOM);
    // console.log(typeof targetDOM.className);
    if (!targetDOM) return
    // if (typeof targetDOM.className != "string") return;
    for (const path of pathlist) {
        console.log(path)
        if (path.className.search(reg) >= 0) {
            // console.log(targetDOM);
            return path;
        }
    }
};
const findChildDOM = (targetDOM, regString) => {
    regString = "\\b" + regString + "\\b"
    const reg = new RegExp(regString);
    // console.log(targetDOM);
    // console.log(typeof targetDOM.className);
    if (!targetDOM) return
    if (typeof targetDOM.className != "string") return;
    if (targetDOM.className.search(reg) >= 0) {
        // console.log(targetDOM);
        return targetDOM;
    } else {
        for (const item of targetDOM.children) {
            targetDOM = findChildDOM(item, regString);
            // console.log(targetDOM);
            if (targetDOM) return targetDOM;
        }
    }
};
const findParentDOM = (targetDOM, regString) => {
    const reg = new RegExp(regString);
    if (!targetDOM) return
    if (typeof targetDOM.className == "string" && targetDOM.className.search(reg) >= 0) {
        // console.log(targetDOM);
        return targetDOM;
    } else {
        targetDOM = findParentDOM(targetDOM.parentElement, regString);
        // console.log(targetDOM);
        if (targetDOM) return targetDOM;
    }
};

function initObject(obj) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            Reflect.deleteProperty(obj, key);
        }
    }
    return obj;
}
function initArray(array) {
    while (array.length > 0) {
        array.shift()
    }
    // console.log(array)
    return array
}



/**
* RGB 颜色值转换为 HSL.
* 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
* @param   String  rgbColor       rgb(255, 255, 255)|rgba(255, 255, 255, 1)
* @param   Number  dh       转换后添加的hue差值
* @param   Number  ds       转换后添加的saturation差值
* @param   Number  dl       转换后添加的lightness差值
* @param   Number  da       转换后添加的alpha差值
* @return  String           hsl(360, 100%, 100%)|hsla(360, 100%, 100%, 1)
*/

const rgbToHsl = (rgbColor, { dh = 0, ds = 0, dl = 0, da = 0 }) => {
    const rgbArr = rgbColor.replace(/(?:\(|\)|\brgb\b|\bRGB\b|\brgba\b|\bRGBA\b)*/g, "").split(",");
    for (let i = 0; i < rgbArr.length; i++) {
        rgbArr[i] = parseFloat(rgbArr[i]);
    }
    let [r, g, b, a] = rgbArr;
    // console.log(rgbArr);
    // console.log(r, g, b, a);
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    h = Math.round(h * 360) + dh;
    s = Math.round(s * 100) + ds;
    l = Math.round(l * 100) + dl;
    a = a === undefined ? 1 + da : a + da
    // console.log(h, s, l, a);
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

//mode数组第一位控制是否加入数字,第二位控制是否加入大写字母,第三位控制是否加入小写字母
//len控制输出字符长度
const randomStr = (len = 1, mode = [1, 1, 1], customStrArr) => {
    let strArr = [];
    if (customStrArr) {
        strArr = [...customStrArr]
    }
    let res = '';
    //放入数字0-9ASCII码48～57
    if (mode[0]) {
        for (let i = 48; i <= 57; i++) {
            strArr.push(String.fromCharCode(i))
        }
    }
    //放入大写字母ASCII码65～90
    if (mode[1]) {
        for (let i = 65; i <= 90; i++) {
            strArr.push(String.fromCharCode(i))
        }
    }
    //放入小写字母ASCII码97～122
    if (mode[2]) {
        for (let i = 97; i <= 122; i++) {
            strArr.push(String.fromCharCode(i))
        }
    }

    for (let i = 0; i < len; i++) {
        let point = Math.floor(Math.random() * strArr.length)
        res = res + strArr[point]
        // console.log(res)
    }
    return res
}
const waitUntil = async ({ condition, msg }) => {
    while (!condition) {
        await new Promise((resolve) => {
            setTimeout(() => {
                if (msg)
                    console.log(msg);
                resolve();
            }, 100);
        });
    }
};
const waitTime = async (time) => {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}