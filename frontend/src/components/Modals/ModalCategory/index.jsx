import BaseApi from "../../../services/Api";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import Tooltip from "../../Popups/Tooltip";
import {Modal, Spinner} from "react-bootstrap";
import Button from "../../Layout/Button";


const ModalCategory = ({
  idCategory, onUpdate, onCreate, children
}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [isSaving, setSaving] = React.useState(true);
  const [isShow, setShowModal] = React.useState(false);

  const [name, setName] = useState('');


  const submitData = () => {
    setSaving(true);
    if (idCategory) {
      BaseApi.put(`/categoria/${idCategory}`, {
        nome: name,
       
      }).then(res => {
        
        setSaving(false);
        setShowModal(false);
        toast.success('Category updated successfully!');
        onUpdate && onUpdate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao atualizar esta categoria.', 'error');
        setSaving(false);
      })
    }
    else {
      BaseApi.post('/categoria', {
        nome: name,
      }).then(res => {
        setSaving(false);
        setShowModal(false);
        toast.success('Category created successfully!');
        
        onCreate && onCreate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao criar esta categoria.', 'error');
        setSaving(false);
      })
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const requestData = () => {
    setLoading(true);
    BaseApi.get(`/categoria${idCategory ? `/${idCategory}` : ''}`).then(res => {
      let data = res.data;
      setName(data.nome);
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
      requestData();
    } else {
      setName('');
      setLoading(true);
      setSaving(true);
    }
  }, [isShow])

  return (
    <>
      {children &&
        React.cloneElement(children, { onClick: (e) => setShowModal(true) })}
      {!children && (
        <Tooltip text={idCategory ? "Edit Category" : "Create Category"}>
          <button
            className={`btn btn-${idCategory ? "warning" : ""} text-white fa-bold`}
            onClick={(e) => setShowModal(true)}
          >
            <i className={`bi bi-${idCategory ? "person-gear" : "plus"}`}></i>
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
          <Modal.Title>{idCategory ? "Edit" : "Create"} categoria</Modal.Title>
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
                <h3 className="font-weight-bold">Category Information</h3>
                <div className="form-group mb-3">
                  <label htmlFor="name">Category name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                {idCategory ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCategory;