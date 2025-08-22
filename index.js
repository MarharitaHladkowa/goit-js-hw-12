import{a as d,S as f,i as n}from"./assets/vendor-5YrzWRhu.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="https://pixabay.com/api/",m="51834666-cf153cf5c7da2b7bccbcade97";async function y(a){return(await d.get(p,{params:{key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}пше;const l=document.querySelector(".gallery"),u=document.querySelector(".loader");let h=new f(".gallery a",{captionsData:"alt",captionDelay:250});function g(){l.innerHTML=""}function L(a){const o=a.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="info">
          <p>👍 ${r.likes}</p>
          <p>👁️ ${r.views}</p>
          <p>💬 ${r.comments}</p>
          <p>⬇️ ${r.downloads}</p>
        </div>
      </li>`).join("");l.insertAdjacentHTML("beforeend",o),h.refresh()}function b(){u.classList.remove("hidden")}function w(){u.classList.add("hidden")}const c=document.querySelector("#searchForm");c.addEventListener("submit",async a=>{a.preventDefault();const o=c.elements["search-text"].value.trim();if(!o){n.error({title:"Error",message:"Please enter a search term!"});return}g(),b();try{const r=await y(o);if(r.hits.length===0){n.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}L(r.hits)}catch{n.error({title:"Error",message:"Something went wrong. Try again!"})}finally{w()}});
//# sourceMappingURL=index.js.map
