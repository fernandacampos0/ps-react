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
          setNatAPI(response.data)
      }
      )
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
    const formData = buildFormData();

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

  const handleClose = () =>{
    setShowModal(false);
  }

  const handleChangeImage = (event) =>{
    const selectImage = event.target.files[0];
    setImage(selectImage)
  }

  const requestData = () => {
    setLoading(true);
    BaseApi.get(`/produtos${idProducts ? `/${idProducts}` : ''}`).then(res => {
      let data = res.data;
      setName(data.nome);
      setDescription(data.descricao);
      setQuantity(data.quantidade);
      setImage(data.imagem);
      setCategory(data.categoria_id);
      setLoading(false);
      setSaving(false);
    }).catch(err => {
      console.log(err);
      Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao carregar este lead ou não foi encontrado.', 'error');
      setShowModal(false);
    })
  }

  useEffect(() => {
    if(isShow) {
      getCategory();
      requestData();
    } else {
      setName('');
      setDescription('');
      setQuantity('');
      setImage(null);
      setCategory('');
      setLoading(true);
      setSaving(true);
    }
  }, [isShow])


  return(
    <>
    {children &&
        React.cloneElement(children, { onClick: (e) => setShowModal(true) })}
      {!children && (
        <Tooltip text={idProducts ? "Edit product" : "Create product"}>
          <button
            className={`btn btn-${idProducts ? "warning" : ""} text-white fa-bold`}
            onClick={(e) => setShowModal(true)}
          >
            <i className={`bi bi-${idProducts ? "person-gear" : "plus"}`}></i>
          </button>
        </Tooltip>
      )}
      <Modal
        centered
        scrollable
        onHide={handleClose}
        show={isShow}
        animation={true}
        size="md"
      >
        <Modal.Header closeButton>
            <Modal.Title>{idProducts ? "Edit" : "Create"} produto</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
          {!isLoading && (
            <>
              <div className="row">
                <h3 className="font-weight-bold">Product's Information</h3>
                <div className="form-group mb-3">
                  <label htmlFor="name">Product's name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Product's description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter product's description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="quantity">Product's quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Enter product's quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="image">Product's Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="form-control"
                    onChange={handleChangeImage} />
                    {idProducts ? (
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt="imagem"
                        style={{ minWidth: 250, width: 350, objectFit: 'cover' }}
                      />
                    </div>
                  ) : 
                    null
                  }
                   {image && !idProducts && (
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      {idProducts ? <img src={image} alt="imagem" style={{minWidth: 250, width: 350, objectFit: "cover"}}/>
                        : <img src={URL.createObjectURL(image)} alt="imagem" style={{minWidth: 250, width: 350, objectFit: "cover"}}/>
                      }
                      </div>
                   )}
                </div>

                <div className="form-group mb-3">
                <label htmlFor="category">Product's category</label>
                  <select value={category} name="category" id="category" onChange={(e)=>setCategory(e.target.value)} className="form-select">
                    <option value="" disabled="disabled" selected>Chose the Product's category</option>
                        {natAPI.data.map((item)=>(
                        <option value={item.id}>{item.nome}</option>
                        ))}
                  </select>
                </div>
                
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center w-100">
            <div className="d-block me-auto"></div>
            <div className="d-block ms-auto">
              <button
                className="btn btn-danger text-white me-2"
                onClick={handleClose}
              >
                Close
              </button>
              <Button
                loading={isSaving}
                onClick={submitData}
                className="btn btn-success text-white"
              >
                {idProducts ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    
    </>

  )


}

export default ModalProducts;