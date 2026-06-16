#!/bin/bash
SITE="https://cbae1489-c01a-4420-b25e-aea79bd6480b.vip.gensparksite.com"
echo "Genspark to GitHub sync start..."
curl -s -o js/dashboard.js "$SITE/js/dashboard.js" && echo "OK js/dashboard.js"
curl -s -o css/dashboard.css "$SITE/css/dashboard.css" && echo "OK css/dashboard.css"
curl -s -o index.html "$SITE/index.html" && echo "OK index.html"
curl -s -o js/find-account.js "$SITE/js/find-account.js" && echo "OK js/find-account.js"
curl -s -o find-pw.html "$SITE/find-pw.html" && echo "OK find-pw.html"
curl -s -o js/supabase.js "$SITE/js/supabase.js" && echo "OK js/supabase.js"
curl -s -o dashboard.html "$SITE/dashboard.html" && echo "OK dashboard.html"
curl -s -o register.html "$SITE/register.html" && echo "OK register.html"
curl -s -o find-id.html "$SITE/find-id.html" && echo "OK find-id.html"
curl -s -o css/login.css "$SITE/css/login.css" && echo "OK css/login.css"
curl -s -o js/auth.js "$SITE/js/auth.js" && echo "OK js/auth.js"
curl -s -o css/register.css "$SITE/css/register.css" && echo "OK css/register.css"
curl -s -o js/login.js "$SITE/js/login.js" && echo "OK js/login.js"
curl -s -o js/register.js "$SITE/js/register.js" && echo "OK js/register.js"
curl -s -o css/find-account.css "$SITE/css/find-account.css" && echo "OK css/find-account.css"
git add -f .
git status
git commit -m "sync $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo "Done!"
git pull origin main --rebase
git push origin main
git pull origin main --rebase
git push origin main
