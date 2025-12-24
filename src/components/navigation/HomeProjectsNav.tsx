// src/components/navigation/HomeProjectsNav.tsx
import React from "react";

type ProjectLink = {
  id: string;
  label: string;
  href: string;
  imageFile: string;
};

const PROJECT_LINKS: ProjectLink[] = [
  {
    id: "tomy-2000",
    label: "Tomy 2000",
    href: "/projects/tomy-2000",
    imageFile: "front-side-redesign-idea.png",
  },
  {
    id: "the-book",
    label: "The Book",
    href: "/the-book",
    imageFile: "the-book.jpeg",
  },
  {
    id: "life-cards",
    label: "Life Cards",
    href: "/life-cards",
    imageFile: "life-cards.jpeg",
  }, //,
  // { id: "our-lore", label: "Our Lore", href: "/our-lore" },
];

const HomeProjectsNav: React.FC = () => {
  return (
    <nav
      className="home-projects-nav"
      aria-label="Core Proctor House Studio projects"
    >
      <div className="home-projects-nav__inner">
        <ul className="home-projects-nav__list">
          {PROJECT_LINKS.map((project) => (
            <li key={project.id} className="home-projects-nav__item">
              <a href={project.href} className="home-projects-nav__link">
                <span className="home-projects-nav__image-wrap">
                  <span
                    className="home-projects-nav__image"
                    style={{
                      backgroundImage: `url(/images/projects-nav/jpg/${project.imageFile})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    role="presentation"
                    aria-hidden="true"
                  />
                </span>
                <span className="home-projects-nav__label">
                  {project.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HomeProjectsNav;
