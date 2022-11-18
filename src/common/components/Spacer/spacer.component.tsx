import React from "react";
import styled from "styled-components/native";

interface PositionVariant {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

type Position = "top" | "bottom" | "left" | "right";

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "none";

interface Spacing {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const spacing: Spacing = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "32px",
  xxl: "64px",
};

const positionVariant: PositionVariant = {
  top: "margin-top",
  bottom: "margin-bottom",
  left: "margin-left",
  right: "margin-right",
};

const getVariant = (position: Position, size: Size) => {
  const property = positionVariant[position];

  const selectedSize = spacing[size];

  return `${property}: ${selectedSize};`;
};

interface Props {
  position: Position;
  size: Size;
  children: React.ReactNode;
}

export const Spacer = styled.View<Props>`
  ${(props) => getVariant(props.position, props.size)}
`;
