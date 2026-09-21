import re
from pathlib import Path
root = Path(r"D:/IT/Mangalgatha---wedding-planne")
public = root / "public"
all_files = {'/' + str(p.relative_to(public)).replace('\\','/') for p in public.rglob('*') if p.is_file()}
refs = set()
pattern = re.compile(r'["\'](/gallery/[\w %()\-\.]+)["\']')
for p in root.rglob('*.tsx'):
    text = p.read_text(encoding='utf-8')
    for m in pattern.finditer(text):
        refs.add(m.group(1))
missing = sorted(refs - all_files)
print('ref_count', len(refs))
print('file_count', len(all_files))
print('missing_count', len(missing))
for x in missing:
    print('MISSING', x)
