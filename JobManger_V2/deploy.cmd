set Path=%APPDATA%\npm\;D:\Program Files\nodejs\;%Path%

cd /d %~dp0

REM call npm run build-prod-quickerview
REM call ng build --prod --base-href /QuickerView_Beta/ --build-optimizer=false
call ng build --prod --base-href /JobManager/

copy src\web.config dist
xcopy dist\JobManagerUI\* \\kghapp83v\c$\inetpub\wwwroot\JobManager /s /e /y
pause
