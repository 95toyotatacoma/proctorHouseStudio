import React from "react";
import { Link } from "react-router-dom";
import SmartImage from "../media/SmartImage";

type ProjectLink = {
  id: string;
  label: string;
  to: string;
  imageFile: string;
};

const PROJECT_LINKS: ProjectLink[] = [
  {
    id: "tomy-2000",
    label: "Tomy 2000",
    to: "/projects/tomy-2000",
    imageFile: "tomy-2000.jpg",
  },
  {
    id: "the-book",
    label: "The Book",
    to: "/projects/the-book",
    imageFile: "the-book.jpg",
  },
  {
    id: "life-cards",
    label: "Life Cards",
    to: "/projects/life-cards",
    imageFile: "life-cards.jpg",
  },
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
                  <span className="home-projects-nav__image">
                    <SmartImage
                      className="home-projects-nav__image-media"
                      src={`/images/projects-nav/jpg/${project.imageFile}`}
                      alt=""
                      aria-hidden="true"
                      widths={[480, 768, 1024]}
                      sizes="(max-width: 719px) 84px, (max-width: 840px) 170px, 200px"
                    />
                  </span>
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