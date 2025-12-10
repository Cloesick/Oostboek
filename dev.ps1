# Oostboek Development Servers
# Run this script to start both frontend and backend

Write-Host "Starting Oostboek development servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend in background job
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD\server
    npm run dev
}

# Start frontend in background job  
$clientJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD\client
    npm run dev
}

Write-Host "Backend:  http://localhost:3001" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Stream output from both jobs
try {
    while ($true) {
        Receive-Job -Job $serverJob -ErrorAction SilentlyContinue
        Receive-Job -Job $clientJob -ErrorAction SilentlyContinue
        Start-Sleep -Milliseconds 500
    }
}
finally {
    Write-Host "`nStopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $serverJob, $clientJob -ErrorAction SilentlyContinue
    Remove-Job -Job $serverJob, $clientJob -Force -ErrorAction SilentlyContinue
}
