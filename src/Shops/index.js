import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1204/items")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterShop = async (priority = "") => {
    try {
      const response = await axios.get(
        "http://localhost:1204/items?priority=" + priority
      );
      setShops(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const twoFilterShop = async (purchased = "") => {
    try {
      const response = await axios.get(
        "http://localhost:1204/items?purchased=" + purchased
      );
      setShops(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShopDelete = async (shop_id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:1204/items/" + shop_id,
      });
      notifications.show({
        title: "Shopping Deleted",
        color: "green",
      });
      const newShops = shops.filter((s) => s._id !== shop_id);
      setShops(newShops);
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  const PurchasedUpdate = async (shop_id) => {
    try {
      await axios.put(`http://localhost:1204/items/${shop_id}`, {
        purchased: true,
      });

      notifications.show({
        title: "Shopping Purchased Update",
        color: "green",
      });

      const updatedShops = shops.filter((s) => s._id !== shop_id);
      setShops(updatedShops);
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Shopping List
        </Title>
        <Button
          component={Link}
          to="/shop_add"
          variant="gradient"
          gradient={{ from: "black", to: "White", deg: 105 }}
        >
          Add New Items
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <Button
          onClick={() => {
            filterShop("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterShop("Low");
          }}
        >
          Low
        </Button>
        <Button
          onClick={() => {
            filterShop("Medium");
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            filterShop("High");
          }}
        >
          High
        </Button>
        <Button
          onClick={() => {
            twoFilterShop("no");
          }}
        >
          Unpurchased
        </Button>
        <Button
          onClick={() => {
            twoFilterShop("yes");
          }}
        >
          Purchased
        </Button>
      </Group>
      <Space h="20px" />
      <Grid>
        {shops
          ? shops.map((shop) => {
              return (
                <Grid.Col span={4} key={shop._id}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{shop.name}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge
                        variant="gradient"
                        gradient={{ from: "teal", to: "lime", deg: 105 }}
                      >
                        {shop.quantity}
                      </Badge>
                      <Badge
                        variant="gradient"
                        gradient={{ from: "indigo", to: "cyan" }}
                      >
                        {shop.unit}
                      </Badge>
                      <Badge
                        variant="gradient"
                        gradient={{ from: "red", to: "blue" }}
                      >
                        {shop.priority}
                      </Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/shops/" + shop._id}
                        variant="gradient"
                        gradient={{ from: "blue", to: "darkblue" }}
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "purple", to: "pink" }}
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          PurchasedUpdate(shop._id);
                        }}
                      >
                        Purchased
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          handleShopDelete(shop._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Shops;
