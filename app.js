(() => {
 'use strict';
 const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
 const grid=document.getElementById('project-grid');if(!grid)return;
 if(grid.dataset.initialised)return;grid.dataset.initialised='true';
 const root=grid.closest('.portfolio-root');root?.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a)return;const hash=a.getAttribute('href'),target=hash==='#'?document.documentElement:document.getElementById(hash.slice(1));if(!target)return;event.preventDefault();event.stopPropagation();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});history.replaceState(null,'',hash);});
 const empty=document.getElementById('work-empty'),filters=document.getElementById('project-filters'),dialog=document.getElementById('video-dialog'),container=document.getElementById('video-container'),more=document.getElementById('show-more'),count=document.getElementById('project-count');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)');let lastTrigger=null,projects=[],active='All work',limit=8;
 // Reveal each project once, including newly loaded and filtered projects.
 const seenProjects=new Set();
 const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const item=entry.target;seenProjects.add(item.dataset.projectId);item.classList.remove('awaiting-reveal');item.classList.add('revealed');revealObserver.unobserve(item);}},{threshold:0,rootMargin:'0px 0px -24px 0px'}):null;
 function watchProjects(){revealObserver?.disconnect();for(const [i,item] of [...grid.children].entries()){item.style.setProperty('--entrance-delay',(i%3)*65+'ms');if(!reduced.matches&&revealObserver&&!seenProjects.has(item.dataset.projectId)){item.classList.add('awaiting-reveal');revealObserver.observe(item);}}}
 grid.addEventListener('focusin',event=>{const item=event.target.closest('.project-card');if(item){item.classList.remove('awaiting-reveal');seenProjects.add(item.dataset.projectId);revealObserver?.unobserve(item);}});
 reduced.addEventListener('change',()=>{if(reduced.matches){revealObserver?.disconnect();grid.querySelectorAll('.awaiting-reveal').forEach(item=>item.classList.remove('awaiting-reveal'));}});
 const navLinks=[...document.querySelectorAll('.minimal-nav a')],navSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 function updateNav(){let active=navSections[0];for(const section of navSections){if(section.getBoundingClientRect().top<=innerHeight*.45)active=section;}for(const a of navLinks){if(a.getAttribute('href')==='#'+active?.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
 if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(updateNav,{rootMargin:'-10% 0px -55% 0px'});navSections.forEach(section=>navObserver.observe(section));}updateNav();


 // Delegate tilt to include filters and other controls created after content loads.
 const glassControlSelector='.button,.minimal-nav>a,.filters button,.hero-actions .text-link,.footer>a,.close-video,#reset-scene,.video-dialog .text-link';
 const clearGlassTilt=el=>{el?.style.removeProperty('--ui-rx');el?.style.removeProperty('--ui-ry');};
 document.addEventListener('pointermove',event=>{
  if(!fine.matches||reduced.matches)return;
  const control=event.target.closest(glassControlSelector);if(!control)return;
  const box=control.getBoundingClientRect();
  if(!box.width||!box.height)return;
  const x=Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));
  const y=Math.max(0,Math.min(1,(event.clientY-box.top)/box.height));
  control.style.setProperty('--ui-rx',(0.5-y)*12+'deg');
  control.style.setProperty('--ui-ry',(x-0.5)*14+'deg');
 });
 document.addEventListener('pointerout',event=>{
  const control=event.target.closest(glassControlSelector);
  if(control&&(!event.relatedTarget||!control.contains(event.relatedTarget)))clearGlassTilt(control);
 });
 reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll(glassControlSelector).forEach(clearGlassTilt);});

 function applySettings(s){
  if(!s)return;
  const headline=document.getElementById('hero-title'),contact=document.getElementById('contact-title');
  headline.replaceChildren(document.createTextNode(s.headline1),document.createElement('br'),document.createTextNode(s.headline2));
  contact.replaceChildren(document.createTextNode(s.contactHeadline1),document.createElement('br'),document.createTextNode(s.contactHeadline2));
  document.querySelector('.hero-intro').textContent=s.intro;
  document.title=s.name+' — Video Editor';
  const credit=document.querySelector('.footer p');if(credit)credit.textContent='© '+new Date().getFullYear()+' '+s.name+'. Every frame with purpose.';
  const email='mailto:'+s.email,phone=String(s.phone).replace(/\D/g,'');
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href=email;if(a.hasAttribute('data-email-icon')){a.setAttribute('aria-label','Email '+s.name);a.title='Email '+s.name;}else if(a.closest('.contact-actions'))a.textContent='Email '+s.name;});
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>{a.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Hi '+s.name+', I’d like to discuss a video project.');});
  document.querySelectorAll('a[href^="tel:"]').forEach(a=>{a.href='tel:'+String(s.phone).replace(/[\s()-]/g,'');a.textContent=s.phone;});
 }
 function youtubeId(value){try{const u=new URL(value);if(!['http:','https:'].includes(u.protocol))return null;let id;if(u.hostname==='youtu.be')id=u.pathname.split('/')[1];else if(['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(u.hostname))id=u.searchParams.get('v')||(/^\/(shorts|embed|live)\//.test(u.pathname)?u.pathname.split('/')[2]:null);return /^[\w-]{11}$/.test(id||'')?id:null;}catch{return null;}}
 function openProject(p,trigger){lastTrigger=trigger;document.getElementById('video-title').textContent=p.title;document.getElementById('video-description').textContent=p.description||'';document.getElementById('youtube-fallback').href='https://www.youtube.com/watch?v='+p.id;const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+p.id+'?autoplay=1&playsinline=1&rel=0';frame.title=p.title;frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';container.replaceChildren(frame);dialog.showModal();}
 document.getElementById('close-video').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();});dialog.addEventListener('close',()=>{container.replaceChildren();lastTrigger?.focus();});
 function thumbnail(img,p){img.src='https://i.ytimg.com/vi/'+p.id+'/hqdefault.jpg';img.addEventListener('error',()=>{img.src='/aperture.svg';},{once:true});}
 function card(p){const a=document.createElement('article');a.className='project-card';a.dataset.projectId=p.id;const b=document.createElement('button');b.type='button';b.className='project-play';b.setAttribute('aria-label','Play '+p.title);const img=document.createElement('img');thumbnail(img,p);img.alt='';img.loading='lazy';img.width=640;img.height=360;const play=document.createElement('span');play.className='play-icon';play.textContent='▶︎';play.setAttribute('aria-hidden','true');const watch=document.createElement('span');watch.className='card-watch';watch.textContent='Watch project';b.append(img,play,watch);b.addEventListener('click',()=>openProject(p,b));
 if(fine.matches&&!reduced.matches){b.addEventListener('pointermove',ev=>{const r=b.getBoundingClientRect();b.style.setProperty('--light-x',((ev.clientX-r.left)/r.width*100)+'%');b.style.setProperty('--light-y',((ev.clientY-r.top)/r.height*100)+'%');b.style.setProperty('--ry',((ev.clientX-r.left)/r.width-.5)*5+'deg');b.style.setProperty('--rx',(.5-(ev.clientY-r.top)/r.height)*4+'deg');});b.addEventListener('pointerleave',()=>{b.style.setProperty('--rx','0deg');b.style.setProperty('--ry','0deg');b.style.removeProperty('--light-x');b.style.removeProperty('--light-y');});}
 const info=document.createElement('div');info.className='project-info';const copy=document.createElement('div'),title=document.createElement('h3');title.textContent=p.title;copy.append(title);if(p.role){const role=document.createElement('p');role.textContent=p.role;copy.append(role);}const tag=document.createElement('span');tag.textContent=p.category;info.append(copy,tag);a.append(b,info);return a;}
 function render(){const selected=projects.filter(p=>active==='All work'||p.category===active);grid.replaceChildren(...selected.slice(0,limit).map(card));watchProjects();count.textContent=Math.min(limit,selected.length)+' of '+selected.length+' projects';more.hidden=selected.length<=limit;}
 more.addEventListener('click',()=>{limit+=6;render();});
 const stage=document.getElementById('edit-stage'),scene=document.getElementById('stage-scene'),slider=document.getElementById('scene-rotation');let originX=0,start=0,drag=false,moved=false;
 function rotate(value){const v=Math.max(-30,Math.min(30,Number(value)));slider.value=String(v);stage.style.setProperty('--rotation',v+'deg');stage.style.setProperty('--pitch',(-Math.abs(v)*.1)+'deg');document.getElementById('stage-time').textContent='00:00:'+String(Math.round(12+v/4)).padStart(2,'0')+':08';}
 slider.addEventListener('input',()=>rotate(slider.value));document.getElementById('reset-scene').addEventListener('click',()=>rotate(0));
 scene.addEventListener('pointerdown',ev=>{originX=ev.clientX;start=Number(slider.value);drag=true;moved=false;});
 scene.addEventListener('pointermove',ev=>{if(!drag)return;const delta=ev.clientX-originX;if(!moved&&Math.abs(delta)<6)return;moved=true;scene.classList.add('dragging');if(!scene.hasPointerCapture(ev.pointerId))scene.setPointerCapture(ev.pointerId);rotate(start+delta/5);});
 function end(){drag=false;scene.classList.remove('dragging');}scene.addEventListener('pointerup',end);scene.addEventListener('pointercancel',end);scene.addEventListener('click',ev=>{if(moved){ev.preventDefault();ev.stopPropagation();moved=false;}},true);
 const reelTurn=document.getElementById('reel-turn'),reelSpace=document.querySelector('.reel-space');
 reelTurn?.addEventListener('input',()=>reelSpace.style.setProperty('--reel-turn',reelTurn.value+'deg'));
 let reelStart=0,reelOrigin=0,reelDragging=false;
 reelSpace?.addEventListener('pointerdown',ev=>{if(ev.target.closest('.reel-control'))return;reelOrigin=ev.clientX;reelStart=Number(reelTurn.value);reelDragging=true;});
 reelSpace?.addEventListener('pointermove',ev=>{if(!reelDragging)return;const v=Math.max(-35,Math.min(35,reelStart+(ev.clientX-reelOrigin)/3));reelTurn.value=String(v);reelSpace.classList.add('is-turning');reelSpace.style.setProperty('--reel-turn',v+'deg');if(!reelSpace.hasPointerCapture(ev.pointerId))reelSpace.setPointerCapture(ev.pointerId);});
 const endReel=()=>{reelDragging=false;reelSpace?.classList.remove('is-turning');};reelSpace?.addEventListener('pointerup',endReel);reelSpace?.addEventListener('pointercancel',endReel);

 if(fine.matches&&!reduced.matches){scene.addEventListener('pointermove',ev=>{const r=scene.getBoundingClientRect();if(!drag){stage.style.setProperty('--hover-y',((ev.clientX-r.left)/r.width-.5)*7+'deg');stage.style.setProperty('--hover-x',(.5-(ev.clientY-r.top)/r.height)*5+'deg');}scene.style.setProperty('--light-x',((ev.clientX-r.left)/r.width*100)+'%');scene.style.setProperty('--light-y',((ev.clientY-r.top)/r.height*100)+'%');});}
 scene.addEventListener('pointerleave',()=>{stage.style.setProperty('--hover-y','0deg');stage.style.setProperty('--hover-x','0deg');});
 const preview=document.getElementById('preview-projects');
 const localIds=new Set(['MLUusH5P88U','BBHgZM79yXE','aYehiCwxwOQ','CZD6siYskG8','P5iOKc4pTFA','i-x7-N_MW9s','-1wZ7iGVg1o','OrhVP-ThYNo','MOB8M2K9zas','B3Lsvve4qXU','Oo2kRs7n3_M','yJLmMS_E3c4','fDdBWEGa5Fc','S-i00etb778','T1Ac1K_2ihQ','ixY7JL5SuFo','isJs5nKMVP4','Ysr0RgW5wDM','RgvsbhldrZc']);
 (preview?Promise.resolve(JSON.parse(preview.textContent)):fetch('/content.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('unavailable');return r.json();}).then(data=>{applySettings(data.settings);return data.projects;})).then(data=>{if(!grid.isConnected)return;projects=(Array.isArray(data)?data:[]).filter(p=>p&&typeof p.title==='string'&&p.title.trim()).map(p=>({...p,id:youtubeId(p.url),category:typeof p.category==='string'&&p.category.trim()?p.category:'Video editing'})).filter(p=>p.id);if(!projects.length)return;empty.hidden=true;grid.hidden=false;const cats=['All work',...new Set(projects.map(p=>p.category))];if(cats.length>2){filters.hidden=false;for(const cat of cats){const b=document.createElement('button');b.type='button';b.textContent=cat;b.setAttribute('aria-pressed',String(cat===active));b.addEventListener('click',()=>{active=cat;limit=8;for(const other of filters.children)other.setAttribute('aria-pressed',String(other===b));render();});filters.append(b);}}render();
 const featured=projects[0],play=document.getElementById('stage-play');play.disabled=false;play.setAttribute('aria-label','Play '+featured.title);thumbnail(document.getElementById('stage-image'),featured);document.getElementById('stage-image').alt=featured.title;play.addEventListener('click',()=>openProject(featured,play));document.querySelector('.panel-foot>span').textContent=featured.title;const sides=document.querySelectorAll('.film-back img,.film-mid img');sides.forEach((img,i)=>thumbnail(img,projects[i+1]||featured));
 }).catch(()=>{empty.hidden=false;grid.hidden=true;filters.hidden=true;count.textContent='';});
})();


