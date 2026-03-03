---
title: "Extensions of files"
related:
  - "[[Exclusion list]]"
created: 2025-05-05
tags:
  - 🛜IT
  - 💯cheatsheet
exclude: "true"
modified: 2026-03-03
---
r
## ✅ **Ready-Copy-Paste: Clean Exclusion List**
```
# 🔒 Binary & Executables
*.exe
*.dll
*.bin
*.dat
*.apk
*.app

# 📦 Archives & Compressed Files
*.zip
*.rar
*.7z
*.tar
*.gz

# 🎵🎬 Media Files
*.mp3
*.wav
*.flac
*.mp4
*.mov
*.avi
*.mkv
*.jpg
*.jpeg
*.png
*.gif
*.svg
*.webp

# ⚙️ Temp & System Files
*.tmp
*.log
.DS_Store
Thumbs.db

# 💻 Code & Dev Files
*.pyc
*.o
*.class
*.lock
node_modules/

# 🗂️ Office/Documents (optional)
*.pdf
*.docx
*.xlsx
*.pptx
*.odt

# 🛑 Optional: 3D Printing Files (if present)
*.stl
*.gcode
*.3mf

```
## ✅ **Key things to KEEP (for Obsidian)**
- `.md` → ✅ Main file type for notes
- `.canvas` → ✅ Obsidian canvas files
- `.json` → ✅ If part of plugin configs
- `.yaml` or `.yml` → ✅ Often metadata/config

## 🚫 **Binary & Executable Files**

|Extension|Example Use|
|---|---|
|`.exe`|Windows executables|
|`.dll`|Dynamic link libraries|
|`.bin`|Binary files|
|`.dat`|Data files (often app-specific)|
|`.apk`|Android package|
|`.app`|Mac application|

## 🚫 **Archives & Compressed Files**

| Extension | Example Use        |
| --------- | ------------------ |
| `.zip`    | Compressed archive |
| `.rar`    | RAR archive        |
| `.7z`     | 7-Zip archive      |
| `.tar`    | TAR archive        |
| `.gz`     | Gzip archive       |

## 🚫 **Media Files (if not relevant)**

|Extension|Example Use|
|---|---|
|`.mp3`|Audio files|
|`.wav`|Audio files|
|`.mp4`|Video files|
|`.mov`|Video files|
|`.avi`|Video files|
|`.flac`|Audio files|
|`.mkv`|Video files|
|`.jpg`|Images|
|`.jpeg`|Images|
|`.png`|Images|
|`.gif`|Images/animations|
|`.svg`|Vector graphics|
|`.webp`|Compressed images|

## 🚫 **Temporary & System Files**

|Extension|Example Use|
|---|---|
|`.tmp`|Temporary files|
|`.log`|Log files|
|`.DS_Store`|macOS folder settings|
|`Thumbs.db`|Windows folder thumbnails|

## 🚫 **Code/Dev Files (if not part of notes)**

|Extension|Example Use|
|---|---|
|`.pyc`|Compiled Python files|
|`.o`|Object files|
|`.class`|Java bytecode|
|`.lock`|Dependency lockfiles (like npm or pip)|
|`.node_modules`|Directory (exclude entire folder)|

## 🚫 **Office/Document Types (optional)**

_(Only if you don’t want to index docs like Word/PDF files)_

|Extension|Example Use|
|---|---|
|`.pdf`|Portable Document Format|
|`.docx`|Microsoft Word|
|`.xlsx`|Microsoft Excel|
|`.pptx`|Microsoft PowerPoint|
|`.odt`|OpenDocument Text|
