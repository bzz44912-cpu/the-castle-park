# Script pour autoriser le port 3000 dans le pare-feu Windows
# Ce script doit être exécuté en tant qu'administrateur

$ruleName = "The Loft Lounge Server"
$port = 3000

Write-Host "--- Configuration du Pare-feu Windows ---" -ForegroundColor Cyan

# Vérifier si la règle existe déjà
$rule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue

if ($rule) {
    Write-Host "La règle '$ruleName' existe déjà. Mise à jour..." -ForegroundColor Yellow
    Set-NetFirewallRule -DisplayName $ruleName -LocalPort $port -Protocol TCP -Action Allow
} else {
    Write-Host "Création d'une nouvelle règle pour le port $port..." -ForegroundColor Green
    New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow
}

Write-Host "✅ Configuration terminée ! Le port $port est maintenant ouvert." -ForegroundColor Green
Write-Host "Vous pouvez maintenant scanner le QR code avec votre téléphone (assurez-vous d'être sur le même WiFi)." -ForegroundColor White
