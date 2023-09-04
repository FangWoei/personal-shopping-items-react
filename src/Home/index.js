import { Container, Title, Space, Divider } from "@mantine/core";
import Shops from "../Shops";

function Home() {
  return (
    <Container>
      <Space h="xl" />
      <div className="App">
        <Title
          align="center"
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        >
          Shopping List
        </Title>
        <Space h="lg" />
        <Space h="30px" />
        <Divider />
        <Space h="30px" />
      </div>
      <Space h="md" />
      <Shops />
    </Container>
  );
}

export default Home;
