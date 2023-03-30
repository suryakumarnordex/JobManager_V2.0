set Path=%APPDATA%\npm\;D:\Program Files\nodejs\;%Path%

cd /d %~dp0

REM call npm run build-prod-JobManager
REM call ng build --prod --base-href /JobManager/ --build-optimizer=false
call ng build --base-href /JobManager/

copy src\web.config dist
xcopy dist\JobManagerUI\* \\kghapp83v\C$\inetpub\wwwroot\JobManager /s /e /y
pause
