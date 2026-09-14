"""Public-read / admin-write routers for the four content types."""

from ..crud import make_crud_router
from ..models import Blog, Client, Project, Testimonial
from ..schemas import (
    BlogCreate,
    BlogOut,
    BlogUpdate,
    ClientCreate,
    ClientOut,
    ClientUpdate,
    ProjectCreate,
    ProjectOut,
    ProjectUpdate,
    TestimonialCreate,
    TestimonialOut,
    TestimonialUpdate,
)

projects_router = make_crud_router(
    model=Project,
    create_schema=ProjectCreate,
    update_schema=ProjectUpdate,
    out_schema=ProjectOut,
    prefix="/api/projects",
    tag="projects",
)

blogs_router = make_crud_router(
    model=Blog,
    create_schema=BlogCreate,
    update_schema=BlogUpdate,
    out_schema=BlogOut,
    prefix="/api/blogs",
    tag="blogs",
)

testimonials_router = make_crud_router(
    model=Testimonial,
    create_schema=TestimonialCreate,
    update_schema=TestimonialUpdate,
    out_schema=TestimonialOut,
    prefix="/api/testimonials",
    tag="testimonials",
)

clients_router = make_crud_router(
    model=Client,
    create_schema=ClientCreate,
    update_schema=ClientUpdate,
    out_schema=ClientOut,
    prefix="/api/clients",
    tag="clients",
)
