#!/usr/bin/env pwsh
# rollback.ps1 – Roll the frontend Deployment back to the previous revision.
# Usage: .\rollback.ps1 [-Namespace lifeshare] [-ToRevision 0]
#   -ToRevision 0  means "previous revision" (kubectl default)
#   -ToRevision N  means "specific revision number"

param(
    [string]$Namespace  = "lifeshare",
    [int]   $ToRevision = 0
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== LifeShare Rollback ===" -ForegroundColor Cyan
Write-Host "Namespace : $Namespace"
Write-Host "ToRevision: $(if ($ToRevision -eq 0) { 'previous' } else { $ToRevision })"

# Show current rollout history before rolling back
Write-Host "`n-- Rollout history --" -ForegroundColor Yellow
kubectl rollout history deployment/lifeshare-frontend -n $Namespace

# Execute rollback
if ($ToRevision -eq 0) {
    kubectl rollout undo deployment/lifeshare-frontend -n $Namespace
} else {
    kubectl rollout undo deployment/lifeshare-frontend -n $Namespace --to-revision=$ToRevision
}

# Wait for rollback to complete
Write-Host "`n-- Waiting for rollout to complete --" -ForegroundColor Yellow
kubectl rollout status deployment/lifeshare-frontend -n $Namespace --timeout=120s

# Show pod status after rollback
Write-Host "`n-- Pod status after rollback --" -ForegroundColor Yellow
kubectl get pods -n $Namespace -l app=lifeshare-frontend

Write-Host "`n=== Rollback complete ===" -ForegroundColor Green
