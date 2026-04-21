(function() {
    // 1. Define Menu Items
    const menuItems = [
        { name: 'NGUỒN GỐC TƯ BẢN', path: 'Content01/1.html', pages: ['/1', '/2'] },
        { name: 'CÁCH THỨC SẢN XUẤT GTTD', path: 'Content01/3.html', pages: ['/3', '/4', '/5'] },
        { name: 'BẢN CHẤT GIÁ TRỊ THẶNG DƯ', path: 'Content01/6.html', pages: ['/6'] },
        { name: 'PHƯƠNG PHÁP SẢN XUẤT', path: 'Content01/7.html', pages: ['/7', '/10'] },
        { name: '“BÁI VẬT GIÁO HÀNG HÓA”', path: 'Content01/11.html', pages: ['/11', '/12', '/13', '/14'] },
        { name: '“THA HÓA LAO ĐỘNG”', path: 'Content01/15.html', pages: ['/15', '/16', '/17'] },
        { name: 'TỔNG KẾT', path: 'Content01/18.html', pages: ['/18', '/19', '/20', '/21'] }
    ];

    // 2. Create Sidebar Structure
    const sidebar = document.createElement('div');
    sidebar.id = 'main-sidebar';
    sidebar.style.cssText = `
        position: fixed !important; top: 15px !important; left: 15px !important; 
        height: calc(100vh - 30px) !important; width: 80px !important;
        background: rgba(255, 255, 255, 0.98) !important;
        transition: width 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
        z-index: 2147483647 !important;
        overflow: hidden !important; 
        border: 1px solid rgba(139, 0, 0, 0.15) !important;
        border-radius: 40px !important;
        display: flex !important; flex-direction: column !important;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(15px) !important;
    `;

    const toggle = document.createElement('div');
    toggle.style.cssText = `
        height: 85px !important; width: 100% !important; display: flex !important; 
        align-items: center !important; justify-content: center !important; 
        cursor: pointer !important; color: #8b0000 !important; flex-shrink: 0 !important;
    `;
    toggle.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 5px; width: 30px; align-items: center; justify-content: center;">
            <span style="display: block; width: 30px; height: 3px; background: #8b0000; border-radius: 3px;"></span>
            <span style="display: block; width: 20px; height: 3px; background: #8b0000; border-radius: 3px;"></span>
            <span style="display: block; width: 30px; height: 3px; background: #8b0000; border-radius: 3px;"></span>
        </div>
        <span class="menu-label" style="font-family: 'Perandory', serif; font-weight: bold; margin-left: 25px; font-size: 1.7rem; opacity: 0; display: none; transition: 0.3s; color: #8b0000; white-space: nowrap;">DANH SÁCH</span>
    `;

    const menuUl = document.createElement('ul');
    menuUl.style.cssText = `list-style: none !important; padding: 20px 0 !important; margin: 0 !important; width: 100% !important; overflow-y: auto !important;`;
    
    const currentPath = window.location.pathname;

    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.cssText = `width: 100% !important; display: flex !important; justify-content: center !important; margin-bottom: 25px !important;`;
        
        const a = document.createElement('a');
        const isSubfolder = currentPath.includes('Content01/');
        const targetPath = isSubfolder ? `${item.path.split('/')[1]}` : `Content01/${item.path.split('/')[1]}`;
        
        a.href = targetPath;
        a.style.cssText = `
            display: flex !important; align-items: center !important; justify-content: flex-start !important;
            width: 100% !important; padding: 5px 0 !important; text-decoration: none !important;
        `;
        
        const isActive = item.pages.some(p => currentPath.includes(p));

        a.innerHTML = `
            <div class="side-circle" style="
                width: 50px; height: 50px; border-radius: 50%; 
                border: 2px solid transparent; 
                background: ${isActive ? '#8b0000' : 'rgba(139,0,0,0.12)'}; 
                color: ${isActive ? 'white' : '#8b0000'}; 
                display: flex; align-items: center; justify-content: center; 
                font-family: sans-serif; font-weight: 900; font-size: 1.3rem; 
                margin-left: 15px; flex-shrink: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: ${isActive ? '0 8px 25px rgba(139,0,0,0.3)' : 'none'};
                position: relative; z-index: 2;
            ">${index + 1}</div>
            <span class="item-name" style="
                opacity: 0; margin-left: 30px; transition: 0.3s; 
                font-family: 'Perandory', serif; font-size: 1.4rem; color: #8b0000;
                white-space: nowrap; font-weight: 500;
                ${isActive ? 'color: #8b0000; font-weight: bold;' : ''}
            ">${item.name}</span>
        `;
        
        li.appendChild(a);
        menuUl.appendChild(li);
    });

    sidebar.appendChild(toggle);
    sidebar.appendChild(menuUl);

    // Expand / Collapse Logic
    let expanded = false;
    function collapse() {
        expanded = false;
        sidebar.style.setProperty('width', '80px', 'important');
        const label = sidebar.querySelector('.menu-label');
        const names = sidebar.querySelectorAll('.item-name');
        label.style.opacity = '0';
        names.forEach(n => n.style.opacity = '0');
        setTimeout(() => label.style.display = 'none', 300);
    }

    function expand() {
        expanded = true;
        sidebar.style.setProperty('width', '460px', 'important');
        const label = sidebar.querySelector('.menu-label');
        const names = sidebar.querySelectorAll('.item-name');
        label.style.display = 'block';
        setTimeout(() => {
            label.style.opacity = '1';
            names.forEach(n => n.style.opacity = '1');
        }, 100);
    }

    toggle.onclick = (e) => {
        e.stopPropagation();
        if(expanded) collapse(); else expand();
    };

    // 4. Click Outside to Close
    document.addEventListener('click', (e) => {
        if (expanded && !sidebar.contains(e.target)) {
            collapse();
        }
    });

    // 5. Cleanup redundant nav arrows (from templates)
    function cleanupArrows() {
        const redundantItems = document.querySelectorAll('.navigation-controls, .nav-arrows, .browser-nav');
        redundantItems.forEach(el => el.remove());
    }

    // 6. Injection & Persistence
    function ensureSidebar() {
        if (!document.getElementById('main-sidebar')) {
            document.body.appendChild(sidebar);
            cleanupArrows();
        }
    }
    
    // 7. Styling for Hiding Scrollbars & Enhancing Citations
    const style = document.createElement('style');
    style.innerHTML = `
        #main-sidebar ul::-webkit-scrollbar { display: none !important; }
        #main-sidebar ul { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        /* Cải thiện hiển thị trích nguồn - Cập nhật cho 1.1, 1.14, 1.17 */
        .citation, [class*="citation"], .source-text, .source-tag, 
        [style*="font-style: italic"], [style*="font-style:italic"] { 
            font-size: 1.35vw !important; 
            font-weight: 800 !important; 
            opacity: 1 !important; 
            color: #8b0000 !important;
            font-style: italic !important;
            text-shadow: 0 0 1px rgba(139, 0, 0, 0.1);
        }
        
        /* Đảm bảo màu trắng nếu nền tối (như slide 1.14) */
        body[style*="red.png"] .citation, 
        body[style*="red.png"] .source-tag,
        body[style*="red.png"] [style*="font-style: italic"] {
            color: #ffd700 !important; /* Màu vàng gold trên nền đỏ sẽ nổi bật hơn */
        }
    `;
    document.head.appendChild(style);

    ensureSidebar();
    setInterval(ensureSidebar, 1500);

})();
