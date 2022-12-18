import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Card from "./Cards";
import Detail from "./Detail";
import Home from "./Home";
import { Box, Center, Heading } from "@chakra-ui/react";

const App = () => {
  const MyRouter = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      404 Page not found!
    </div>
  );

  return (
    <div className="App">
      <Box w="100vw" bg="#b25819" p={6}>
        <Center>
          <Heading as="h1" color="#e2ded5">
            Yugi-Oh Card Deck
          </Heading>
        </Center>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card">
          <Route path=":cardId" element={<Detail />} />
        </Route>
        <Route path="*" element={<MyRouter />} />
      </Routes>
    </div>
  );
};

export default App;
