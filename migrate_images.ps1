$yoPath = "assets/images/yo"
$profilePath = "assets/images/profile"

# 1. Rename existing converted files in profile (1 to 25) to (55 to 79)
for ($i=1; $i -le 25; $i++) {
    $oldPath = Join-Path $profilePath "$i-convertido-de-png.webp"
    $newName = "$($i + 54).webp"
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $newName
    }
}

# 2. Move everything from yo to profile
if (Test-Path $yoPath) {
    Get-ChildItem $yoPath | ForEach-Object {
        $target = Join-Path $profilePath $_.Name
        if (Test-Path $target) { Remove-Item $target -Force }
        Move-Item $_.FullName $target
    }
}
