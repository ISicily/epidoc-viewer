(this["webpackJsonpepidoc-viewer"]=this["webpackJsonpepidoc-viewer"]||[]).push([[0],{70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n(0),r=n.n(c),i=n(11),o=n.n(i),d=(n.p,n(70),n(24)),p=(n(71),n(118)),u=n(54),l=n(123),s=n(119),x=n(113),b=n(122),f=n(111),h=(n(72),n(25)),O=function e(t,n){return n=n||[],Object(h.a)(t.childNodes).forEach((function(t){n.push(t),e(t,n)})),n};function A(e){var t=e.getAttribute("evidence");if(t&&"previouseditor"===t.toLowerCase()&&"undefined"===e.getAttribute("reason")){var n=document.createElement("span");n.className="underline",Object(h.a)(e.childNodes).forEach((function(e){return n.appendChild(e)})),e.appendChild(n)}}var g=function(e){var t=e.getAttribute("ref");if(t){var n=document.createElement("a"),a=document.createAttribute("href");a.value=t,n.setAttributeNode(a),Object(h.a)(e.childNodes).forEach((function(e){return n.appendChild(e)})),e.appendChild(n)}},v=function(e,t,n,a){var c=document.createElement("span");c.className+=" popupable",c.addEventListener("click",(function(){return a(n,e.textContent)})),e.parentNode.removeChild(e),Object(h.a)(t.childNodes).forEach((function(e){return c.appendChild(e)})),t.appendChild(c)},m={div:function(e){var t=e.getAttribute("type"),n=e.getAttribute("subtype"),a=e.getAttribute("n");if("textpart"===t&&"section"===n){var c=document.createElement("span");c.className+=" section-heading",c.append("".concat(n," ").concat(a)),e.prepend(c)}},cb:function(e){var t=document.createElement("span");t.className+=" section-heading",t.append("Col. ".concat(e.getAttribute("n"))),e.prepend(t)},ab:function(e){var t=document.createElement("span");t.className+=" leiden-transcription",Object(h.a)(e.childNodes).forEach((function(e){return t.appendChild(e)})),e.appendChild(t)},ex:function(e){var t=e.getAttribute("cert");e.prepend("("),"low"===t&&e.append("?"),e.append(")")},abbr:function(e){"expan"!==e.parentNode.nodeName&&e.append("(- - -)")},am:function(e){e.textContent=""},del:function(e){"erasure"===e.getAttribute("rend")&&(e.prepend("\u27e6"),e.append("\u27e7"))},subst:function(e,t,n){var a=e.querySelector("del");a&&("corrected"===a.getAttribute("rend")&&v(a,e,"del",n))},add:function(e){"overstrike"===e.getAttribute("place")&&(e.prepend("\xab"),e.append("\xbb"))},surplus:function(e){e.prepend("{"),e.append("}")},desc:function(e){e.prepend("("),e.append(")")},note:function(e){e.prepend("("),e.append(")")},space:function(e){var t=e.getAttribute("extent"),n=e.getAttribute("unit"),a="low"===e.getAttribute("cert"),c=e.getAttribute("quantity"),r="(";"line"===n?r+="vacat":c||"unknown"===t&&a?(r+="vac.",c>1&&(r+=c),a&&(r+="?")):"unknown"===t&&(r+="vacat"),r+=")",e.textContent=r},g:function(e,t){e.textContent=e.textContent+" "},placename:g,persname:g,supplied:function(e,t){if("true"===e.getAttribute("leiden-processed"))return null;!function(e,t){var n="low"===e.getAttribute("cert"),a=e.getAttribute("reason"),c=e;!function(e,t){"lost"===e?t.prepend("["):"omitted"===e?t.prepend("<"):"subaudible"===e&&t.prepend("(scil. ")}(a,e),A(e),n&&e.append("(?)");for(var r=O(e),i=t.nextNode();i;)r.includes(i)?i=t.nextNode():i.nodeType===Node.TEXT_NODE&&i.nodeValue.trim().length||i.nodeType===Node.ELEMENT_NODE&&["lb","ab","cb","div"].includes(i.nodeName)||i.nodeType===Node.ELEMENT_NODE&&"supplied"===i.nodeName&&i.getAttribute("reason")!==a?i=null:i.nodeType===Node.ELEMENT_NODE&&"supplied"===i.nodeName?(A(i),c=i,"low"===i.getAttribute("cert")&&i.append("(?)"),i.setAttribute("leiden-processed","true"),r=O(i),i=t.nextNode()):i=t.nextNode();!function(e,t){"lost"===e?t.append("]"):"omitted"===e?t.append(">"):"subaudible"===e&&t.append(")")}(a,c),t.currentNode=e}(e,t)},unclear:function(e){e.textContent=e.textContent.split("").map((function(e){return e+"\u0323"})).join("").trim()},hi:function(e){var t=e.getAttribute("rend");if("ligature"===t){var n=e.textContent;e.textContent=n.charAt(0)+"\u0302"+n.substring(1)}else if("superscript"===t){var a=document.createElement("sup");a.textContent=e.textContent,e.textContent="",e.appendChild(a)}},lb:function(e){var t=e.getAttribute("break"),n=e.getAttribute("n"),a=e.getAttribute("style"),c=" ";"text-direction:r-to-l"===a?c="\u2190":"text-direction:l-to-r"===a?c="\u2192":"text-direction:spiral-clockwise"===a?c="\u21bb":"text-direction:spiral-anticlockwise"===a?c="\u21ba":"text-direction:upwards"===a?c="\u2191":"text-direction:downwards"===a&&(c="\u2193"),"no"===t&&e.append("-"),1!==n&&e.append(document.createElement("br"));var r=document.createElement("span");r.className+=" leiden-num-span",r.append("".concat(n,". ").concat(c)),e.append(r)},choice:function(e,t,n){var a=e.querySelector("reg"),c=e.querySelector("corr");a?v(a,e,"reg",n):c&&v(c,e,"Correction",n)},milestone:function(e){var t=document.createElement("sup");t.textContent="".concat(e.getAttribute("n")),e.append("|"),e.append(t)},gap:function(e){var t,n=e.getAttribute("reason"),a=e.getAttribute("extent"),c=e.getAttribute("quantity"),r=e.getAttribute("unit"),i=e.getAttribute("atLeast"),o=e.getAttribute("atMost"),d=e.getAttribute("precision"),p=d&&"low"===d?"ca.":"",u=r&&"line"===r,l="";if("lost"===n)u?"unknown"===a?t=" - - - - - ":(t="  [- - - - - -",l="]  "):(t="[","unknown"===a?t+="- - ? - -":i||o?t+=" - ".concat(i,"-").concat(o," - "):c&&c<5?t+=". ".repeat(c).trim():c&&c>=5&&(t+="low"===d?"- - ".concat(p).concat(c," - - "):". . ".concat(c," . . ")),l="]");else if("illegible"===n){var s=u?"(Traces of ":". . ",x=u?" lines)":" . .";"unknown"===a?t=u?"".concat(s.trim()).concat(x):"".concat(s,"?").concat(x):i||o?t="".concat(s).concat(i,"-").concat(o).concat(x):c&&c<5?t=". ".repeat(c).trim():c&&c>=5&&(t="".concat(s).concat(p).concat(c).concat(x))}else"omitted"===n&&(t="<- - ? - ",l="->");e.prepend(t),e.append(l)}},N=n(115),j=n(116),E=n(117),y=n(125),T=n(40),C=Object(f.a)({avatar:{backgroundColor:T.a[100],color:T.a[600]}});function q(e){var t=e.title,n=e.body,c=e.open,r=e.handleClose;C();return Object(a.jsxs)(y.a,{"aria-labelledby":"simple-dialog-title",open:c,onClose:r,children:[Object(a.jsx)(N.a,{id:"simple-dialog-title",children:t}),Object(a.jsx)(j.a,{children:Object(a.jsx)(E.a,{id:"alert-dialog-description",children:n})})]})}var k=new DOMParser,H=function(e){var t,n=e.tei,i=r.a.useState(!1),o=Object(d.a)(i,2),p=o[0],u=o[1],s=r.a.useState(),x=Object(d.a)(s,2),b=x[0],f=x[1],h=r.a.useState(),O=Object(d.a)(h,2),A=O[0],g=O[1],v=function(e,t){f(e),g(t),u(!0)};return Object(c.useEffect)((function(){if(n){t.childNodes.forEach((function(e){return t.removeChild(e)}));var e=function(e,t){var n=e.replace(/[\r\n\t]/g,""),a=k.parseFromString(n,"application/xml").querySelector('div[type="edition"]');console.log(a);for(var c=document.createTreeWalker(a);c.nextNode();){var r=m[c.currentNode.nodeName];r&&r(c.currentNode,c,t)}return a}(n,v);t.appendChild(e)}}),[n]),Object(a.jsxs)(l.a,{m:4,textAlign:"left",children:[Object(a.jsx)("div",{ref:function(e){return t=e}}),Object(a.jsx)(q,{title:b,body:A,open:p,handleClose:function(){u(!1)}})]})},L=Object(f.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:48,padding:"0 30px"},button:{maxWidth:"100px",maxHeight:"40px",minWidth:"100px",minHeight:"40px"}});var w=function(){var e=Object(c.useState)(),t=Object(d.a)(e,2),n=t[0],r=t[1];return Object(c.useEffect)((function(){fetch("https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml").then((function(e){return e.text()})).then((function(e){return r(e)}))}),[]),L(),Object(a.jsxs)(p.a,{maxWidth:!1,className:"App",children:[Object(a.jsx)(l.a,{m:2,children:Object(a.jsx)("img",{src:"data:image/png;base64,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",alt:"logo",height:100})}),Object(a.jsx)(u.a,{variant:"h4",component:"h1",gutterBottom:!0,children:"I.Sicily EpiDoc Viewer"}),Object(a.jsxs)(s.a,{container:!0,spacing:3,children:[Object(a.jsx)(s.a,{item:!0,xs:6,children:Object(a.jsxs)(x.a,{children:[Object(a.jsx)("h4",{children:"Epidoc"}),Object(a.jsx)(l.a,{height:"32em",children:Object(a.jsx)(b.a,{placeholder:"Paste your text division here",multiline:!0,rows:26,rowsMax:26,fullWidth:!0,value:n,onChange:function(e){return r(e.target.value)}})})]})}),Object(a.jsx)(s.a,{item:!0,xs:6,children:Object(a.jsxs)(x.a,{children:[Object(a.jsx)("h4",{children:"Leiden"}),Object(a.jsx)(l.a,{height:"32em",overflow:"auto",children:Object(a.jsx)(H,{tei:n})})]})})]})]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,128)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))},F=n(121),M=n(120),P=n(52),G=Object(P.a)({palette:{type:"light",primary:{main:"#002147",light:"#002147",dark:"#002147"},secondary:{main:"#002147",light:"#002147",dark:"#002147"},background:{default:"#e6e6e6"},text:{primary:"#002147"}},typography:{fontFamily:"'PT Sans', sans-serif"},overrides:{MuiPaper:{root:{padding:"30px 30px",margin:"30px",backgroundColor:"#fff"}},MuiButton:{root:{margin:"15px"}},MuiInputBase:{root:{fontSize:"14px",lineHeight:"17px"},input:{height:"0.95em"}}}});o.a.render(Object(a.jsxs)(M.a,{theme:G,children:[Object(a.jsx)(F.a,{}),Object(a.jsx)(w,{})]}),document.getElementById("root")),J()}},[[78,1,2]]]);
//# sourceMappingURL=main.7cd69ce2.chunk.js.map