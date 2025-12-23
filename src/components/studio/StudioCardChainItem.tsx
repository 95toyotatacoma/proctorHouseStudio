// src/components/Studio/StudioCardChainItem.tsx

import React from "react";

type Props = {
  name: string;
  description: string;
  side: "left" | "right";
};

const StudioCardChainItem: React.FC<Props> = ({ name, description, side }) => {
  return (
    <div className={`studio-card-chain-item studio-card-chain-item--${side}`}>
      <div className="studio-card-chain-item__image" />
      <div className="studio-card-chain-item__content">
        <h2 className="studio-card-chain-item__title">{name}</h2>
        <p className="studio-card-chain-item__body">{description}</p>
      </div>
    </div>
  );
};

export default StudioCardChainItem;