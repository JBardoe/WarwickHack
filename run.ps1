$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $root 'frontend\run.ps1'
$backend = Join-Path $root 'backend\run.ps1'

if (-not (Test-Path $frontend)) { Write-Error "Frontend script not found: $frontend"; exit 1 }
if (-not (Test-Path $backend)) { Write-Error "Backend script not found: $backend"; exit 1 }

Start-Process -FilePath 'powershell' -ArgumentList '-NoExit', '-ExecutionPolicy', 'Bypass', '-File', $frontend -WorkingDirectory (Join-Path $root 'frontend')
Start-Process -FilePath 'powershell' -ArgumentList '-NoExit', '-ExecutionPolicy', 'Bypass', '-File', $backend  -WorkingDirectory (Join-Path $root 'backend')
