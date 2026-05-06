
⬆️:: [[🏡Home]]

# Odkazy 

[[🏡Home]]

Link pro help: https://help.obsidian.md/Home

# Embedded[Vestavěný] URL link

<iframe src="https://help.obsidian.md/Home"></iframe>


# Embedded[Vestavěný] Image 

![](https://s3-alpha.figma.com/hub/file/2560228193/resized/800x480/4aa6c6d0-7173-4cc1-aeb6-318c422703f7-cover.png)

# Embedded[Vestavěné] Video 

![](https://www.youtube.com/watch?v=Yzi1o-BH6QQ&ab_channel=ChristianLempa)


You can import [accepted file formats](https://help.obsidian.md/Advanced+topics/Accepted+file+formats), or _attachments_, to your vault, such as images, audio files, or PDFs. 

Attachments are regular files that you can access using your file system.

Obsidian recognizes the following file formats:

1. Markdown files: `md`
2. Image files: `png`, `webp`, `jpg`, `jpeg`, `gif`, `bmp`, `svg`
3. Audio files: `mp3`, `webm`, `wav`, `m4a`, `ogg`, `3gp`, `flac`
4. Video files: `mp4`, `webm`, `ogv`, `mov`, `mkv`
5. PDF files: `pdf`
***
# This is a heading 1 
## This is a heading 2 
### This is a heading 3 
#### This is a heading 4 
##### This is a heading 5 
###### This is a heading 6
***
# Syntaxe textu 

![[Pasted image 20230715225032.png]]

![[Pasted image 20230715225038.png]]
![[Pasted image 20230715225046.png]]
***
# Seznamy

- First list item
- Second list item
- Third list item

1. First list item
2. Second list item
3. Third list item

4. First list item
    1. Ordered nested list item
5. Second list item
    - Unordered nested list item

6. Check List
- [X] First
- [ ] Second
- [-] Third
- [ 50% ] FFF
- [ 50% ] FF
- [ ? ] Third


- [ ] Syntax - [ ]  Musí se nejdříve napsat dohromady s pomlčkou a pak mezerník
***
"***" -> Vytvoří Oddělovací čáru. Také tyto syntaxe to vytvoří "---" "____"
***
# Zápatí
---
This is a simple footnote[^1]

[^1]: This is the referenced text.
[^2]: Add 2 spaces at the start of each new line. This lets you write footnotes that span multiple lines. 
[^note]: Named footnotes still appears as numbers, but can make it easier to identify and link references.

***
# Komentáře
---
This is an %%inline%% comment. 
%% 
This is a block comment. 
Block comments can span multiple lines. 
Comments are visible only in Editing View
%%

***
# Tabulky 
---
## Zkopírované z GPT

| Column 1 | Column 2 |
| - | - |
| Data | Data |

## Ručně sepsané

|1|2|
|-|-|
|Data|Data|

|Dny|1|2|3|4|5|6|7|8|9|10|
| - | - | - | - | - | - | - | - | - | - | - |  
| Zuby | - [x] | - | - | - | - | - | - | - | - | - |
| Cvičení | - | - | - | - | - | - | - | - | - | - |
| Meditace | - | - | - | - | - | - | - | - | - | - |
|[[Daily Journal]] - | - | - | - | - | - | - | - | - | - |

***
# Callout
---
[[List of Custom Callouts]]

> [!Quote]

> [!notes]

> [!example]

> [!success]

> [!tip]

> [!Question]

> [!Warning]

> [!Failure]

> [!Danger]

> [!abstract]

> [!bug]+
FASDF


> [!infobox]+ Collapsible Infobox
>  # Name 
>  ![[IMG_hotkeys_cheatsheet_obsidian_from_pdf.png|cover hsmall]] 



> [!infobox|right wikipedia]-
>  # Name 
>  ![[Universal Kanban Settings]]
>  ###### Stats 
>  | Type | Stat | 
>  | ---- | ---- | 
>  | Test | Testing | 
>  | Test | Testing | 
>  
>  ##### Stats 2 
>  | Type | Stat | 
>  | ---- | ---- | 
>  | Test | Testing | 
>  | Test | Testing |



| Callout images  |   |
|---|---|
|`[!grid]`|Best type for **internally linked** images|
|`[!grid\|masonry]`|Best type for **externally linked** images|

```markdown
> [!grid]
> ![[Internal Image.png]]
> ![[Internal Image 2.png]]
>
> ![[Internal Image 3 on New Row.png]]
```


> [!grid|masonry]
> ![External Image 1](https://www.dmuth.org/wp-content/uploads/2021/03/obsidian-logo.png)
> ![External Image 2](https://www.dmuth.org/wp-content/uploads/2021/03/obsidian-logo.png)
> 
> ![External Image 3 on New Row](https://raw.githubusercontent.com/SlRvb/Obsidian--ITS-Theme/main/Images/Callout-Grid.png)
> ![External Image 4](https://obsidian.md/images/obsidian-logo-gradient.svg)

***
# Tagy

-#note/help
>[!info]
>TIP: Pro tagy používat jednotný tag a další specifický. Umožňuje to jednodušší vyhledávání. Stačí si pamatovat ten počáteční tag.

---
## Pro tyhle tagy je plugin 
https://help.obsidian.md/Editing+and+formatting/Tags

tags: Tag2, Tag3, Tag4

---
tag: Something

--- 
tags: 
- recipe 
- cooking 
---
## Nested Tags 

-#inbox/to-read
-#inbox/processing

## Rules for tags

Tags must contain at least one non-numerical character. 
For example, #1984 isn't a valid tag, but [-#y1984](https://publish.obsidian.md/#y1984) is.

Tags can't contain blank spaces. To separate two or more words, you can instead use the following formats:

- [camelCase](https://publish.obsidian.md/#camelCase)
- [PascalCase](https://publish.obsidian.md/#PascalCase)
- [snake_case](https://publish.obsidian.md/#snake_case)
- [kebab-case](https://publish.obsidian.md/#kebab-case)

***
# Metadata

Začínají a končí "---"

Obsahuje lehce čitelné informace pro program nebo pluginy.

příklad:

---
--- tag: journal 
publish: false 
--- 
%%
Daily note 
Today I learned about front matter.
%%



