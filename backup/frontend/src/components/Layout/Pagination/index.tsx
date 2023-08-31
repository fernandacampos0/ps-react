// @ts-ignore
import styles from './styles.module.scss';
// @ts-ignore
import React from "react";
// @ts-ignore
import Tooltip from '../../Popups/Tooltip';


interface PaginateData {
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}

interface ComponentProps {
  paginateData?: PaginateData;
  onPaginate?: any;
  onPaginatePerPage?: any;
  children?: any;
  showOnTop?: boolean;
  showOnBottom?: boolean;
  disabled?: boolean;
}

const Pagination = ({ paginateData, onPaginate, onPaginatePerPage, children, showOnTop = true, showOnBottom = true, disabled = false }: ComponentProps) => {
  const [value, setValue] = React.useState(paginateData?.current_page || 1);
  const [perPage, setPerPage] = React.useState(paginateData?.per_page || 15);

  //////////////////////////////////////////////////////////////////////////////////////
  // Helpers
  //////////////////////////////////////////////////////////////////////////////////////
  const callback = (page) => {
    setValue(page);
    if (typeof onPaginate === 'function') onPaginate(page);
  }

  // @ts-ignore
  const callbackPerPage = (page) => {
    setPerPage(page);
    if (typeof onPaginate === 'function') onPaginatePerPage(page);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Handlers
  //////////////////////////////////////////////////////////////////////////////////////
  const handleInputChange = (e) => {
    e.preventDefault();

    const {
      min,
      max,
      value
    } = e.target;

    if ((paginateData?.last_page || 1) === 1) return;

    let val = parseInt(value);
    if (value < min) { return; }
    if (val > max) { return setValue(paginateData?.last_page ?? 1) };

    setValue(val);
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    callback(value);
  }

  const handlePagination = (action) => {
    let current_page = value;
    let last_page = paginateData?.last_page || 1;

    if (last_page === 1) return;
    if (action === 'next-page' && current_page !== last_page) {return callback(current_page+1)};
    if (action === 'prev-page' && current_page !== 1) {return callback(current_page-1)};
    if (action === 'first-page' && current_page !== 1) {return callback(1)};
    if (action === 'last-page' && current_page !== last_page) {return callback(last_page)};
    return callback(1);
  };

  const handleChangePerPage = (e) => {
    callbackPerPage(parseInt(e.target.value));
  }
  //////////////////////////////////////////////////////////////////////////////////////
  // Component
  //////////////////////////////////////////////////////////////////////////////////////
  const Pagination = (
    <>
      <div className="d-flex flex-column flex-sm-row mb-2">
        <div className={styles.container}>
          <span className="me-2">Página</span>
          <Tooltip delay={1500} text="Ir para primeira página.">
            <button
              className="btn btn-action text-gray-1"
              onClick={() => handlePagination("first-page")}
              disabled={value === 1 || disabled}
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </Tooltip>
          <Tooltip delay={1500} text="Ir para página anterior.">
            <button
              className="btn btn-action text-gray-1"
              onClick={() => handlePagination("prev-page")}
              disabled={value === 1 || disabled}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </Tooltip>
          <form onSubmit={handleInputSubmit} className="d-block mx-2">
            <input
              type="number"
              className={`form-control text-center ${styles.input}`}
              step={1}
              min={1}
              max={paginateData?.last_page || 1}
              disabled={disabled}
              value={value}
              onChange={handleInputChange}
              onBlur={handleInputSubmit}
              onFocus={(event) => event.target.select()}
            />
          </form>
          <Tooltip delay={1500} text="Ir para próxima página.">
            <button
              className="btn btn-action text-gray-1"
              onClick={() => handlePagination("next-page")}
              disabled={value === (paginateData?.last_page || 1) || disabled}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </Tooltip>
          <Tooltip delay={1500} text="Ir para última página.">
            <button
              className="btn btn-action text-gray-1"
              onClick={() => handlePagination("last-page")}
              disabled={value === (paginateData?.last_page || 1) || disabled}
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </Tooltip>
          <span className="ms-2">... {paginateData?.last_page || 1}</span>
          {onPaginatePerPage && (
            <>
              <div className="d-flex align-items-center ms-2 text-gray-2">
                | Exibir
                <select
                  className={`${styles.input_per_page} m-2`}
                  disabled={disabled}
                  value={perPage}
                  onChange={(e) => handleChangePerPage(e)}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                </select>
                por página
              </div>
            </>
          )}
        </div>

        {(paginateData?.total || 0) > 0 && (
          <div className="d-flex justify-content-around align-items-center">
            <p className="mb-0">
              Exibindo{" "}
              <b>
                {paginateData?.from || 1} — {paginateData?.to || 1}
              </b>{" "}
              de registros.
            </p>
            <p className="mb-0">
              Total de <b>{paginateData?.total || 0}</b>.
            </p>
          </div>
        )}
      </div>
    </>
  );

  //////////////////////////////////////////////////////////////////////////////////////
  // Render
  //////////////////////////////////////////////////////////////////////////////////////
  return (<>
    {showOnTop && Pagination}
    {children}
    {showOnBottom && Pagination}
  </>);
};

export default Pagination;