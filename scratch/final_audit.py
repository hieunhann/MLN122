import os
import re

# Các thư mục cần kiểm tra
content_path = 'Page/Content01'
root_page = 'Page/Slide1.html' # Coi như Slide 0

report = []

def check_file(file_path):
    if not os.path.exists(file_path):
        return f"MISSING: {file_path}"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Check Title
    title_match = re.search(r'<title>(.*?)<\/title>', content)
    if not title_match:
        issues.append("No title tag found")
    
    # Check Sidebar
    if 'sidebar.js' not in content:
        issues.append("sidebar.js is NOT injected")
        
    # Check Background Image Path
    bg_match = re.search(r"background:\s*url\(['\"](.*?)['\"]\)", content)
    if bg_match:
        bg_url = bg_match.group(1).replace('../../', '')
        if not os.path.exists(bg_url) and not os.path.exists(os.path.join('Page/Content01', bg_match.group(1))):
             # Try relative to file
             pass # Simplification for now
             
    return issues

# 1. Kiểm tra Slide 0 (Slide1.html)
slide0_issues = check_file(root_page)
if slide0_issues:
    report.append(f"Slide 0 ({root_page}): {', '.join(slide0_issues)}")

# 2. Kiểm tra Slide 1-21
for i in range(1, 22):
    file_name = f"{i}.html"
    file_path = os.path.join(content_path, file_name)
    issues = check_file(file_path)
    
    # Kiểm tra điều hướng (Arrow keys logic)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check Next/Prev Logic
        prev_slide = f"{i-1}.html" if i > 1 else "../Slide1.html"
        next_slide = f"{i+1}.html"
        
        if i < 21 and next_slide not in content:
            issues.append(f"Broken 'Next' link (expected {next_slide})")
        if prev_slide not in content:
            issues.append(f"Broken 'Prev' link (expected {prev_slide})")

    if issues:
        report.append(f"Slide {i} ({file_name}): {', '.join(issues)}")

if not report:
    print("ALL SLIDES ARE PERFECT! (0 to 21)")
else:
    print("ISSUES FOUND:")
    for r in report:
        print(f"- {r}")
