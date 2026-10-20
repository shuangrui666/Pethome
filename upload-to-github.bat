@echo off
echo === 宠物网站前端上传到 GitHub ===
echo.

cd E:\client

echo 1. 删除 git 锁文件...
del .git\index.lock 2>nul

echo 2. 从暂存区移除 node_modules...
echo Y | git rm -rf --cached node_modules

echo 3. 添加所有文件...
git add .

echo 4. 提交代码...
git commit -m "Initial commit: Next.js pet home client"

echo 5. 重命名主分支为 main...
git branch -M main

echo 6. 添加 GitHub 远程仓库...
git remote add origin https://github.com/shuangrui666/pethome-client.git

echo 7. 推送到 GitHub...
git push -u origin main

echo.
echo === 前端上传完成！===
pause
