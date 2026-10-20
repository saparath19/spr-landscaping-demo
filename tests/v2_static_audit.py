"""Standard-library-only structural checks for the V2 package; not a substitute for build/browser QA."""
from pathlib import Path
from xml.etree import ElementTree as ET

root = Path(__file__).resolve().parents[1]
checks = []

def check(ok, label):
    checks.append((bool(ok),label))
    if not ok:
        raise AssertionError(label)

layout=(root/'src/layouts/Layout.astro').read_text('utf-8')
home=(root/'src/pages/index.astro').read_text('utf-8')
check("../styles/premium-v2.css" in layout, 'V2 styles imported into Layout')
check("prefers-reduced-motion: no-preference" in layout,'Entrance motions respect reduced-motion preference')
check("Your outdoors." in home and 'hero-editorial' in home,'New hero and editorial frame in source')
check('noindex, nofollow' in layout,'Demo still noindex')
check('hero-section' in (root/'docs/V2_RELEASE_NOTES.md').read_text('utf-8'),'Landing page skill mapping documented')
check((root/'src/pages/contact.astro').read_text('utf-8').count('Nothing was sent or saved')==1,'Contact stays demo-only')
for name in ('before','after'):
    ET.parse(root/f'public/images/{name}.svg')
    checks.append((True,f'{name} illustration parses as SVG/XML'))
for group in ('hero','garden','terrace','hero-detail','garden-detail','terrace-detail'):
    for size in (640,1280,1920):
        f=root/f'public/images/{group}-{size}.webp'
        check(f.is_file() and f.stat().st_size>1000, f'{group}-{size}.webp exists and not empty')
print('\n'.join(('PASS' if ok else 'FAIL')+' '+label for ok,label in checks))
print(f'PASS {len(checks)} static checks. Full build/browser testing still required.')
