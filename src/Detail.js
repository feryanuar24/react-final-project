import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Detail() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { cardId } = useParams();

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + cardId)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Error!
      </h1>
    );
  }
  return (
    <Container maxWidth={"container.xl"} marginTop="3">
      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
      <Box marginTop={"3"}>
        <Stack direction={"row"} spacing="5">
          <Image src={data.card_images[0].image_url} width="52" />
          <Stack direction={"column"}>
            <Heading as={"h2"}>{data.name}</Heading>
            <Text>Level: {data.level}</Text>
            <Text>{data.attribute}</Text>
            <Text>
              ATK/{data.atk} DEF/{data.def}
            </Text>
            <Text>
              [ {data.type} / {data.race} ]
            </Text>
            <Text>{data.desc}</Text>
          </Stack>
        </Stack>
      </Box>
      <Heading
        size={"md"}
        textAlign={"center"}
        marginTop="10"
        marginBottom={"3"}
      >
        Card Set
      </Heading>
      <Box display={"flex"} flexWrap="wrap" gap={"5"}>
        {data.card_sets.map((e) => (
          <Box ring="1px" rounded={"lg"} padding="3" width={"52"} height={"52"}>
            <Text>Name: {e.set_name}</Text>
            <Text>Code: {e.set_code}</Text>
            <Text>Rarity: {e.set_rarity}</Text>
            <Text>Price: {e.set_price}</Text>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Detail;
