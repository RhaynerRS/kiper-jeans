export function closeModal(props) {
  props.setIsEdit(false);
  props.setOpenModal({ status: false });
  cleanModal();
}

export async function cleanModal(campos, setCategoria) {
  campos.forEach((campo) => {
    document.getElementsByName(campo.name).forEach((item) => {
      item.value = "";
    });
  });
  document.getElementById("categorias").value = 0;
  await setCategoria(0);
}
