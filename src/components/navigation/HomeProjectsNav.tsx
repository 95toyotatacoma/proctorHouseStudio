// src/components/navigation/HomeProjectsNav.tsx
import React from "react";
import { Link } from "react-router-dom";

type ProjectLink = {
  id: string;
  label: string;
  to: string;
  imageFile: string;
};

const PROJECT_LINKS: ProjectLink[] = [
  { id: "tomy-2000", label: "Tomy 2000", to: "/projects/tomy-2000", imageFile: "front-side-redesign-idea.png" },
  { id: "the-book", label: "The Book", to: "/projects/the-book", imageFile: "the-book.jpeg" },
  { id: "life-cards", label: "Life Cards", to: "/projects/life-cards", imageFile: "life-cards.jpeg" },
];

const HomeProjectsNav: React.FC = () => {
  return (
    <nav className="home-projects-nav" aria-label="Core Proctor House Studio projects">
      <div className="home-projects-nav__inner">
        <ul className="home-projects-nav__list">
          {PROJECT_LINKS.map((project) => (
            <li key={project.id} className="home-projects-nav__item">
              <Link to={project.to} className="home-projects-nav__link">
                <span className="home-projects-nav__image-wrap" aria-hidden="true">
                  <span
                    className="home-projects-nav__image"
                    style={{
                      backgroundImage: `url(/images/projects-nav/jpg/${project.imageFile})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </span>

                <span className="home-projects-nav__label">{project.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HomeProjectsNav;