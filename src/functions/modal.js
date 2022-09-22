export function closeModal(props) {
  if (props.setIsEdit!=undefined) {
    props.setIsEdit(false);
  }
  props.setOpenModal({ status: false });
  if (props.setProdutosVendidos!=undefined) {
    props.setProdutosVendidos([])
  }
  cleanModal(props.campos, props.setCategoria);
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
