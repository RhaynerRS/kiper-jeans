import { Icon, Menu } from "@mui/material";
import Axios from "axios";
import MDTypography from "components/MDTypography";
import NotificationItem from "examples/Items/NotificationItem";
import { useState } from "react";
import "./index.css";

export default function Dropdown(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  //delete o item e da refresh no componente
  const deleteItem = (id) => {
    Axios.post(`http://localhost:3002/${props.delete}`, {
      id: id,
    }).then(async () => (await props.refresh(), setOpenMenu(false)));
  };

  const editItem = (item) => {
    props.edit({ status: true, data: item });
    setOpenMenu(false);
    console.log(item);
  };

  const renderItems = () => {
    if (props.typeOf === "menu") {
      return (
        <>
          <NotificationItem
            icon={<Icon>delete</Icon>}
            title="Delete"
            onClick={() => deleteItem(props.id)}
          />
          <NotificationItem
            icon={<Icon>edit</Icon>}
            title="Edit"
            onClick={() => editItem(props.item)}
          />
        </>
      );
    } else {
      return (
        <>
          <p>a</p>
        </>
      );
    }
  };

  return (
    <div className="dropdown">
      {props.typeOf == "menu" ?<Icon onClick={handleOpenMenu}>more_vert</Icon>:<MDTypography onClick={handleOpenMenu} component="p"  variant="button" color="text" fontWeight="medium">Produtos ({props.produtos.length})</MDTypography>}
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
        {props.typeOf == "menu" ? (
          <>
            <NotificationItem
              icon={<Icon>delete</Icon>}
              title="Delete"
              onClick={() => deleteItem(props.id)}
            />
            <NotificationItem
              icon={<Icon>edit</Icon>}
              title="Edit"
              onClick={() => editItem(props.item)}
            />
          </>
        ) : (
          <>
            {props.produtos.map((prod) => {
              return (
                <NotificationItem
                  icon={<Icon>dot</Icon>}
                  title={`${prod.label} ${prod.qtd}x`}
                />
              );
            })}
          </>
        )}
      </Menu>
    </div>
  );
}
