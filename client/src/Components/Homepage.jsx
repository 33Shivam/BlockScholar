import React from "react";
import { Section, Container, Flex, Box } from "@radix-ui/themes";

function Homepage() {
  return (
    <Section>
      <Flex>
        <Container>Right</Container>
        <Container>Left</Container>
      </Flex>
    </Section>
  );
}

export default Homepage;
