// src/components/studio/StudioCardChain.tsx
import React from "react";
import SmartImage from "../media/SmartImage";

type StudioCardSide = "left" | "right";

interface StudioCardProps {
  name: string;
  body: string;
  side?: StudioCardSide;
  imageFile?: string;
}

const StudioProfileCard: React.FC<StudioCardProps> = ({
  name,
  body,
  side = "left",
  imageFile,
}) => {
  const rowClass = `studio-card-row studio-card-row--${side}`;
  const cardClass = `studio-card studio-card--${side}`;
  const imageSrc = imageFile
    ? `/images/home/card-chain/${imageFile}`
    : null;

  return (
    <div className={rowClass}>
      <article className={cardClass}>
        {/* Text block */}
        <div className="studio-card__text">
          <h3 className="studio-card__name">{name}</h3>
          <p className="studio-card__body">{body}</p>
        </div>

        {/* Avatar placeholder */}
        <div className="studio-card__avatar-wrap" aria-hidden="true">
          <div className="studio-card__avatar">
            {imageSrc ? (
              <SmartImage
                className="studio-card__avatar-image"
                src={imageSrc}
                alt=""
                aria-hidden="true"
                widths={[480, 768, 1024]}
                sizes="(max-width: 900px) 120px, 156px"
              />
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
};

const members: StudioCardProps[] = [
  {
    name: "Rina",
    body: "Who am I? I ask questions— a lot. My daughter hates that.",
    side: "right",
    imageFile: "rina.JPG",
  },
  {
    name: "June",
    body: "I’m the best, most awesomest… And yes, I know that’s not a word.",
    side: "left",
    imageFile: "june.JPG",
  },
  {
    name: "Fern",
    body: "GRRRRR… Oh, I don’t do anything. I have a stinky butt.",
    side: "right",
    imageFile: "fern.jpg",
  },
  {
    name: "Finn",
    body: "Abandoned baby and have the trauma responses to prove it.",
    side: "left",
    imageFile: "finn.png",
  },
  {
    name: "Setk",
    body: "New here. Don’t ask, just pet.",
    side: "right",
    imageFile: "setk.jpg",
  },
];

const StudioCardChain: React.FC = () => {
  return (
    <section
      className="studio-card-chain"
      aria-label="Studio characters and familiars"
    >
      {members.map((member) => (
        <StudioProfileCard key={member.name} {...member} />
      ))}
    </section>
  );
};

export default StudioCardChain;
