import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

function ShopEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState();
  const [priority, setPriority] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:1204/items/" + id)
      .then((response) => {
        setName(response.data.name);
        setQuantity(response.data.quantity);
        setUnit(response.data.unit);
        setPriority(response.data.priority);
      })
      .catch((error) => {
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleUpdateItem = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:1204/items/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          quantity: quantity,
          unit: unit,
          priority: priority,
        }),
      });
      notifications.show({
        title: "Items Update",
        color: "green",
      });
      navigate("/");
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };
  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Update Items
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the items name here"
          label="Name"
          description="The name of the items"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={quantity}
          placeholder="Enter the quantity here"
          label="Quantity"
          description="The quantity of the items"
          withAsterisk
          onChange={setQuantity}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={unit}
          placeholder="Enter the unit here"
          label="Unit"
          description="The unit of the items"
          withAsterisk
          onChange={(event) => setUnit(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={priority}
          placeholder="Enter the priority here"
          label="Priority"
          description="The priority of the items"
          withAsterisk
          onChange={(event) => setPriority(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <Button
          variant="gradient"
          gradient={{ from: "yellow", to: "purple", deg: 105 }}
          fullWidth
          onClick={handleUpdateItem}
        >
          Add New Items
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default ShopEdit;
