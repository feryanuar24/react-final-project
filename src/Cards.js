import { Box, Image, Heading, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card({ card }) {
  return (
    <Container
      maxWidth={"container.xl"}
      display={"flex"}
      flexWrap="wrap"
      gap={"5"}
    >
      {card.map((e) => (
        <Link to={"/card/" + e.id}>
          <Box className="yugioh-card" width={"32"}>
            <Image src={e.card_images[0].image_url} />
            <Heading as={"h2"} size="xs" textAlign={"center"}>
              {e.name}
            </Heading>
          </Box>
        </Link>
      ))}
    </Container>
  );
}

export default Card;
