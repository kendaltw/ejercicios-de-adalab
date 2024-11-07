const d=document.querySelector(".js-list");let a=[],c=[];const i=document.querySelector(".js-list-favorites");function r(e){for(const t of e){let l=`
            <div class="palette_list js-palette" id=${t.id}>
                <h5>${t.name}</h5>
            
        `;for(const s of t.colors)l+=`<div class="paletteColors" style="background-color: #${s}"></div>`;l+="</div>",d.innerHTML+=l;const o=document.querySelectorAll(".js-palette");for(const s of o)s.addEventListener("click",u)}}function u(e){const t=e.currentTarget.id,l=a.find(o=>o.id===t);c.push(l),i.innerHTML="";for(const o of c){let s=`
            <div class="palette_list js-palette" id=${o.id}>
                <h5>${o.name}</h5>

        `;for(const f of o.colors)s+=`<div class="paletteColors" style="background-color: #${f}"></div>`;s+="</div>",i.innerHTML+=s}}const p=document.querySelector(".js-input");function v(){const e=p.value,t=a.filter(l=>l.name.toLowerCase().includes(e.toLowerCase()));d.innerHTML="",r(t)}p.addEventListener("input",v);const n=JSON.parse(localStorage.getItem("palettesInfo"));n!==null?(r(n),a=n):fetch("https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json").then(e=>e.json()).then(e=>{a=e.palettes,localStorage.setItem("palettesInfo",JSON.stringify(palettes)),r(palettes)});
//# sourceMappingURL=main.js.map
