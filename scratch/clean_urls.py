import os
import re

path = 'Page/Content01'

# 1. Lấy danh sách file hiện tại
files = [f for f in os.listdir(path) if f.endswith('.html') and 'Content01_' in f]

# Đổi tên file sang số (1.html, 2.html...)
for filename in files:
    match = re.search(r'Content01_(\d+)\.html$', filename)
    if match:
        old_path = os.path.join(path, filename)
        new_name = f"{match.group(1)}.html"
        new_path = os.path.join(path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_name}")

# 2. Cập nhật tất cả các liên kết bên trong các file mới và các file liên quan
all_files = []
for root, dirs, f_list in os.walk('.'):
    for f in f_list:
        if f.endswith('.html') or f.endswith('.js'):
            all_files.append(os.path.join(root, f))

for file_path in all_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Thay thế Content01_X.html bằng X.html
        new_content = re.sub(r'Content01_(\d+)\.html', r'\1.html', content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated links in: {file_path}")
    except:
        pass
