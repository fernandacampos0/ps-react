import BaseApi from "../../../services/Api";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import Tooltip from "../../Popups/Tooltip";
import {Modal, Spinner} from "react-bootstrap";
import Button from "../../Layout/Button";


const ModalUser = ({
  idUser, onUpdate, onCreate, children
}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [isSaving, setSaving] = React.useState(true);
  const [isShow, setShowModal] = React.useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const submitData = () => {
    setSaving(true);
    if (idUser) {
      BaseApi.put(`/users/${idUser}`, {
        name: name,
        email: email
      }).then(res => {
        setSaving(false);
        setShowModal(false);
        toast.success('User updated successfully!');
        onUpdate && onUpdate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao atualizar este usuário.', 'error');
        setSaving(false);
      })
    }
    else {
      BaseApi.post('/users', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }).then(res => {
        setSaving(false);
        setShowModal(false);
        toast.success('User created successfully!');
        onCreate && onCreate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao criar este usuário.', 'error');
        setSaving(false);
      })
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const requestData = () => {
    setLoading(true);
    BaseApi.get(`/users${idUser ? `/${idUser}` : ''}`).then(res => {
      let data = res.data;
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setPasswordConfirmation(data.password_confirmation);
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
      setEmail('');
      setLoading(true);
      setSaving(true);
    }
  }, [isShow])

  return (
    <>
      {children &&
        React.cloneElement(children, { onClick: (e) => setShowModal(true) })}
      {!children && (
        <Tooltip text={idUser ? "Edit user" : "Create user"}>
          <button
            className={`btn btn-${idUser ? "warning" : ""} text-white fa-bold`}
            onClick={(e) => setShowModal(true)}
          >
            <i className={`bi bi-${idUser ? "person-gear" : "plus"}`}></i>
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
          <Modal.Title>{idUser ? "Edit" : "Create"} usuário</Modal.Title>
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
                <h3 className="font-weight-bold">User Information</h3>
                <div className="form-group mb-3">
                  <label htmlFor="name">User name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter user name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Confirmed Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                {idUser ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;