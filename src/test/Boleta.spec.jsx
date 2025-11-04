import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Boleta from "../pages/Boletas"; // ajusta la ruta si está en otra carpeta
import React from "react";


describe("Componente Boleta", () => {
  beforeEach(() => {
    // Limpia mocks y localStorage antes de cada test
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("muestra mensaje cuando no hay boletas", () => {
    render(<Boleta />);
    expect(screen.getByText("No hay boletas registradas.")).toBeInTheDocument();
  });

  it("renderiza una lista de boletas desde localStorage", () => {
    const mockBoletas = [
      {
        id: 1,
        fecha: "2025-11-03",
        productos: [
          { titulo: "Torta de Chocolate", cantidad: 2, precio: 5000 },
          { titulo: "Pie de Limón", cantidad: 1, precio: 3000 },
        ],
        total: 13000,
      },
    ];

    localStorage.setItem("boletasGuardadas", JSON.stringify(mockBoletas));

    render(<Boleta />);

    expect(screen.getByText("Boleta #1")).toBeInTheDocument();
    expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Pie de Limón")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("13.000"))).toBeInTheDocument();
  });

  it("permite eliminar una boleta individual", () => {
    const mockConfirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    const mockBoletas = [
      {
        id: 2,
        fecha: "2025-11-03",
        productos: [{ titulo: "Brownie", cantidad: 1, precio: 2000 }],
        total: 2000,
      },
    ];
    localStorage.setItem("boletasGuardadas", JSON.stringify(mockBoletas));

    render(<Boleta />);

    const botonEliminar = screen.getByText("Eliminar");
    fireEvent.click(botonEliminar);

    expect(mockConfirm).toHaveBeenCalledWith("¿Eliminar la Boleta #2?");
    expect(localStorage.getItem("boletasGuardadas")).toBe("[]");
    expect(screen.getByText("No hay boletas registradas.")).toBeInTheDocument();
  });

  it("no elimina una boleta si el usuario cancela el confirm", () => {
    const mockConfirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    const mockBoletas = [
      {
        id: 3,
        fecha: "2025-11-03",
        productos: [{ titulo: "Cheesecake", cantidad: 1, precio: 4000 }],
        total: 4000,
      },
    ];
    localStorage.setItem("boletasGuardadas", JSON.stringify(mockBoletas));

    render(<Boleta />);

    const botonEliminar = screen.getByText("Eliminar");
    fireEvent.click(botonEliminar);

    expect(mockConfirm).toHaveBeenCalledWith("¿Eliminar la Boleta #3?");
    expect(localStorage.getItem("boletasGuardadas")).not.toBe("[]");
    expect(screen.getByText("Boleta #3")).toBeInTheDocument();
  });

  it("permite borrar todas las boletas", () => {
    const mockConfirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    const mockBoletas = [
      {
        id: 10,
        fecha: "2025-11-03",
        productos: [{ titulo: "Cupcake", cantidad: 3, precio: 1500 }],
        total: 4500,
      },
    ];
    localStorage.setItem("boletasGuardadas", JSON.stringify(mockBoletas));

    render(<Boleta />);

    const botonBorrarTodas = screen.getByText("Borrar todas");
    fireEvent.click(botonBorrarTodas);

    expect(mockConfirm).toHaveBeenCalledWith("¿Seguro que deseas borrar todas las boletas?");
    expect(localStorage.getItem("boletasGuardadas")).toBeNull();
    expect(screen.getByText("No hay boletas registradas.")).toBeInTheDocument();
  });

  it("no borra las boletas si el usuario cancela el confirm", () => {
    const mockConfirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    const mockBoletas = [
      {
        id: 11,
        fecha: "2025-11-03",
        productos: [{ titulo: "Tres Leches", cantidad: 1, precio: 5000 }],
        total: 5000,
      },
    ];
    localStorage.setItem("boletasGuardadas", JSON.stringify(mockBoletas));

    render(<Boleta />);

    const botonBorrarTodas = screen.getByText("Borrar todas");
    fireEvent.click(botonBorrarTodas);

    expect(mockConfirm).toHaveBeenCalledWith("¿Seguro que deseas borrar todas las boletas?");
    expect(localStorage.getItem("boletasGuardadas")).not.toBeNull();
    expect(screen.getByText("Boleta #11")).toBeInTheDocument();
  });
});
