set Path=%APPDATA%\npm\;D:\Program Files\nodejs\;%Path%

cd /d %~dp0

REM call npm run build-prod-JobManagerBeta
REM call ng build --prod --base-href /JobManagerAPIBeta/ --build-optimizer=false
call ng build --prod --base-href /JobManagerBeta/

copy src\web.config dist
xcopy dist\JobManagerUI\* \\kghapp83v\c$\inetpub\wwwroot\JobManagerBeta /s /e /y
pause
