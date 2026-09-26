$ErrorActionPreference='Stop'
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'build.ps1')
$d = (Get-ChildItem C:\ -Directory | Where-Object { $_.Name -like 'c*narkoy*' }).FullName
Copy-Item (Join-Path $d 'index.html') 'C:\nbserve\index.html' -Force
'DEPLOYED ' + (Get-Item 'C:\nbserve\index.html').Length
