import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogin, setUsuarioLogin] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario_sesion");
        if (usuarioGuardado) {
            setUsuarioLogin(JSON.parse(usuarioGuardado));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const respuesta = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!respuesta.ok) {
                throw new Error("Email o contraseña incorrectos");
            }

            const datos = await respuesta.json();

            const usuarioConfigurado = {
                id: datos.user.id,
                email: datos.user.email,
                rol: datos.user.rol,
                token: datos.accessToken
            };

            setUsuarioLogin(usuarioConfigurado);
            localStorage.setItem("usuario_sesion", JSON.stringify(usuarioConfigurado));

            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const registrar = async (email, password, rol) => {
        try {
            const respuesta = await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, rol })
            });

            if (!respuesta.ok) {
                const errorDato = await respuesta.json();
                throw new Error(errorDato || "Error al crear la cuenta");
            }

            alert("Cuenta creada con éxito. Ya puedes iniciar sesión.");
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const logout = () => {
        setUsuarioLogin(null);
        localStorage.removeItem("usuario_sesion");
    };

    return (
        <AuthContext.Provider value={{ usuarioLogin, login, logout, registrar }}>
            {children}
        </AuthContext.Provider>
    );
};