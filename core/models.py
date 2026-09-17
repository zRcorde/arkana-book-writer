"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
from dataclasses import dataclass, field
from typing import List, Dict, Optional

@dataclass
class Chapter:
    title: str
    content: str  # HTML format
    id: str
    level: int = 1
    images: List[Dict[str, str]] = field(default_factory=list) # List of dicts with 'path' and 'position'

@dataclass
class EbookContent:
    title: str
    author: str
    chapters: List[Chapter] = field(default_factory=list)
    images: Dict[str, bytes] = field(default_factory=dict)
    cover_image: Optional[bytes] = None
    metadata: Dict[str, any] = field(default_factory=dict)

    def add_chapter(self, title: str, content: str, level: int = 1):
        chapter_id = f"chapter_{len(self.chapters) + 1}"
        self.chapters.append(Chapter(title=title, content=content, id=chapter_id, level=level))
