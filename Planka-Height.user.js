// ==UserScript==
// @name         Planka-Height
// @namespace    http://tampermonkey.net/
// @version      2025-12-09
// @author       MeGum
// @match        https://planka.escapedoc.com/boards/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=escapedoc.com
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

var megumStarHTML = `<a class="item Header_item__Megum Header_itemHoverable__nf6CM"><i aria-hidden="true" class="star fitted icon"></i></a>`;
var interval;

(function() {
    'use strict';

    interval = setInterval(()=>
                           {
        document.getElementsByClassName("Boards_tabsWrapper__ss9zB")[0].style = "height: 60px";
        document.getElementsByClassName("Project_wrapper__XCZxv")[0].style = "height: 58px";

        document.getElementsByClassName("Header_menu__iSxy+")[0].getElementsByClassName("right")[0].insertAdjacentHTML("afterbegin", megumStarHTML);

        if(document.getElementsByClassName("Header_item__Megum").length != 0)
        {
            Start();
            clearInterval(interval);
        }
    },300);


})();

function Start()
{

    document.getElementsByClassName("Header_item__Megum")[0].onclick = ()=>{StarClick();};
    var list = GM_getValue("list");
    if(list == undefined)
    {
        GM_setValue("list",[]);
        list = [];
    }

    PaintAllHeadersByList(list);
}

function PaintAllHeadersByList(list)
{
    var elements = document.getElementsByClassName("Boards_tabs__ofxDm")[0].children;
    for(let i = 0; i < elements.length; i++){
        if(elements[i].children[0].children[0] != undefined){
            elements[i].children[0].children[0].style = "";
        }
    }
    for(let j = 0; j < list.length; j++)
    {

        for(let i = 0; i < elements.length; i++)
        {
            if(elements[i].innerText == list[j]){
                elements[i].children[0].children[0].style = "color: #ffd700;";

                break;
            }
        }
    }
}


function StarClick()
{
    var elements = document.getElementsByClassName("Boards_tabs__ofxDm")[0].children;
    var list = GM_getValue("list");
    for(let i = 0; i < elements.length; i++)
    {
        if(elements[i].getElementsByClassName("Boards_tabActive__sI2he").length != 0){

            if(list.indexOf(elements[i].innerText) == -1)
            {
                list.push(elements[i].innerText);
                GM_setValue("list",list);
            }
            else
            {
                list.splice(list.indexOf(elements[i].innerText),1);
                GM_setValue("list",list);

            }
            break;
        }
    }
    PaintAllHeadersByList(list);
}
