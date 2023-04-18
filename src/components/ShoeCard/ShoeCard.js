import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
        {variant === "new-release" && <NewFlag>Just Released!</NewFlag>}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
  flex-basis: 340px;
  isolation: isolate;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SaleFlag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 8px 10px;
  border-radius: 2px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  z-index: 1;
`;

const NewFlag = styled(SaleFlag)`
  background-color: ${COLORS.secondary};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  position: absolute;
  top: 24px;
  right: 0;
`;

export default ShoeCard;
