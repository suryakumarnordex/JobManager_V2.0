set Path=%APPDATA%\npm\;D:\Program Files\nodejs\;%Path%

cd /d %~dp0

REM call npm run build-prod-JobManager
REM call ng build --prod --base-href /JobManagerBeta/ --build-optimizer=false
call ng build --base-href /JobManagerBeta/

copy src\web.config dist
xcopy dist\job-manger-v2\* \\kghapp83v\c$\inetpub\wwwroot\JobManagerBeta /s /e /y
pause
