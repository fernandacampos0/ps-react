import Cards from "../../../components/Products/Cards/Cards"
import style from "./style.module.css"
import Navbar from "../../../components/Products/Navbar/Navbar"
import NavItems from "../../../components/Products/Navbar/Navitems"
import DropDown from "../../../components/Products/Navbar/DropDown"
import FooterM from "../../../components/Products/Footer/Footer"

import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BaseApi from "../../../services/Api";
import { useStateContext } from "../../../context/ContextProvider";

import { toast } from "react-toastify";
import Pagination from "../../../components/Layout/Pagination";

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



export default function ProductsIndex(){

    let [searchParams, setSearchParams] = useSearchParams();

    let controller = new AbortController();

    const INITIAL_FILTERS = {
        search: searchParams.get("search") || "",
    };

    const INITIAL_QUERY = {
        sort: "id",
        order: "desc",
        per_page: 10,
        page: searchParams.get("page") || 1,
    };

    const [isLoading, setLoading] = React.useState(true);
    const [isFiltering, setFiltering] = React.useState(true);
    const [isPaginating, setPaginating] = React.useState(true);

    const [query, setQuery] = React.useState({
        ...INITIAL_QUERY,
        ...INITIAL_FILTERS,
    });
    const [filters, setFilters] = React.useState({ ...INITIAL_FILTERS });
    const [tableData, setTableData] = React.useState({ ...INITIAL_DATA });
    const [natData, setNatData] = React.useState({ ...INITIAL_DATA });

    const { setNotification } = useStateContext();

    const requestData = (args = {}) => {
        setLoading(true);
        let q = { ...query, ...args };
        BaseApi.get("/produtos", {
        signal: controller.signal,
        params: {
            ...q,
            search: q.search !== "" ? q.search : undefined,
        },
        })
        .then((response) => {
            setTableData(response.data);
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
        })
        .catch((err) => {
            if (err) {
            console.log(err);
            toast.error("Erro ao carregar dados da tabela");
            setTableData({ ...INITIAL_DATA });
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
            }
        });
    };

    const requestNatData = () => {
        setLoading(true);
        BaseApi.get("/categoria")
        .then((response) => {
            setNatData(response.data);
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
        })
        .catch((err) => {
            if (err) {
            console.log(err);
            toast.error("Erro ao carregar dados da tabela");
            setNatData({ ...INITIAL_DATA });
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
            }
        });
    };


    const setSearch = (args = {}) => {
        let params = { ...args };
        if (filters.search && filters.search !== "") params.q = filters.search;
        setSearchParams(params);
       
        
      };
    
      const handlePagination = (page) => {
        setSearch({ p: page });
        setPaginating(true);
        setQuery({ ...query, page });
      };
    
      const handleFilters = (e) => {
        e.preventDefault();
        setSearch();
        setFiltering(true);
        setQuery({ ...query, ...filters, page: 1 });
      
        
      };
    


    useEffect(() => {
        controller = new AbortController();
        requestData();
        requestNatData()
       
        return () => {
        controller.abort();
        setLoading(true);
        };
    }, [query]);


    return (<div className={style.productspage}>
        <Navbar
        logo="https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.pinterest.com%2Fpin%2F347621664990591686%2F&psig=AOvVaw2xmCzs9HLtcosCn0FU099l&ust=1693774052774000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMj_mZvmjIEDFQAAAAAdAAAAABAK"
        submit={handleFilters}
        change={(e) =>
            setFilters({ ...filters, search: e.target.value })
        }
        >
            <NavItems
            link="http://localhost:3000/productsindex"
            icon="Inicio"/>
            
            <NavItems
            link="#"
            icon="Categorias">
                {natData.data.map((category)=>
                (<DropDown
                subNat={handleFilters}
                dropValue = {category.id}
                natClick = {(e) =>
                    setFilters({ ...filters, search: e.target.value })}
                children={category.nome}/> )
            )}
            
            </NavItems>

        </Navbar>

        {!isLoading && (
            <>
              {isFiltering && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {!isFiltering && (
                <>
                  <Pagination
                    onPaginate={handlePagination}
                    showOnBottom={!isPaginating && tableData.data.length > 0}
                    showOnTop={tableData.data.length > 0}
                    paginateData={tableData}
                  >
                    
                    {!isPaginating && (
                        <div className={style.wrapper}>

                            {tableData.data.map ((products) => (
                
                            <Cards
                            img={products.imagem}
                            name={products.nome}
                            description={products.descricao}
                            quantity={products.quantidade}
                            category={products?.categorias?.nome}/>
                
                            ))}
                
                            
                    
                        </div>
                    )}
                    {isPaginating && (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {tableData.data.length === 0 && (
                      <h5 className="text-purple-3 text-center">
                        Não foram encontrados registros com estes filtros.
                      </h5>
                    )}
                  </Pagination>
                </>
              )}
            </>
          )}
        <footer>
            <FooterM
            name="FuteInfo"
            slogan="O Futebol está aqui"
            social1="fa-brands fa-instagram"
            social2="fa-brands fa-twitter"
            social3="fa-brands fa-linkedin-in"
            link1="#"
            link2="#"
            link3="#"
            link4="#"
            empresa1="Central de Noticias"
            empresa2="Nosso App"
            parceria1="Coca-Cola"
            parceria2="Rexona"></FooterM>
        </footer>
    

        
        



    </div>)
}