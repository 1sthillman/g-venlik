param(
  [int]$Port = 8777
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dest = 'C:\nbserve'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
Copy-Item (Join-Path $root 'index.html') (Join-Path $dest 'index.html') -Force
Set-Location $dest
"Serving $dest on http://localhost:$Port/"
& python -m http.server $Port --bind 127.0.0.1
