from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Serialises as camelCase so the React components consume it unchanged,
    while still accepting snake_case input."""

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


# ---------- auth ----------

class LoginRequest(BaseModel):
    username: str
    password: str


class Token(CamelModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AdminOut(CamelModel):
    id: int
    username: str


class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


# ---------- projects ----------

class ProjectBase(CamelModel):
    title: str = Field(min_length=1, max_length=200)
    category: str = ""
    tagline: str = ""
    description: str = ""
    full_description: str = ""
    image: Optional[str] = None
    screenshots: List[str] = Field(default_factory=list)
    tech_stack: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    play_store_link: Optional[str] = None
    app_store_link: Optional[str] = None
    order: int = 0
    published: bool = True


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(CamelModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    category: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    full_description: Optional[str] = None
    image: Optional[str] = None
    screenshots: Optional[List[str]] = None
    tech_stack: Optional[List[str]] = None
    features: Optional[List[str]] = None
    play_store_link: Optional[str] = None
    app_store_link: Optional[str] = None
    order: Optional[int] = None
    published: Optional[bool] = None


class ProjectOut(ProjectBase):
    id: int


# ---------- blogs ----------

class BlogBase(CamelModel):
    title: str = Field(min_length=1, max_length=300)
    date: str = ""
    image: Optional[str] = None
    category: Optional[str] = None
    excerpt: str = ""
    content: str = ""
    read_time: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    comments: int = 0
    link: str = "#!"
    order: int = 0
    published: bool = True


class BlogCreate(BlogBase):
    pass


class BlogUpdate(CamelModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=300)
    date: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    read_time: Optional[str] = None
    tags: Optional[List[str]] = None
    comments: Optional[int] = None
    link: Optional[str] = None
    order: Optional[int] = None
    published: Optional[bool] = None


class BlogOut(BlogBase):
    id: int


# ---------- testimonials ----------

class TestimonialBase(CamelModel):
    name: str = Field(min_length=1, max_length=160)
    designation: str = ""
    message: str = ""
    quote: str = ""
    order: int = 0
    published: bool = True


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(CamelModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=160)
    designation: Optional[str] = None
    message: Optional[str] = None
    quote: Optional[str] = None
    order: Optional[int] = None
    published: Optional[bool] = None


class TestimonialOut(TestimonialBase):
    id: int


# ---------- clients ----------

class ClientBase(CamelModel):
    name: str = Field(min_length=1, max_length=160)
    logo: str = ""
    order: int = 0
    published: bool = True


class ClientCreate(ClientBase):
    pass


class ClientUpdate(CamelModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=160)
    logo: Optional[str] = None
    order: Optional[int] = None
    published: Optional[bool] = None


class ClientOut(ClientBase):
    id: int


# ---------- uploads ----------

class UploadOut(CamelModel):
    url: str
    public_id: str
    width: Optional[int] = None
    height: Optional[int] = None
    bytes: Optional[int] = None
    format: Optional[str] = None
