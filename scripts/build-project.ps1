# Prepare proper work space
Remove-Item 'build' -Recurse -ErrorAction SilentlyContinue
Remove-Item '*.tgz'

# Extract package.json data
$packageData = Get-Content 'package.json' | ConvertFrom-Json
$packageVersion = $packageData.version

Write-Host "Build project [v$($packageVersion)]"

# Build project
tsc
vite build
tsc

# Copy additional local data
Copy-Item -Path src/styles -Destination build -Recurse -Force