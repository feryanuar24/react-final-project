import { SimpleGrid, Select, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "./Cards";

function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [selected, setSelected] = useState("default");

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4")
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  function sortData(type) {
    return data.sort((a, b) => {
      if (type === "default" || type === "name") {
        return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
      } else if (type === "attack") {
        return a.atk - b.atk;
      } else if (type === "defence") {
        return a.def - b.def;
      }
    });
  }

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
    <Container maxWidth={"container.xl"}>
      <Select
        name="sort"
        marginTop={"3"}
        onChange={(e) => {
          sortData(e.target.value);
          setSelected(e.target.value);
        }}
      >
        <option value="default">Sort by</option>
        <option value="name">Name</option>
        <option value="attack">Attack</option>
        <option value="defence">Defence</option>
      </Select>
      {selected === "default" ? (
        <SimpleGrid marginTop={"3"}>
          <Card card={sortData("default")} />
        </SimpleGrid>
      ) : selected === "name" ? (
        <SimpleGrid marginTop={"3"}>
          <Card card={sortData("name")} />
        </SimpleGrid>
      ) : selected === "attack" ? (
        <SimpleGrid marginTop={"3"}>
          <Card card={sortData("attack")} />
        </SimpleGrid>
      ) : selected === "defence" ? (
        <SimpleGrid marginTop={"3"}>
          <Card card={sortData("defence")} />
        </SimpleGrid>
      ) : (
        error
      )}
    </Container>
  );
}

export default Home;
