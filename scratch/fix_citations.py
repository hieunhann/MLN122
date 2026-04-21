import os
import re

path = 'Page/Content01'
# Danh sách các từ khóa hoặc định dạng đặc trưng của trích nguồn
patterns = [
    r'Ngô Tuấn Nghĩa',
    r'VnExpress',
    r'Minh Hương',
    r'\(Mô phỏng sơ đồ',
    r'\(Source:'
]

for filename in os.listdir(path):
    if filename.endswith('.html'):
        file_path = os.path.join(path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        updated = False
        # Tìm các thẻ div hoặc p có chứa các pattern và chưa có class citation
        for pattern in patterns:
            # Tìm thẻ div/p/span chứa pattern
            # Ví dụ: <div style="...">...Ngô Tuấn Nghĩa...</div>
            find_pattern = rf'(<(div|p|span)[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>.*?{pattern}.*?<\/\2>)'
            
            def add_class(match):
                tag_content = match.group(1)
                if 'class="citation"' not in tag_content and 'class=\'citation\'' not in tag_content:
                    # Chèn class="citation" vào thẻ mở
                    return tag_content.replace('>', ' class="citation">', 1)
                return tag_content

            new_content = re.sub(find_pattern, add_class, content, flags=re.IGNORECASE | re.DOTALL)
            if new_content != content:
                content = new_content
                updated = True
        
        if updated:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated citation classes in: {filename}')
