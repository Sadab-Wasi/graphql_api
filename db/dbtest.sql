--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2022-12-09 03:05:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 148635)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    name text,
    email text,
    password text,
    amount double precision
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 2814 (class 0 OID 148635)
-- Dependencies: 202
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, name, email, password, amount) VALUES ('2', 'wasi', 'wasi@gmail.com', '1234', 1.02);
INSERT INTO public."user" (id, name, email, password, amount) VALUES ('98264858-df63-4bd3-96d9-cd1e226ab3f0', 'asd', 'asd', '$2a$12$mXnb6p6QhEw8afdsgR/AEuk/A7xKCwPAqaTT3F0D5t2wPrMISyWQy', 0);
INSERT INTO public."user" (id, name, email, password, amount) VALUES ('1', 'sadab', 'sadab@gmail.com', '1234', 7.800000000000001);


--
-- TOC entry 2687 (class 2606 OID 148642)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


-- Completed on 2022-12-09 03:05:19

--
-- PostgreSQL database dump complete
--

