$ErrorActionPreference = 'Stop'
$enc = New-Object System.Text.UTF8Encoding($false)

$root = Split-Path -Parent $PSScriptRoot
$B    = Join-Path $root '_build'

function ReadUtf8([string]$p) { return [System.IO.File]::ReadAllText($p, [System.Text.Encoding]::UTF8) }

$head  = ReadUtf8 (Join-Path $B 'p1_head.html')
$old   = ReadUtf8 (Join-Path $B 'style_old.css')
$css   = ReadUtf8 (Join-Path $B 'p2_css.css')
$body  = ReadUtf8 (Join-Path $B 'p3_body.html')
$app   = ReadUtf8 (Join-Path $B 'p4_app.js')
$map   = ReadUtf8 (Join-Path $B 'mapimg.html')

# eski CSS <style>...</style> sarmalını soy
$old = $old -replace '(?s)^\s*<style[^>]*>', ''
$old = $old -replace '(?s)</style>\s*$', ''
$old = $old.Trim()

# harita placeholder -> sadece data URL (mapimg.html tam <img> etiketi)
$mm = [regex]::Match($map, 'src="([^"]+)"')
if (-not $mm.Success) { throw 'mapimg.html icinde src="..." bulunamadi' }
$mapUrl = $mm.Groups[1].Value
if ($mapUrl -notlike 'data:image/*') { throw 'harita base64 data URL degil' }
$body = $body.Replace('__MAP_IMG__', $mapUrl)

$out = $head + "`n" + $old + "`n" + $css.Trim() + "`n</style>`n</head>`n" + $body.Trim() + "`n<script>`n" + $app.Trim() + "`n</script>`n</body>`n</html>`n"

$dest = Join-Path $root 'index.html'
[System.IO.File]::WriteAllText($dest, $out, $enc)

# eski yedek yoksa oluştur
$bak = Join-Path $root 'index.eski.html'
if (-not (Test-Path $bak)) {
  $orig = Join-Path $env:USERPROFILE 'Downloads\cinarkoy-nobet.html'
  if (Test-Path $orig) { Copy-Item $orig $bak -Force }
}

$fi = Get-Item $dest
"OK  $($fi.FullName)"
"SIZE $($fi.Length) bytes"
