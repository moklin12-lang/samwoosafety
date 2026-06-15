#!/bin/bash
echo "Genspark to GitHub sync start..."
curl -s -o js/dashboard.js "https://samwoosafety.co.kr/js/dashboard.js" && echo "OK js/dashboard.js"
curl -s -o css/dashboard.css "https://samwoosafety.co.kr/css/dashboard.css" && echo "OK css/dashboard.css"
curl -s -o index.html "https://samwoosafety.co.kr/index.html" && echo "OK index.html"
curl -s -o js/find-account.js "https://samwoosafety.co.kr/js/find-account.js" && echo "OK js/find-account.js"
curl -s -o find-pw.html "https://samwoosafety.co.kr/find-pw.html" && echo "OK find-pw.html"
curl -s -o js/supabase.js "https://samwoosafety.co.kr/js/supabase.js" && echo "OK js/supabase.js"
curl -s -o dashboard.html "https://samwoosafety.co.kr/dashboard.html" && echo "OK dashboard.html"
curl -s -o register.html "https://samwoosafety.co.kr/register.html" && echo "OK register.html"
curl -s -o find-id.html "https://samwoosafety.co.kr/find-id.html" && echo "OK find-id.html"
curl -s -o css/login.css "https://samwoosafety.co.kr/css/login.css" && echo "OK css/login.css"
curl -s -o js/auth.js "https://samwoosafety.co.kr/js/auth.js" && echo "OK js/auth.js"
git add .
git commit -m "sync"
git push origin main
echo "Done!"
