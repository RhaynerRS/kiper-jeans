import { Icon, Menu } from "@mui/material";
import Axios from "axios";
import NotificationItem from "examples/Items/NotificationItem";
import { useState } from "react";
import "./index.css";

export default function Dropdown(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const deleteItem = (id) => {
    Axios.post("http://localhost:3002/deleteProduto", {
      id: id,
    }).then(async () => (await props.refresh(), setOpenMenu(false)));
  };
  return (
    <div className="dropdown">
      <Icon onClick={handleOpenMenu}>more_vert</Icon>
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 2 }}
      >
        <NotificationItem
          icon={<Icon>delete</Icon>}
          title="Delete"
          onClick={() => deleteItem(props.id)}
        />
        <NotificationItem icon={<Icon>edit</Icon>} title="Edit" />
      </Menu>
    </div>
  );
}
