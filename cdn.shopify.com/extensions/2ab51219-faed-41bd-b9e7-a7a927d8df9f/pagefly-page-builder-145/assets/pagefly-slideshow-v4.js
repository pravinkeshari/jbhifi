class _pf_Slideshow{currentIndex=0;elementSettings={};constructor(t,e={}){var i;t&&(this.container=t,this.elementSettings=Object.assign(this.getElementSettings(),e),{listLayout:e,device:i}=this.elementSettings,_pf_isEmpty(this.elementSettings)||e[i]!==_pf_LIST_LAYOUT.SLIDE||(this.slides=t.querySelectorAll(":scope > .pf-slide"),this.nextButton=t.querySelector(":scope > .pf-slider-next"),this.prevButton=t.querySelector(":scope > .pf-slider-prev"),this.nextButton.style.zIndex="10",this.prevButton.style.zIndex="10",this.initSlideshow()))}destroy=()=>{this.disconnectResizeObserver&&this.disconnectResizeObserver(),this.disconnectVisibleObserver&&this.disconnectVisibleObserver(),this.container?.removeEventListener("scroll",this.scrollEnd),this.nextButton?.removeEventListener("click",this.handleNextNavigationButons),this.prevButton?.removeEventListener("click",this.handlePrevNavigationButons),this.paginationButtons?.forEach((t,e)=>t.removeEventListener("click",t=>{this.handleClickPaginationButon(t,e)}))};getElementSettings=()=>{var t=this.container.getAttribute("data-slider")?.replace(/'/g,'"'),t=t?JSON.parse(t):{};return t.device||(t.device=_pf_getDevice()),t};initSlideshow=()=>{try{var{maxHeight:t,isEditor:e=!1}=this.elementSettings;e||this.renderPaginationButtonsLiveView(),this.paginationButtons=this.container.querySelectorAll(":scope > .pf-slider-nav > button"),this.initVisibleObservers(),t||this.updateSliderHeight(!0),!t&&e&&this.resizeSlideObserver(),this.initScrollAction(),this.handleNavigationButtons(),this.handlePaginationButtons(),this.container.addEventListener("scroll",this.scrollEnd)}catch(t){console.error(`Error init slideshow ${this.container}: `,t)}};scrollEnd=()=>{let{navStyle:e,maxHeight:i,paginationStyle:s}=this.elementSettings;clearTimeout(this.timer),this.timer=setTimeout(()=>{var t=!this.container.getAttribute("no-update-pagination-and-current-index-again");t&&this.updateCurrentIndexByScroll(),"none"!==e&&this.updateNavigationButtonsState(),i||this.updateSliderHeight(),"none"!==s&&t&&this.updatePaginationButtonsState(),this.container.removeAttribute("no-update-pagination-and-current-index-again")},100)};updateCurrentIndexByScroll=()=>{var{device:t,displayPartialItems:e,slidesToShow:i}=this.elementSettings,s=Array.from(this.slides).filter(t=>t.classList.contains("is-visible"));let n=Array.from(this.slides).findIndex(t=>t.classList.contains("is-visible"));e[t]&&(s.length>=Number(i[t])+2||0<n)&&n++,this.currentIndex=n<0?0:n};updateNavigationButtonsState=()=>{var{device:t,slidesToShow:e}=this.elementSettings,i=this.getTotalPaginationButtons(),s=this.getActivePagination();this.slides.length<=e[t]?(this.nextButton.style.visibility="hidden",this.prevButton.style.visibility="hidden"):i-1<=s?(this.nextButton.style.visibility="hidden",this.prevButton.style.visibility=""):0===s?(this.nextButton.style.visibility="",this.prevButton.style.visibility="hidden"):(this.nextButton.style.visibility="",this.prevButton.style.visibility="")};getTotalPaginationButtons=()=>{var{slidesToShow:t,slidesToScroll:e,device:i}=this.elementSettings;return this.slides.length<=t[i]?1:Math.ceil((this.slides.length-t[i])/e[i])+1};getActivePagination=()=>{var{slidesToScroll:t,device:e}=this.elementSettings;return Math.ceil(Number(this.currentIndex)/t[e])};updateSliderHeight=(t=!1)=>{var e,i,s;t?({device:t,slidesToShow:i,displayPartialItems:e,spacing:s}=this.elementSettings,e=e[t]?Number(i[t])+1:i[t],i=Array.from(this.slides).slice(0,e).map(t=>this.getTotalHeightOfActiveSlides(t)),e=Math.max(...i)||0,this.container.style.height=Number.parseInt(s[t])+e+"px"):({device:i,spacing:s}=this.elementSettings,t=this.getMaxHeightOfActiveSlides(),this.container.style.height=Number.parseInt(s[i])+t+"px")};getTotalHeightOfActiveSlides=(t,i=!1)=>{try{let e=0;var s=t.childNodes;for(let t=0;t<s.length;t++){var n=s[t],a=i?parseInt(getComputedStyle(n).height):n.getBoundingClientRect().height;e+=Number(a||0)}return e}catch(t){return console.error(t),0}};getMaxHeightOfActiveSlides=()=>{let t=Array.from(this.slides).filter(t=>t.classList.contains("is-visible"));t.length||({slidesToShow:i,device:e}=this.elementSettings,t=Array.from(this.slides).slice(0,i[e]));var e,i=t.map(t=>this.getTotalHeightOfActiveSlides(t));return Math.max(...i)};updatePaginationButtonsState=()=>{var t=this.paginationButtons?.length-1;let i=this.getActivePagination();i>t&&(i=t),this.paginationButtons?.forEach((t,e)=>{e===i?t.classList.add("active"):t.classList.remove("active")})};renderPaginationButtonsLiveView=()=>{if("none"!==this.elementSettings.paginationStyle){var e=this.container.querySelector(":scope > .pf-slider-nav");if(e){e.replaceChildren();let t=this.getTotalPaginationButtons();for(;0<t;){var i=document.createElement("button");i.setAttribute("type","button"),e.appendChild(i),t--}}}};resizeSlideObserver=()=>{let e=new ResizeObserver(()=>{this.updateSliderHeight()});this.slides.forEach(t=>t.childNodes.forEach(t=>e.observe(t))),this.disconnectResizeObserver=()=>{this.slides.forEach(t=>{t.childNodes.forEach(t=>e.unobserve(t))}),e.disconnect()}};initVisibleObservers=async()=>{let e=new IntersectionObserver((t,e)=>{t.forEach(t=>this.updateVisibleClasses(t))},{root:this.container,threshold:.01});this.slides.forEach(t=>e.observe(t)),this.disconnectVisibleObserver=()=>{this.slides.forEach(t=>e.unobserve(t)),e.disconnect()}};updateVisibleClasses(t){var e=t.target;t.isIntersecting?e.classList.add("is-visible"):e.classList.remove("is-visible")}initScrollAction=()=>{let{device:i,slidesToScroll:s}=this.elementSettings;this.slides.forEach((t,e)=>{e%s[i]==0?t.style.scrollSnapStop="always":t.style.scrollSnapStop=""})};handleNavigationButtons=()=>{this.nextButton&&this.prevButton&&("none"!==this.elementSettings.navStyle&&this.updateNavigationButtonsState(),this.nextButton?.addEventListener("click",this.handleNextNavigationButons,{passive:!0}),this.prevButton?.addEventListener("click",this.handlePrevNavigationButons,{passive:!0}))};handleNextNavigationButons=e=>{e.stopPropagation();var i=this.slides.length,{slidesToScroll:s,device:n}=this.elementSettings;if(!e.detail||1===e.detail){e=i-s[n];let t=Number(this.currentIndex)+Number(s[n]);t>e&&(t=e),this.currentIndex=t,this.updatePaginationButtonsState(),this.container.setAttribute("no-update-pagination-and-current-index-again","true"),this.goToSlide(t)}};handlePrevNavigationButons=t=>{t.stopPropagation();var{slidesToScroll:e,device:i}=this.elementSettings;if("hidden"===this.nextButton.style.visibility&&this.updateCurrentIndexByScroll(),!t.detail||1===t.detail){let t=this.currentIndex-e[i];t<0&&(t=0),this.currentIndex=t,this.updatePaginationButtonsState(),this.container.setAttribute("no-update-pagination-and-current-index-again","true"),this.goToSlide(t)}};goToSlide=t=>{var{top:t,left:e}=this.getScrollOffset(t);this.container.scroll({top:t,left:e,behavior:"smooth"})};getScrollOffset=t=>{var t=this.slides[t],e=t?.offsetTop||0,t=t?.offsetLeft||0;function i(t,e,i){return t=Math.min(i,t),t=Math.max(e,t)}return{top:i(e,0,this.container.scrollHeight),left:i(t,0,this.container.scrollWidth)}};handlePaginationButtons=()=>{"none"!==this.elementSettings.paginationStyle&&this.updatePaginationButtonsState(),this.paginationButtons?.forEach((t,e)=>{t.addEventListener("click",t=>{this.handleClickPaginationButon(t,e)})})};handleClickPaginationButon=(t,e)=>{t.stopPropagation();var{slidesToScroll:i,device:s}=this.elementSettings;t.detail&&1!==t.detail||(this.paginationButtons.forEach(t=>t.classList.remove("active")),t.target.classList.add("active"),this.container.setAttribute("no-update-pagination-and-current-index-again","true"),t=e*i[s],this.currentIndex=t,this.goToSlide(t))}}async function _pf_handleShopifyListElement(){["ProductList2","CollectionListing2","ArticleList2","ContentList2","Instagram2"].forEach(t=>{_pf_handleShopifyInitSlideshow(`[data-pf-type="${t}"]`)})}async function _pf_handleShopifyInitSlideshow(e){try{document.querySelectorAll(e).forEach(t=>{t=t.querySelector(".pf-slider");new _pf_Slideshow(t)})}catch(t){console.error(`Error init slideshow ${e} `,t)}}_pf_handleShopifyListElement().catch(console.error);