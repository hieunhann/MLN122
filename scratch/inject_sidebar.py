import os

path = 'Page/Content01'
script_tag = '<script src="../../assets/sidebar.js"></script>'

for filename in os.listdir(path):
    if filename.endswith('.html'):
        file_path = os.path.join(path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'sidebar.js' not in content:
            new_content = content.replace('</body>', f'{script_tag}</body>')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated: {filename}')
        else:
            print(f'Skipped (already exists): {filename}')
