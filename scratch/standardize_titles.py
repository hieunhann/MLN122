import os
import re

path = 'Page/Content01'

# Hàm để lấy số từ tên file (ví dụ: Content01_12.html -> 12)
def get_num(filename):
    match = re.search(r'_(\d+)\.html$', filename)
    return int(match.group(1)) if match else 0

# Lấy danh sách file và sắp xếp theo số thứ tự
files = [f for f in os.listdir(path) if f.endswith('.html')]
files.sort(key=get_num)

for i, filename in enumerate(files, 1):
    file_path = os.path.join(path, filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Tìm và thay thế nội dung trong thẻ <title>
    new_title = f'Slide {i}'
    new_content = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Renamed title in {filename} to "{new_title}"')
