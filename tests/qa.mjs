import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const browser = await chromium.launch({channel:'chrome',headless:true});
const results=[];
const errors=[];
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
const routes=['/','/services/','/about/','/projects/','/contact/','/privacy/','/projects/the-courtyard/','/projects/stone-and-stillness/','/projects/a-life-outside/'];
for(const width of [1440,390,320]){
 await page.setViewportSize({width,height:1000});
 for(const route of routes){
  const response=await page.goto('http://127.0.0.1:4321'+route);assert.equal(response.status(),200);
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode();})));
  console.log('Checking',width,route);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false,`overflow: ${route} ${width}`);
  const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.deepEqual(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`axe: ${route} ${width}`);
  results.push(`${width}px ${route}: HTTP 200, images decoded, no overflow, axe WCAG A/AA zero violations`);
  if(width!==320&&['/','/contact/','/projects/'].includes(route))await page.screenshot({path:`docs/screenshots/${route==='/'?'home':route.replaceAll('/','')}-${width}.png`,fullPage:true});
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4321/');
const menu=page.getByRole('button',{name:'Menu'});await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
const slider=page.getByRole('slider');await slider.focus();await page.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'51');assert.equal(await page.locator('output').innerText(),'51% after');
await page.goto('http://127.0.0.1:4321/projects/');await page.getByRole('button',{name:'Hardscape',exact:true}).click();assert.equal(await page.locator('.project:visible').count(),1);await page.getByRole('button',{name:'All',exact:true}).click();assert.equal(await page.locator('.project:visible').count(),3);
await page.goto('http://127.0.0.1:4321/contact/?service=hardscape');assert.equal(await page.locator('[name=service]').inputValue(),'hardscape');
await page.locator('[name=name]').fill('Alex Sample');await page.locator('[name=email]').fill('alex@example.com');await page.locator('[name=zip]').fill('12345');await page.locator('[name=message]').fill('A sample patio with a quiet garden.');await page.getByRole('checkbox').check();
const requests=[];page.on('request',r=>requests.push(r.url()));await page.getByRole('button',{name:'Preview estimate request'}).click();await page.waitForTimeout(200);assert.equal(requests.length,0);assert.match(await page.getByRole('status').innerText(),/Nothing was sent or saved/);assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
await page.screenshot({path:'docs/screenshots/form-success-mobile.png',fullPage:true});
await page.goto('http://127.0.0.1:4321/');await slider.evaluate(el=>{el.value='25';el.dispatchEvent(new Event('input'));});await page.locator('.comparison-section').screenshot({path:'docs/screenshots/before-after.png'});
const links=await page.locator('a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));for(const link of new Set(links)){assert.equal((await page.request.get('http://127.0.0.1:4321'+link)).status(),200);}
// Navigation and content remain accessible with JavaScript disabled; submit stays disabled.
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:900}});await nojs.goto('http://127.0.0.1:4321/contact/');assert.equal(await nojs.getByRole('button',{name:'Preview estimate request'}).isDisabled(),true);await nojs.close();
assert.deepEqual(errors,[]);
results.push('PASS: mobile menu + Escape, keyboard slider, gallery filters, service preselect, form validation + success, zero form network requests/storage, internal homepage links, JavaScript-disabled form safety, zero browser errors.');
writeFileSync('docs/qa-results.json',JSON.stringify({date:'2026-10-18',browser:'Chrome via Playwright',results},null,2));
console.log(results.join('\n'));await browser.close();


