import BaseApi from "../../../services/Api";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import Tooltip from "../../Popups/Tooltip";
import {Modal, Spinner} from "react-bootstrap";
import Button from "../../Layout/Button";

const INITIAL_DATA = {
    total: 0,
    current_page: 1,
    last_page: 1,
    first_page_url: "",
    last_page_url: "",
    next_page_url: "",
    prev_page_url: null,
    path: "",
    from: 1,
    to: 1,
    data: [],
  };
  
const ModalProducts = ({idProducts, onUpdate, onCreate, children}) =>{
    const [isLoading, setLoading] = React.useState(true);
    const [isSaving, setSaving] = React.useState(true);
    const [isShow, setShowModal] = React.useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [natAPI, setNatAPI] = React.useState({...INITIAL_DATA});

    const getCategory = () =>{
        BaseApi
        .get("/categoria")
        .then((response) =>{
            setNatAPI(response,data)
        })
        .catch((err) => {
            if (err) {
              console.log(err);
              toast.error("Erro ao carregar dados da categoria");
              setTableData({ ...INITIAL_DATA });
              setLoading(false);
            }
          });
    }

const buildFormData = () =>{
    const formData = new FormData();
    formData.append("nome", name)
    formData.append("descricao", description)
    formData.append("quantidade", quantity)
    formData.append("categoria_id", category)
    if(image){
        formData.append("imagem", image)
    }

    if(idProducts){
        formData.append('_method', 'PUT')
    }

    return formData

}

const submitData = (e) => {
    e.preventDefault();
    setSaving(true);
    const formData =  buildFormData();

    if (idProducts) {
      BaseApi.post(`/produtos/${idProducts}`, formData).then(res => {
        setSaving(false);
        setShowModal(false);
        toast.success('Product updated successfully!');
        onUpdate && onUpdate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao atualizar este produto.', 'error');
        setSaving(false);
      })
    }
    else {
      BaseApi.post('/produtos', formData).then(res => {
        setSaving(false);
        setShowModal(false);
        toast.success('Product created successfully!');
        onCreate && onCreate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao criar este produto.', 'error');
        setSaving(false);
      })
    }
  }

  


}

export default ModalProducts;