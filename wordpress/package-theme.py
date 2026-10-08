"""Build a portable WordPress theme ZIP with forward-slash entry names."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parent
theme = root / "ats-site"
archive = root / "ats-site-theme.zip"

with ZipFile(archive, "w", compression=ZIP_DEFLATED, compresslevel=6) as output:
    for file in sorted(theme.rglob("*")):
        if file.is_file():
            output.write(file, file.relative_to(root).as_posix())

with ZipFile(archive) as packaged:
    names = packaged.namelist()
    required = {
        "ats-site/style.css",
        "ats-site/functions.php",
        "ats-site/front-page.php",
        "ats-site/home.php",
        "ats-site/content/front.html",
        "ats-site/content/form-modal.html",
        "ats-site/assets/site/video/trainer.mp4",
    }
    assert required.issubset(names)
    assert all("\\" not in name for name in names)
    assert packaged.testzip() is None

print(f"Created {archive.name} ({archive.stat().st_size:,} bytes)")
