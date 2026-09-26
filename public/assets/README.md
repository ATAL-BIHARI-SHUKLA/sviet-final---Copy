# Site media (not in git)

This folder holds ~2.6 GB of photos, videos and PDFs (`img/`, `videos/`, `docs/`, `programs/`).
It is excluded from git because GitHub cannot host a tree that size.

## Restoring on a new machine

1. Get `sviet-media.zip` (it was generated from this folder).
2. Extract it at the **project root** (the folder containing `package.json`):

   ```powershell
   # PowerShell / Windows
   tar -xf sviet-media.zip -C .
   ```
   ```bash
   # macOS / Linux
   unzip sviet-media.zip -d .
   ```

   The archive's paths start with `public/assets/...`, so extracting at the root drops
   everything straight into place.

3. Verify: `public/assets/img`, `public/assets/videos`, `public/assets/docs`, `public/assets/programs` now exist.

## Regenerating the zip

From the project root:

```powershell
tar -a -cf ..\sviet-media.zip public\assets
```
